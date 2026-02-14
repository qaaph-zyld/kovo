# Reference Analysis: Stripe.com

**Date**: 2026-02-14
**Researcher**: AI Design Implementer
**Category**: Design Exemplar — Fintech / Trust-Building

---

## Overall Philosophy

**"Layered but controlled"** — Stripe builds trust through visual depth, gradient richness, and meticulous attention to detail. Every element communicates "we handle the hard stuff so you don't have to." The design is simultaneously complex and clear.

---

## First Impressions (5 seconds)

- **Eye catches**: The gradient mesh hero — rich, colorful, dynamic
- **Emotional tone**: Trust, sophistication, capability — "serious technology, beautiful execution"
- **Action pushed**: Start now / Contact sales — dual-path for different audiences

---

## Layout Architecture

```
HERO STRUCTURE:
- Content placement: Left-aligned text, right-side visual/demo
- Visual weight distribution: 50/50 split or 40/60 (text/visual)
- CTA prominence: High — two CTAs (primary + secondary), clear hierarchy

SECTION PATTERN:
- Section count above fold: 1 (hero only, but rich)
- Section rhythm: Varied — alternating dense feature grids and spacious editorial sections
- Grid structure: Mix of asymmetric splits and feature grids with hierarchy
```

---

## Typography Analysis

```
HEADLINE:
- Font: Custom (Stripe-specific) / similar to Inter Display
- Size: 48-64px display
- Weight: Bold (700)
- Line height: Tight (1.05-1.1)
- Letter spacing: Tight (-0.02em)

BODY:
- Font: System stack / Inter
- Size: 17-19px
- Weight: Regular (400)
- Line height: Relaxed (1.65-1.75)
- Max width: ~580px

CONTRAST RATIO:
- Headline to body: ~3.5:1 size ratio
- Primary to secondary: Strong — dark headlines, medium-gray body
```

---

## Color Documentation

```
PRIMARY COLOR:
- Hue: Deep indigo/purple (#635BFF range)
- Saturation: Vivid
- Lightness: Medium

ACCENT USAGE:
- Where used: CTAs, gradient meshes, feature highlights, status indicators
- Frequency: Moderate — more colorful than Linear/Vercel, but controlled
- Palette: Multi-color gradients (purple → blue → teal → green)

BACKGROUND:
- Type: Gradient mesh on dark, clean white/off-white for content
- Color: Dark sections use rich gradient meshes; light sections use pure white
- Texture: Minimal — relies on color depth rather than texture
```

---

## Spacing Patterns

```
DENSITY:
- Overall: Generous — breathing room everywhere
- Above fold: Comfortable — hero has ample padding
- Section padding: Very generous (120-160px vertical)

RHYTHM:
- Consistency: Varied intentionally — editorial sections are spacious, feature grids are tighter
- Vertical rhythm: Generous between sections
- Horizontal rhythm: Comfortable — content never feels cramped
```

---

## Component Patterns

```
BUTTONS:
- Shape: Moderate rounding (8-10px)
- Size: Medium to large
- Prominence: Primary = filled (brand color), Secondary = outline or ghost
- Hover state: Brightness shift + subtle shadow increase

CARDS:
- Border radius: Moderate (8-12px)
- Shadow: Multi-level — subtle base shadow + stronger hover shadow
- Padding: Generous
- Content density: Medium — clean with clear hierarchy
- Special: "Layered card" pattern — cards that appear to float above background

NAVIGATION:
- Position: Top, sticky
- Style: Clean, with clear section organization
- Content: Organized into product categories, not flat list
```

---

## Interaction Patterns

```
HOVER STATES:
- Type: Shadow increase + subtle lift (-translate-y), color shift
- Speed: Medium (200-300ms)

SCROLL BEHAVIOR:
- Animations: Yes — rich scroll-driven animations, parallax on product demos
- Parallax: Yes, subtle — background elements move at different rates
- Sticky elements: Navigation, sometimes section headers

TRANSITIONS:
- Frequency: Moderate to frequent
- Style: Smooth, polished — ease-out curves, 200-400ms
```

---

## Key Patterns Extracted

