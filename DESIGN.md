# Design

## Visual Theme

**Modern Command / Calm Power** (locked).

Scene sentence, which decides theme per surface: *a 42-year-old operations
director reads this on a phone at 6am before the house wakes up, and again on a
laptop at 4pm between meetings, deciding whether this person is serious.*

That forces **high contrast and low noise**, not a mood. It does not by itself
force dark or light, which is why the three active directions differ on ground
colour. Each direction commits; none hedges.

Desired impression: calm power, competence, range, composure, precision, warm
authority, physical credibility. A person who can enter a boardroom, a gym, a
technology discussion, and a classroom without changing identities.

## Colour

Authored in **OKLCH**, tokenised in `src/app/globals.css`. No pure `#000` or
`#fff` anywhere: every neutral is tinted toward a brand hue (ink toward 254°,
bone toward 85°). Hex values are informational, for print and third parties.
The OKLCH value is the source of truth.

The master council doc set the territory and explicitly deferred exact values
"subject to accessibility, photography, print, and skin-tone testing before
final brand-guide lock". The accessibility half of that gate now runs as a
test: `python3 tools/contrast.py`. It parses `globals.css` directly, so the
palette cannot drift away from its own audit. **All 14 pairs pass.**

### Ink — the authoritative ground. Navy-leaning, never black.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `ink-950` | `0.140 0.015 255` | `#06090f` | Deepest ground, section sinks |
| `ink-900` | `0.172 0.018 255` | `#0a1018` | Default page ground |
| `ink-850` | `0.202 0.021 255` | `#101720` | Raised panel |
| `ink-800` | `0.240 0.024 255` | `#18202b` | Raised surface |
| `ink-700` | `0.282 0.027 254` | `#202a37` | Panel border |
| `ink-600` | `0.332 0.031 254` | `#2b3746` | Hairline |
| `ink-500` | `0.402 0.037 254` | `#3a495c` | Bright hairline |

### Bone — warm parchment. The editorial ground, never clinical white.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `bone-50` | `0.978 0.006 85` | `#faf7f3` | Lightest ground, button text |
| `bone-100` | `0.951 0.011 85` | `#f2eee7` | Headings on ink |
| `bone-200` | `0.908 0.017 85` | `#e6e0d4` | Plate ground |
| `bone-300` | `0.848 0.022 85` | `#d4ccbd` | Hairline on bone |
| `bone-400` | `0.758 0.026 85` | `#b8b09e` | Muted on bone |

### Graphite — structure and the secondary voice.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `slate-400` | `0.775 0.028 252` | `#a9b7c8` | Secondary text |
| `slate-500` | `0.672 0.031 252` | `#8898a9` | Technical labels |
| `slate-600` | `0.588 0.030 252` | `#707e8e` | Smallest mono labels |

### Bronze — prestige detail only. Never bright gold, never a flex.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `bronze-400` | `0.740 0.070 75` | `#c5a579` | Emphasis on ink |
| `bronze-500` | `0.612 0.078 68` | `#a37b4f` | Eyebrow labels, rules |
| `bronze-600` | `0.512 0.068 68` | `#815f3a` | Bronze on bone |

### Cobalt — interaction, data, technology. The only "digital" voice.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `cobalt-300` | `0.752 0.110 265` | `#8cadf5` | Links on deep ink |
| `cobalt-400` | `0.672 0.145 264` | `#6792ef` | Focus ring, hover |
| `cobalt-500` | `0.555 0.185 263` | `#356add` | Primary button ground |
| `cobalt-600` | `0.462 0.175 263` | `#1f4fb8` | Pressed state |

### Accessibility floors, enforced by `tools/contrast.py`

- Body and heading text: **4.5:1** minimum against its ground.
- Small uppercase mono labels count as body text. They get 4.5:1, not 3:1.
- Controls use `border-input` (`0.490 0.037 254`, `#526275`), which clears the
  3:1 WCAG 1.4.11 floor. The decorative `hairline` tokens measure 1.57:1 and are
  **exempt only because they carry no meaning**. Never use a hairline as the
  visible boundary of an input, button, or control.
- Focus ring is `cobalt-400` at 6.32:1.

