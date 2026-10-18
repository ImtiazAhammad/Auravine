# Graph Report - Auravine  (2026-10-12)

## Corpus Check
- Large corpus: 371 files · ~1,338,804 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 1336 nodes · 3086 edges · 89 communities (70 shown, 19 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82

## God Nodes (most connected - your core abstractions)
1. `cn()` - 262 edges
2. `react` - 175 edges
3. `framer-motion` - 114 edges
4. `next` - 88 edges
5. `lucide-react` - 69 edges
6. `usePerformance()` - 42 edges
7. `portfolioData` - 41 edges
8. `next-intl` - 29 edges
9. `next-themes` - 18 edges
10. `DeferredMount()` - 18 edges

## Surprising Connections (you probably didn't know these)
- `BlogPostPage()` --calls--> `cn()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/lib/utils.ts
- `CompactCard()` --calls--> `cn()`  [EXTRACTED]
  src/app/projects/page.tsx → src/lib/utils.ts
- `Code()` --calls--> `cn()`  [EXTRACTED]
  src/components/animate-ui/components/animate/code.tsx → src/lib/utils.ts
- `CodeBlock()` --calls--> `cn()`  [EXTRACTED]
  src/components/animate-ui/components/animate/code.tsx → src/lib/utils.ts
- `BlogPortalFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/sections/gallery/BlogPortalFooter.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (89 total, 19 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (16): getLocalPointerPos(), getMouseDistance(), getNewPosition(), ImageItem, ImageTrailConstructor, ImageTrailProps, ImageTrailVariant1, ImageTrailVariant2 (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (46): buildSystemPrompt(), callGemini(), callGroq(), ChatRequest, Message, POST(), BlogPostPage(), Bubble() (+38 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (45): date-fns, react-github-calendar, @splinetool/react-spline, tailwind-merge, getProjectImages(), BADGE_COLORS, CompactCard(), FeaturedCard() (+37 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (44): @phosphor-icons/react, react-icons, GalleryImage, getAllGalleryImages(), GET(), getRandomGradient(), BentoHero(), FeatCard() (+36 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (23): gl-matrix, ActiveItemCallback, ArcballControl, Camera, createAndSetupTexture(), createProgram(), createShader(), defaultItems (+15 more)

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (55): dependencies, aos, @base-ui/react, class-variance-authority, clsx, date-fns, framer-motion, gl-matrix (+47 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (39): lenis, next-themes, inter, jetbrainsMono, metadata, playfair, RootLayout(), signature (+31 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (31): AnimatedMist(), AnimatedMistProps, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle (+23 more)

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (39): name, private, version, aos, autoprefixer, @base-ui/react, eslint, eslint-config-next (+31 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (15): ogl, CircularGallery(), CircularGalleryProps, createTextTexture(), debounce(), GalleryApp, getFontSize(), GL (+7 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (24): class-variance-authority, @radix-ui/react-select, Button, ButtonProps, buttonVariants, Input, Component(), highlightPattern() (+16 more)

### Community 11 - "Community 11"
Cohesion: 0.07
Nodes (25): Separator, SidebarContext, SidebarContextProps, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel (+17 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (21): shiki, Code(), CodeBlock(), CodeBlockProps, CodeContextType, CodeHeader(), CodeHeaderProps, CodeProps (+13 more)

### Community 13 - "Community 13"
Cohesion: 0.10
Nodes (18): ScrollReveal(), ScrollRevealProps, AboutLeadIn(), AboutSection(), AuditFunnel(), CoreEngineeringPanel(), GALLERY_IMAGES, ScrollHijackSection() (+10 more)

### Community 14 - "Community 14"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+15 more)

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (12): react, DesignTestimonialsProps, TestimonialItem, StatsCardProps, Skill, SkillRadarProps, Beam(), WarpBackground() (+4 more)

### Community 16 - "Community 16"
Cohesion: 0.15
Nodes (21): addDays(), APIResponse, buildGrid(), CalendarSkeleton(), CellShape, ContributionData, ContributionLevel, DARK_THEMES (+13 more)

### Community 17 - "Community 17"
Cohesion: 0.17
Nodes (17): getJourneyImages(), CollapsibleExperienceCard(), ExperienceHighlightSection(), ExperiencePage(), ExperienceTabSlider(), ExperienceTimeline(), FloatingShape(), highlightContent (+9 more)

### Community 18 - "Community 18"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, downlevelIteration, esModuleInterop, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+12 more)

### Community 19 - "Community 19"
Cohesion: 0.18
Nodes (14): gsap, next-intl, HomePage(), { hyperspeedPresets }, MetricCTAHijack(), SocialCorner(), SocialCornerProps, CTASection() (+6 more)

### Community 20 - "Community 20"
Cohesion: 0.14
Nodes (8): lucide-react, MatrixRain(), TypewriterCodeHero(), TypewriterText(), WakaStat(), WakaTimeDashboard(), SystemPipelineProps, ToolItem

### Community 21 - "Community 21"
Cohesion: 0.13
Nodes (3): next, MagneticButton(), MagneticButtonProps

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (11): BlogContent(), BlogPage(), BlogCard(), ErrorBoundary, Props, State, FlowingMenu(), FlowingMenuProps (+3 more)

### Community 23 - "Community 23"
Cohesion: 0.15
Nodes (13): BlogCardProps, testAchievement, testPortfolio, Achievement, BlogPost, Education, FAQ, GalleryItem (+5 more)

### Community 24 - "Community 24"
Cohesion: 0.17
Nodes (13): three-globe, GlobeDemo(), World, genRandomNumbers(), Globe(), GlobeConfig, numbersOfRings, Position (+5 more)

### Community 25 - "Community 25"
Cohesion: 0.20
Nodes (13): BlendedVisual(), BridgeSlide(), EditorialContent(), MagneticTag(), pages, PageSlide(), ScrollAdventure(), HoverScrambleText() (+5 more)

### Community 26 - "Community 26"
Cohesion: 0.13
Nodes (15): devDependencies, autoprefixer, eslint, eslint-config-next, postcss, tailwindcss, @types/aos, @types/node (+7 more)

### Community 27 - "Community 27"
Cohesion: 0.19
Nodes (11): clsx, CATEGORY_COLORS, StatsSection(), Book(), BookProps, ResponsiveProp, BREAKPOINTS, useResponsive() (+3 more)

### Community 28 - "Community 28"
Cohesion: 0.19
Nodes (13): AchievementCard, AchievementModal, AchievementsPage(), FallingText, NavItem, staggerContainer, staggerItem, CERTIFICATE_POOL (+5 more)

### Community 29 - "Community 29"
Cohesion: 0.24
Nodes (10): ConditionalNavigation(), LoadingScreen(), LoadingScreenProps, Clock(), Navbar(), useNavItems(), AnimatedThemeToggler(), AppleHelloEnglishEffect() (+2 more)

### Community 30 - "Community 30"
Cohesion: 0.23
Nodes (8): matter-js, ResumePage(), FallingText(), FallingTextProps, SkillsClosing(), TextPressure(), TextPressureProps, usePerformance()

### Community 31 - "Community 31"
Cohesion: 0.24
Nodes (12): ContactForm(), ContactPage(), DynamicScrollVelocity, FAQSection(), InputGroup(), Lanyard, Meteors, SocialCard() (+4 more)

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (11): meshline, @react-three/drei, @react-three/fiber, @react-three/rapier, Band(), BandProps, Lanyard(), LanyardProps (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.23
Nodes (11): ProjectDetail(), ProjectGallery(), renderRichText(), TerminalBlock(), Typewriter(), PhysicsBody, TECH_DESCRIPTIONS, TechStack() (+3 more)

### Community 34 - "Community 34"
Cohesion: 0.27
Nodes (7): three, GalleryPage(), GLSLHills, ManifestoHero(), DeferredMount(), DeferredMountProps, ImpactSection()

### Community 35 - "Community 35"
Cohesion: 0.26
Nodes (9): MarqueeClosing(), Boat(), BoatGroup(), DEFAULT_THEME, LiquidOcean(), LiquidOceanProps, OceanMesh(), OceanMeshProps (+1 more)

### Community 36 - "Community 36"
Cohesion: 0.21
Nodes (10): Counter(), GitHubActivity, GitHubShowcase(), GitHubStats, LanguageStat, PINNED_REPOS, ShowcaseStack(), StackCard() (+2 more)

### Community 37 - "Community 37"
Cohesion: 0.25
Nodes (9): AboutHoverMenu(), Footer(), FooterColumn(), FooterLink(), Marquee(), marqueeKeys, SocialIconComponent, socialIcons (+1 more)

### Community 38 - "Community 38"
Cohesion: 0.36
Nodes (9): ActiveDot(), CardNav(), CardNavProps, GridSnake(), MegaBoxBig(), MegaBoxSmall(), NavItem, NavLink (+1 more)

### Community 39 - "Community 39"
Cohesion: 0.31
Nodes (9): SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle, sheetVariants (+1 more)

### Community 40 - "Community 40"
Cohesion: 0.39
Nodes (6): framer-motion, HeroVisual(), ProfileCard(), ProfileCardProps, Spotlight(), SpotlightProps

### Community 41 - "Community 41"
Cohesion: 0.31
Nodes (7): react-dom, AnimatedThemeTogglerProps, ACHIEVEMENT_LIST, Counter(), HexagonBadge(), InteractiveBadge(), KaggleShowcase()

### Community 42 - "Community 42"
Cohesion: 0.39
Nodes (5): Error(), GlobalError(), NotFound(), QuantumError(), QuantumErrorProps

### Community 43 - "Community 43"
Cohesion: 0.36
Nodes (6): ImageTrail(), Boxes, BoxesCore(), Bucket(), INITIAL_CHIPS, useIsMobile()

### Community 44 - "Community 44"
Cohesion: 0.39
Nodes (8): EducationContent(), ExperienceContent(), ExperienceTabsSection(), JourneyContent(), TabButton(), TabButtonProps, TabType, formatDate()

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (7): animateProps, AppleHelloVietnameseEffect(), initialProps, Props, GalleryButton(), GalleryStack(), GalleryStackProps

### Community 46 - "Community 46"
Cohesion: 0.25
Nodes (6): ScrollVelocity(), VelocityText(), ScrollVelocityProps, useElementWidth(), VelocityMapping, VelocityTextProps

### Community 47 - "Community 47"
Cohesion: 0.53
Nodes (7): useFadeIn(), useParallax(), useScaleOnScroll(), useScrollAnimation(), UseScrollAnimationOptions, useSlideIn(), useStaggerChildren()

### Community 48 - "Community 48"
Cohesion: 0.36
Nodes (7): Hyperspeed, FogController(), Hyperspeed(), hyperspeedPresets, HyperspeedProps, MovingRoad(), MovingStars()

### Community 49 - "Community 49"
Cohesion: 0.32
Nodes (7): AnyProps, DOMMotionProps, mergeProps(), mergeRefs(), Slot(), SlotProps, WithAsChild

### Community 50 - "Community 50"
Cohesion: 0.32
Nodes (7): AnimatedSpan(), AnimatedSpanProps, MotionComponent(), Terminal(), TerminalProps, TypingAnimation(), TypingAnimationProps

### Community 51 - "Community 51"
Cohesion: 0.48
Nodes (6): ProjectGallery(), ProjectPageContent(), renderRichText(), TerminalBlock(), Typewriter(), Project

### Community 52 - "Community 52"
Cohesion: 0.38
Nodes (6): DEFAULT_MEMBERS, MemberRow, PhotoCard(), TeamMember, TeamShowcase(), TeamShowcaseProps

### Community 53 - "Community 53"
Cohesion: 0.40
Nodes (5): motion, TextReveal(), TextRevealProps, Word(), WordProps

### Community 54 - "Community 54"
Cohesion: 0.53
Nodes (5): LiquidWave(), ParticleConnections(), THOUGHT_TOPICS, ThoughtBubble(), ThoughtStreamClosing()

### Community 55 - "Community 55"
Cohesion: 0.47
Nodes (5): ExperienceMarquee(), GalleryItem(), ParallaxProps, ParallaxText(), Experience

### Community 56 - "Community 56"
Cohesion: 0.40
Nodes (5): InnovativeExperienceHero(), InnovativeExperienceHeroProps, NodeData, NODES_DATA, OrbitalNode()

### Community 57 - "Community 57"
Cohesion: 0.60
Nodes (5): CenterImage(), Hero(), ParallaxImages(), ParallaxImg(), SmoothScrollHero()

### Community 58 - "Community 58"
Cohesion: 0.47
Nodes (5): certificates, CertificateShowcase(), Column(), ColumnProps, ScrambleButton()

### Community 59 - "Community 59"
Cohesion: 0.47
Nodes (5): FlowingMenu(), FlowingMenuProps, MenuItem(), MenuItemData, MenuItemProps

### Community 61 - "Community 61"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 62 - "Community 62"
Cohesion: 0.40
Nodes (3): DEFAULT_IMAGES, DomeGalleryProps, ImageItem

### Community 63 - "Community 63"
Cohesion: 0.60
Nodes (4): darkenColor(), FolderProps, GalleryButton(), GalleryFolder()

### Community 64 - "Community 64"
Cohesion: 0.50
Nodes (4): MonolithCard(), MonolithStack(), MonolithStackProps, ToolItem

### Community 65 - "Community 65"
Cohesion: 0.50
Nodes (4): OrbitalRing(), OrbitalWorkbench(), OrbitalWorkbenchProps, ToolItem

### Community 66 - "Community 66"
Cohesion: 0.50
Nodes (4): ToolItem, VoidArtifact(), VoidWorkbench(), VoidWorkbenchProps

### Community 67 - "Community 67"
Cohesion: 0.70
Nodes (3): defaultLocale, Locale, locales

### Community 69 - "Community 69"
Cohesion: 0.67
Nodes (3): nodemailer, escapeHtml(), POST()

### Community 72 - "Community 72"
Cohesion: 0.67
Nodes (3): TextScrollMarquee(), TextScrollMarqueeProps, wrap()

### Community 73 - "Community 73"
Cohesion: 0.50
Nodes (3): defaultLocale, Locale, locales

## Knowledge Gaps
- **29 isolated node(s):** `@base-ui/react`, `@hugeicons/core-free-icons`, `@hugeicons/react`, `@radix-ui/react-avatar`, `@react-spring/web` (+24 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 492 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Community 15` to `Community 0`, `Community 1`, `Community 2`, `Community 3`, `Community 4`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 16`, `Community 17`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 23`, `Community 24`, `Community 25`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 37`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 42`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 66`, `Community 68`, `Community 70`, `Community 71`, `Community 72`, `Community 81`?**
  _High betweenness centrality (0.327) - this node is a cross-community bridge._
- **What connects `@base-ui/react`, `@hugeicons/core-free-icons`, `@hugeicons/react` to the rest of the system?**
  _29 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06286748077792854 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `Community 7` to `Community 1`, `Community 2`, `Community 3`, `Community 6`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 15`, `Community 16`, `Community 17`, `Community 19`, `Community 21`, `Community 22`, `Community 23`, `Community 25`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 33`, `Community 35`, `Community 36`, `Community 37`, `Community 38`, `Community 39`, `Community 40`, `Community 41`, `Community 43`, `Community 44`, `Community 45`, `Community 46`, `Community 49`, `Community 50`, `Community 51`, `Community 52`, `Community 53`, `Community 55`, `Community 56`, `Community 57`, `Community 59`, `Community 72`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.052083333333333336 - nodes in this community are weakly interconnected._
- **Why does `next` connect `Community 21` to `Community 1`, `Community 2`, `Community 3`, `Community 4`, `Community 6`, `Community 7`, `Community 8`, `Community 13`, `Community 17`, `Community 19`, `Community 20`, `Community 22`, `Community 23`, `Community 24`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 34`, `Community 35`, `Community 36`, `Community 37`, `Community 38`, `Community 40`, `Community 42`, `Community 45`, `Community 51`, `Community 52`, `Community 55`, `Community 56`, `Community 58`, `Community 63`, `Community 64`, `Community 65`, `Community 66`, `Community 67`, `Community 68`, `Community 69`, `Community 70`, `Community 71`, `Community 73`, `Community 74`, `Community 76`, `Community 77`, `Community 78`, `Community 79`, `Community 80`, `Community 81`, `Community 82`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05819209039548023 - nodes in this community are weakly interconnected._