### 1. Layered Depth System
- **What it is**: Multiple visual layers create depth — background gradient → card shadow → content. Cards appear to float above the surface.
- **Why it works**: Depth communicates sophistication and attention to detail. It makes flat screens feel three-dimensional.
- **KOVO application**: Currently using `shadow-warm` and `shadow-warm-lg` for hover states. Could add a subtle base shadow to important cards (not just on hover) to create persistent depth. The `hover:-translate-y-1.5` on ProductCard is aligned with Stripe's lift pattern.

### 2. Gradient Mesh Hero
- **What it is**: Rich, multi-color gradient meshes as hero backgrounds. Not flat gradients — organic, flowing shapes.
- **Why it works**: Creates visual richness and energy without photography. Feels premium and unique.
- **KOVO application**: Using oklch radial gradients in hero sections — this is a simplified version of Stripe's approach. Could add a second gradient layer for more depth. The amber-on-dark gradient is appropriate for KOVO's warm palette.

### 3. Trust Through Visual Polish
- **What it is**: Every detail is polished — consistent spacing, perfect alignment, smooth animations, no rough edges.
- **Why it works**: In fintech, trust is everything. Visual polish signals "we care about details" which translates to "we'll handle your money carefully."
- **KOVO application**: For a craftsman brand, the same principle applies — visual polish signals "we care about craft." Every misaligned element or inconsistent hover state undermines the "precision" brand promise. This is why the component polish pass (Phase 10) matters.

### 4. Dual-Path CTA Strategy
- **What it is**: Two CTAs side by side — one for self-serve (primary), one for sales/enterprise (secondary). Different visual weight.
- **Why it works**: Serves both B2C and B2B audiences without forcing a choice. The primary CTA catches most users; the secondary catches high-value leads.
- **KOVO application**: Already implemented on homepage hero ("Pogledajte kolekciju" primary + "Kako funkcioniše" secondary) and B2B section ("Zatražite B2B ponudu" + "Pogledajte setove"). Well-aligned.

### 5. Feature Grid with Hierarchy
- **What it is**: Feature sections where one item is visually larger/more prominent than others. Not a flat grid — one hero feature + supporting features.
- **Why it works**: Guides attention to the most important feature first, then lets users explore secondary features.
- **KOVO application**: The new "How it works" asymmetric layout (7+5 columns) and the product grid hero card are direct applications of this principle. Continue applying to any grid of 3+ items.

### 6. Editorial Section Spacing
- **What it is**: Very generous vertical padding (120-160px) between major sections. Content breathes.
- **Why it works**: Generous spacing signals premium. Cramped spacing signals budget.
- **KOVO application**: Currently using `py-20 sm:py-28` (80-112px). Could push to `py-24 sm:py-32` (96-128px) for key editorial sections like the o-nama origin story. The current spacing is good but could be slightly more generous on the about page.

### 7. Progressive Disclosure
- **What it is**: Information is revealed progressively — hero → overview → details → deep dive. Each section adds depth.
- **Why it works**: Prevents information overload. Users who want more can scroll; users who want less can act early.
- **KOVO application**: Homepage flow is well-structured: Hero → Features → Products → Platform → How it works → B2B CTA. Each section adds depth. The o-nama page also follows this pattern well.

---

## What NOT to Copy

- **Multi-color gradient palette** — Stripe uses purple/blue/teal/green gradients. KOVO should stay within the warm amber/copper palette. Multi-color would dilute the brand.
- **White backgrounds for content sections** — KOVO uses `oak-warm-white` and `workshop-gray` which are warmer. Pure white would feel too clinical.
- **Complex interactive demos** — Stripe embeds live code editors and API demos. KOVO doesn't need this level of interactivity.
- **Enterprise-focused copy tone** — Stripe speaks to developers and businesses. KOVO speaks to homeowners and café owners — warmer, more personal.

---

## Principles KOVO Can Apply

1. **Add persistent subtle shadows to key cards** — Not just on hover; a light base shadow creates depth
2. **Continue gradient mesh technique** — Already well-applied; consider adding second gradient layer for more richness
3. **Visual polish = trust** — Every inconsistency undermines the craftsman brand promise
4. **Dual-path CTAs** — Already implemented; maintain for B2C/B2B split
5. **Feature grids with hierarchy** — Never use flat equal-weight grids for 3+ items
6. **Generous section spacing** — Push editorial sections to `py-24 sm:py-32` for premium feel
7. **Progressive disclosure** — Maintain the hero → overview → details → CTA flow

---

*Analysis Version: 1.0*
