# Design System — Forged By War

## Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-black` | `#0d0d0d` | Page background |
| `brand-dark` | `#141414` | Section alternate bg, footer |
| `brand-charcoal` | `#1e1e1e` | Card backgrounds, inputs |
| `brand-muted` | `#2a2a2a` | Subtle backgrounds |
| `brand-border` | `#2e2e2e` | All borders |
| `brand-text` | `#e8e4de` | Primary body text |
| `brand-subtle` | `#9a9590` | Secondary/muted text |
| `brand-gold` | `#b8975a` | Primary accent, CTAs |
| `brand-gold-light` | `#d4af72` | Hover states on gold |
| `brand-white` | `#f4f1ec` | Headings, high-emphasis text |

---

## Typography

### Fonts
- **Display:** Playfair Display (serif) — headings and pull quotes
- **Body:** Inter (sans-serif) — all body copy, UI labels

### Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| H1 | 4xl–6xl | 600 | Page hero titles |
| H2 | 3xl–4xl | 600 | Section headings |
| H3 | 2xl–3xl | 500 | Sub-section headings |
| H4 | lg | 600, uppercase | Category labels |
| Body Large | lg–xl | 400 | Hero subheadlines, intros |
| Body | base | 400 | General copy |
| Subtle | sm | 400 | Supporting text, captions |
| Label | xs | 600, uppercase, tracked | Section eyebrow labels |
| Caption | xs | 400 | Fine print, metadata |

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Section LG | `py-16 md:py-24` | Main content sections |
| Section MD | `py-10 md:py-16` | Compact sections |
| Section SM | `py-6 md:py-10` | Tight sections (proof bars etc.) |
| Container | `px-6 md:px-10 lg:px-16` | All horizontal padding |
| Max width | `max-w-7xl` | Default container |
| Narrow | `max-w-3xl` | Text-heavy/editorial sections |

---

## Components

### Button Variants
| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | gold `#b8975a` | black | — | gold-light `#d4af72` |
| `secondary` | charcoal | off-white | brand-border | gold border + gold text |
| `ghost` | transparent | subtle | — | charcoal bg + white text |
| `gold-outline` | transparent | gold | gold | gold bg + black text |

### Button Sizes
| Size | Padding | Font |
|------|---------|------|
| `sm` | `px-5 py-2.5` | `text-sm` |
| `md` | `px-7 py-3.5` | `text-sm` |
| `lg` | `px-10 py-4` | `text-base` |

**Shape:** Square corners (no border-radius) — intentional brand decision.

---

## Layout Patterns

### Section Variants
| Variant | Bg colour |
|---------|-----------|
| `default` | `brand-black` |
| `dark` | `brand-dark` |
| `charcoal` | `brand-charcoal` |
| `bordered` | `brand-black` + top/bottom border |

### Container Widths
| Width | Max width | Usage |
|-------|-----------|-------|
| `default` | `max-w-7xl` | Standard sections |
| `narrow` | `max-w-3xl` | Editorial / text-heavy |
| `wide` | `max-w-screen-2xl` | Full-bleed image sections |

---

## Decorative Elements

- **Accent line:** `h-px w-12 bg-[#b8975a]` — used above/below headings
- **Top section glow:** gradient from transparent → gold/40 → transparent
- **Left border accent:** `border-l-2 border-[#b8975a]` — contact/callout items
- **Large quote mark:** `font-display text-5xl text-[#b8975a]` — testimonials

---

*This file is the source of truth for all visual decisions. Update when design evolves.*
