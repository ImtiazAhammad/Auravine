"""Validated input for the admin API. Everything an admin can type is checked here so it cannot
break the public pages: slugs, links, bilingual text and the shape of project `details`."""

import re
from datetime import date
from typing import Annotated, Any, ClassVar, Literal
from urllib.parse import urlparse

from pydantic import (
    AfterValidator,
    BaseModel,
    ConfigDict,
    Field,
    StrictBool,
    StringConstraints,
    field_validator,
    model_serializer,
    model_validator,
)

SLUG_RE = r"^[a-z0-9]+(-[a-z0-9]+)*$"
Slug = Annotated[str, StringConstraints(pattern=SLUG_RE, max_length=100)]
# Tech item keys look like "hard_skill-computer-vision" (kind, then slug), so allow underscores.
TECH_KEY_RE = r"^[a-z0-9]+([_-][a-z0-9]+)*$"
TechKey = Annotated[str, StringConstraints(pattern=TECH_KEY_RE, max_length=100)]
Status = Literal["draft", "published"]
SortOrder = Annotated[int, Field(ge=0, le=100_000)]
Tag = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]


def _link(value: str | None) -> str | None:
    """https URL, site-relative path, or empty (None). Nothing else (no javascript:, data:, //)."""
    if value is None:
        return None
    value = value.strip()
    if value == "":
        return None
    if value.startswith("/") and not value.startswith("//"):
        return value
    parsed = urlparse(value)
    if parsed.scheme == "https" and parsed.netloc and not re.search(r"\s", value):
        return value
    raise ValueError("must be an https:// link or a path starting with /")


Link = Annotated[str | None, AfterValidator(_link)]
Links = Annotated[list[Annotated[str, AfterValidator(_link)]], Field(max_length=30)]


class _Bilingual(BaseModel):
    """{"en": required non-blank, "bn": optional}. A blank Bangla value is dropped."""

    model_config = ConfigDict(extra="forbid")
    en: str
    bn: str | None = None
    max_len: ClassVar[int] = 200

    @field_validator("en", mode="after")
    @classmethod
    def _english(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("English text is required")
        if len(value) > cls.max_len:
            raise ValueError(f"at most {cls.max_len} characters")
        return value

    @field_validator("bn", mode="after")
    @classmethod
    def _bangla(cls, value: str | None) -> str | None:
        if value is None or not value.strip():
            return None
        if len(value) > cls.max_len:
            raise ValueError(f"at most {cls.max_len} characters")
        return value.strip()

    @model_serializer
    def _dump(self) -> dict[str, str]:
        return {"en": self.en} if self.bn is None else {"en": self.en, "bn": self.bn}


def _bilingual(name: str, limit: int) -> type[_Bilingual]:
    return type(name, (_Bilingual,), {"max_len": limit})  # type: ignore[return-value]


Short = _bilingual("Short", 200)
Medium = _bilingual("Medium", 1000)
Long = _bilingual("Long", 20_000)
Article = _bilingual("Article", 100_000)


# ---------------------------------------------------------------- project details
class _Strict(BaseModel):
    model_config = ConfigDict(extra="forbid")


class _Sparse(_Strict):
    """Nested detail items: unset optional keys are omitted, not stored as null."""

    @model_serializer(mode="wrap")
    def _dump(self, handler):
        return {k: v for k, v in handler(self).items() if v is not None}


class Metric(_Sparse):
    value: Annotated[str, StringConstraints(max_length=50)]
    label: Annotated[str, StringConstraints(max_length=200)]


class Feature(_Sparse):
    title: Annotated[str, StringConstraints(max_length=200)]
    items: Annotated[list[Annotated[str, StringConstraints(max_length=1000)]], Field(max_length=50)]


class ChallengeSolution(_Sparse):
    problem: Annotated[str, StringConstraints(max_length=1000)]
    solution: Annotated[str, StringConstraints(max_length=1000)]


class Install(_Sparse):
    title: Annotated[str, StringConstraints(max_length=200)]
    type: Literal["code", "text"]
    cmd: Annotated[str, StringConstraints(max_length=1000)] | None = None
    code: Annotated[str, StringConstraints(max_length=5000)] | None = None


Texts = Annotated[list[Annotated[str, StringConstraints(max_length=1000)]], Field(max_length=50)]


class DetailSide(_Strict):
    highlights: Texts | None = None
    challenges: Texts | None = None
    metrics: Annotated[list[Metric], Field(max_length=20)] | None = None
    features: Annotated[list[Feature], Field(max_length=20)] | None = None
    challengesAndSolutions: Annotated[list[ChallengeSolution], Field(max_length=20)] | None = None
    installation: Annotated[list[Install], Field(max_length=20)] | None = None

    @model_serializer(mode="wrap")
    def _dump(self, handler):
        return {k: v for k, v in handler(self).items() if v is not None}


class Details(_Strict):
    en: DetailSide = DetailSide()
    bn: DetailSide | None = None

    @model_serializer(mode="wrap")
    def _dump(self, handler):
        return {k: v for k, v in handler(self).items() if v is not None}


# ---------------------------------------------------------------- resources
class ProjectIn(_Strict):
    slug: Slug
    status: Status
    sort_order: SortOrder
    delivery_status: Literal["ongoing", "completed", "planned"]
    category: Short | None = None
    title: Short
    description: Medium
    long_description: Long | None = None
    details: Details = Details()
    tech_stack: Annotated[list[Tag], Field(max_length=50)] = []
    tools: Annotated[list[Tag], Field(max_length=50)] = []
    hero_image: Link = None
    gallery_images: Links = []
    demo_url: Link = None
    repo_url: Link = None
    start_date: date | None = None
    end_date: date | None = None
    role: Short | None = None
    team: Short | None = None
    custom_timeline: Short | None = None


BlogCategory = Literal["applied-ai", "software-development", "company", "more"]


class BlogPostIn(_Strict):
    slug: Slug
    status: Status
    sort_order: SortOrder
    title: Short
    excerpt: Medium
    content: Article
    cover_image: Link = None
    published_at: date | None = None
    category: BlogCategory  # the public site has a label for exactly these
    tags: Annotated[list[Tag], Field(max_length=50)] = []
    author_name: Short | None = None
    read_time_minutes: Annotated[int, Field(gt=0, le=600)] | None = None

    @model_validator(mode="after")
    def _published_needs_a_date(self):
        if self.status == "published" and self.published_at is None:
            raise ValueError("published_at is required for a published post")
        return self


class FaqIn(_Strict):
    key: Slug
    status: Status
    sort_order: SortOrder
    question: Medium
    answer: Long


ExtraValue = str | int | float | bool | list[Annotated[str, StringConstraints(max_length=1000)]]


class TechItemIn(_Strict):
    key: TechKey
    status: Status
    sort_order: SortOrder
    kind: Literal["tech", "tool", "hard_skill", "soft_skill"]
    name: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]
    icon: Link = None
    category: Annotated[str, StringConstraints(max_length=50)] | None = None
    url: Link = None
    extra: Annotated[dict[Annotated[str, StringConstraints(max_length=50)], ExtraValue],
                     Field(max_length=20)] = {}


