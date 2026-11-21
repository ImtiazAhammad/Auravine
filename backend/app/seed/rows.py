"""Write the database rows the seed would send as JSON, without touching the network.
Used to produce the golden fixture that the site's row-to-content mapper is tested against."""

import json
import sys
from pathlib import Path

from app.seed.mapping import build_seed


def main(argv: list[str] | None = None) -> None:
    args = sys.argv[1:] if argv is None else argv
    if len(args) != 2:
        raise SystemExit("usage: python -m app.seed.rows <portfolio.json> <rows.json>")
    seed = build_seed(json.loads(Path(args[0]).read_text()))
    Path(args[1]).write_text(json.dumps(seed, indent=2, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()