Three values moved during the audit and are locked at the corrected numbers:
`slate-600` (was 3.16:1 on ink-950), `slate-500` and `slate-400` (raised to keep
a visible step), and `cobalt-500` (the primary button measured 4.47:1, a hair
under the floor, on the site's single most important control).

**Colour strategy is per-direction, and each direction commits to one:**

- Instrument: Committed. Ink carries 60%+ of surface; cobalt is the single
  active signal.
- Field Manual: Committed, inverted. Bone carries the surface; ink is the mark.
- Console: Restrained. Graphite and ink, cobalt ≤10%, bronze near zero.

Banned colour moves: black-and-red, bright gold, Matrix green, RGB, neon cyber
gradients, generic blue SaaS gradient.

## Typography

Three levels, never one loud display face. Configured in `src/lib/fonts.ts`.

| Level | Family | Axes | Role |
|---|---|---|---|
| Display | **Literata** | `wght` 200–900, `opsz`, italic | Philosophy statements, headings |
| Body / UI | **Geist** | 100–900 | All body copy, navigation, buttons |
| Technical | **Geist Mono** | 100–900 | Labels, metrics, diagram annotations, section numbers |

### Why Literata

The first build used Newsreader. It is a text serif tuned for small sizes, it
was set at weight 300, and at display size it went limp: the headline had no
authority, which reads as Sage without Ruler. It is also a training-data
default, which is its own problem on a brand whose whole claim is that it is
not generic.

Literata was chosen against three constraints:

1. **It carries weight.** `wght` runs to 900 and the sturdy, slightly squared
   serifs hold at 700 without turning into a fashion masthead.
2. **It survives light-on-dark.** Ink carries 60%+ of the surface. High-contrast
   didones shimmer and thin out against it; Literata does not.
3. **It reads institutional.** The brief bans both "academic professor with no
   lived action" and "luxury-flex", which rules out the cozy book serifs on one
   side and the high-contrast display serifs on the other.

### Weight roles, enforced

Nothing in the display face is set below 500. The old `font-light` (300) is
banned outright.

| Context | Weight |
|---|---|
| Display statements, `h1`, `h2`, sizes ≥1.75rem | **700** |
| Mid headings, `text-xl` / `text-2xl` | **600** |
| Small display text, `text-lg` and below | **500** |
| Body copy | 400 |
| Mono labels | 500, uppercase, `0.16em` tracking |

### Optical sizing and tracking

`.font-display` sets `font-optical-sizing: auto` so the browser derives `opsz`
from the rendered size. A hardcoded axis value gives a 7rem headline the same
cut as a 1rem label, which is part of what made headlines read thin. Components
that animate `font-variation-settings` override this deliberately.

Tracking tightens as size grows: `-0.021em` by default, `-0.032em` on `h1` and
`h2`. The hero headline is fluid, `clamp(2.875rem, 6.4vw, 5.75rem)`.

Body measure capped at 65–75ch. Hierarchy comes from scale plus weight contrast
at ≥1.25 ratio between steps. Light text on an ink ground reads a weight
lighter than it is, which the weight roles above already account for.

## Layout

- Section rhythm varies deliberately. Identical padding on every section is
  monotony and reads as a template.
- **Cards are the lazy answer.** The Four M is never four cards. Proof is never
  a uniform card rail. Where a grid is genuinely right, cells differ in size,
  density, or treatment.
- Not everything gets a container. Full-bleed and edge-anchored composition are
  used where the content wants it.
- Graphic language: strong negative space, thin rules, disciplined grids,
  marginal notes, numbered frameworks, data labels, diagrams, annotations.

## Motion

- Ease-out exponential curves only. No bounce, no elastic, no spring.
- Never animate layout properties.
- Typography may scale, mask, reveal, or recompose **when meaning changes** —
  not for decoration.
- Transitions feel weighted and confident. Scroll is pacing, never hijacked.
- Everything non-essential collapses under `prefers-reduced-motion`, and content
  is never hidden behind an observer.

## Photography

Every image of Neil is generated, and every one is rendered **from a real
photograph of him** rather than from a description. A text prompt alone
produces a different man. Passing the real frame in as the identity reference
is the only thing that holds the likeness.

Pipeline: **Codex** (`codex exec`, one image per run, batched by
`tools/codex-shots.sh`), locked by Neil's direction after he compared engines.
`tools/nb.py` (Nano Banana Pro) exists as fallback only, and its output does
not ship without his sign-off. 4K/native masters live in `assets/portraits-4k/`
(gitignored); web derivatives are webp in `public/images/`.

Reference photographs live in `~/Pictures/AI Training Images`. Not every file
in that folder is Neil: the `Micah*` files are his son.

Shot mix follows the percentages in the master council doc:

| Band | Share | Shots |
|---|---|---|
| Documentary / lived capability | 50–60% | `neil-table` (Individuals), `neil-org-v2` (Organizations, AI-automation screen), `neil-room-v3` (Speaking + film poster) |
| Editorial portraiture | 20–25% | `neil-hero-v10m` (locked hero), `portrait-ink` |
| Physical / action proof | 10–15% | none shipped — Neil may supply a real gym still; `neil-training` master retained in `assets/portraits-4k/` |
| Detail / environment | 10–15% | none shipped — `detail-desk`, `measure-ruler` masters retained for a future mosaic |

Shipped set is deliberately small (Neil, 2026-08-29: "too many pictures"). Proof of Range runs the film lead and a text index until a real shoot exists; the 6–9 frame mosaic in the wireframe doc returns with real photography. Every revision ships under a new filename — browser caches burned the same-name replacement twice.

Every prompt carries four fixed blocks, in order: **identity** (reproduce the
face exactly, carry real pores, hair strands, lash edges, catchlights and
grain, do not smooth or beautify), **scene**, **grade** (ink shadows, bone
highlights, restrained and desaturated, skin warm and true, no teal-and-orange),
and **negatives**.

Wardrobe is locked to elevated utility: fitted solid tees, knit polos,
overshirts, textured shirts, dark denim, tailored trousers. Never a tactical
operator, never a suit in every frame, never luxury signalling. Training content
uses clean athletic wear and shows effort, not physique.

The first generated set was rejected because the likeness was visibly wrong:
softened jaw, different build. That failure is the reason the identity block
exists and why no shot is ever generated from a description alone.

## 3D rules

One signature 3D language, not a gimmick per section. It must explain,
symbolise, or transition. Mobile gets a deliberately simplified version. Static
poster frames always exist. Real HTML always carries the text.

## Absolute bans, enforced in review

Beyond the brand anti-references in PRODUCT.md:

- Side-stripe borders. No `border-left`/`border-right` above 1px used as a
  coloured accent on cards, callouts, or list items.
- Gradient text (`background-clip: text`).
- Decorative glassmorphism.
- The hero-metric template: big number, small label, gradient accent.
- Identical card grids repeating icon + heading + text.
- Modal as a first thought.
- **Em dashes in user-facing copy.** Use commas, colons, semicolons, periods, or
  parentheses.