# ---------------------------------------------------------------- site settings
Line = Annotated[str, StringConstraints(max_length=2000)]


class Personal(_Sparse):
    model_config = ConfigDict(extra="allow")  # seeded data carries a few extra display fields
    name: Annotated[str, StringConstraints(min_length=1, max_length=100)]
    title: Line
    subtitle: Line
    bio: Annotated[str, StringConstraints(max_length=5000)]
    avatar: Annotated[str, AfterValidator(lambda v: _link(v) or "")]
    location: Line
    email: Annotated[str, StringConstraints(max_length=320)]
    phone: Annotated[str, StringConstraints(max_length=50)] | None = None
    website: Link = None


def _social_url(value: str) -> str:
    """'#' is the site's "no link" value and is what the seeded data uses."""
    return value if value.strip() == "#" else (_link(value) or "")


class SocialLink(_Sparse):
    platform: Annotated[str, StringConstraints(min_length=1, max_length=50)]
    url: Annotated[str, AfterValidator(_social_url)]
    icon: Annotated[str, StringConstraints(max_length=50)] = ""
    username: Annotated[str, StringConstraints(max_length=100)] | None = None


class Language(_Strict):
    name: Annotated[str, StringConstraints(min_length=1, max_length=50)]
    level: Annotated[str, StringConstraints(min_length=1, max_length=50)]


class PersonalSetting(_Strict):
    value: Personal


class SocialLinksSetting(_Strict):
    value: Annotated[list[SocialLink], Field(max_length=20)]


class LanguagesSetting(_Strict):
    value: Annotated[list[Language], Field(max_length=20)]


SETTINGS: dict[str, type[BaseModel]] = {
    "personal": PersonalSetting,
    "social_links": SocialLinksSetting,
    "languages": LanguagesSetting,
}


def dump(model: BaseModel) -> dict[str, Any]:
    return model.model_dump(mode="json")


# ---------------------------------------------------------------- messages and media
class MessagePatch(_Strict):
    handled: StrictBool


IMAGE_TYPES = {
    "image/webp": "webp", "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif",
    "image/svg+xml": "svg", "image/avif": "avif",
}
MAX_UPLOAD_BYTES = 5 * 1024 * 1024


class SignRequest(_Strict):
    filename: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=200)]
    content_type: Literal[tuple(IMAGE_TYPES)]  # type: ignore[valid-type]
    size: Annotated[int, Field(gt=0, le=MAX_UPLOAD_BYTES)]


UPLOAD_PATH_RE = r"^uploads/[0-9]{4}/[a-z0-9][a-z0-9-]*\.(webp|png|jpg|gif|svg|avif)$"


class MediaIn(_Strict):
    path: Annotated[str, StringConstraints(pattern=UPLOAD_PATH_RE, max_length=200)]
    alt: Short | None = None
    width: Annotated[int, Field(gt=0, le=20_000)] | None = None
    height: Annotated[int, Field(gt=0, le=20_000)] | None = None
