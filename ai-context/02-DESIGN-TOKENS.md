# DESIGN TOKENS — KOVO

> **This is KOVO's constraint system. You may NOT use arbitrary values.**
> **Every visual decision must trace back to a token defined here.**

---

## TOKEN PHILOSOPHY

KOVO's tokens are derived from physical materials: forged iron (near-black), aged oak (warm amber/copper), workshop concrete (warm grays), and the bright sky above an outdoor terrace. Every color, spacing value, and motion curve should feel like it belongs in a blacksmith's workshop that was designed by a modernist architect.

If a token is missing, ASK before creating arbitrary values.

---

## COLOR SYSTEM

### Primary Palette — Iron & Forge

```
NAME                  VALUE                    USAGE
─────────────────────────────────────────────────────────────
iron-deep             oklch(0.08 0 0)          Darkest backgrounds (hero, footer)
iron-black            oklch(0.12 0 0)          Primary text, dark sections, nav
foreground            oklch(0.12 0 0)          Default text color
forge-amber-dark      oklch(0.48 0.14 50)      Active/pressed CTA states
forge-amber           oklch(0.55 0.14 55)      Primary CTA, accent highlights, price tags ★ SIGNATURE COLOR
forge-amber-light     oklch(0.62 0.16 60)      Hover CTA states, accent text on dark
copper                oklch(0.65 0.12 55)       Secondary accents, hover highlights
```

### Neutral Palette — Workshop Materials

```
NAME                  VALUE                    USAGE
─────────────────────────────────────────────────────────────
ash                   oklch(0.5 0 0)           Muted text, secondary information
muted-foreground      oklch(0.45 0 0)          Placeholder text, tertiary content
border                oklch(0.9 0.008 80)      Default borders, dividers
workshop-gray         oklch(0.94 0.006 80)     Card backgrounds, secondary surfaces
oak-white             oklch(0.97 0.008 80)     Page backgrounds (warm off-white, NEVER pure #fff)
card                  oklch(0.98 0.005 80)     Card surfaces (slightly lighter than page)
```

### Semantic Colors

```
NAME                  VALUE                    USAGE
─────────────────────────────────────────────────────────────
success               oklch(0.6 0.15 145)      In stock, added to cart, confirmations
destructive           oklch(0.577 0.245 27.325) Error states, destructive actions
terrace-sky           oklch(0.92 0.02 230)     Very subtle atmospheric backgrounds only
```

### Dark Section Colors (Hero, B2B CTA, Footer)

```
NAME                  VALUE                    USAGE
─────────────────────────────────────────────────────────────
dark-bg               oklch(0.08 0 0)          Section background
dark-bg-alt           oklch(0.12 0 0)          Slightly lighter dark surface
dark-text-primary     oklch(0.92 0 0)          Primary text on dark
dark-text-muted       oklch(0.6 0 0)           Muted text on dark
dark-border           oklch(1 0 0 / 10%)       Borders on dark surfaces
dark-input            oklch(1 0 0 / 15%)       Input backgrounds on dark
```

### Atmospheric Gradients

```
NAME                          VALUE                                                    USAGE
──────────────────────────────────────────────────────────────────────────────────────────────
amber-glow-strong             radial-gradient(ellipse at top right,                     Hero sections
                              oklch(0.55 0.14 55 / 0.12), transparent 60%)
amber-glow-subtle             radial-gradient(ellipse at bottom left,                   Secondary dark sections
                              oklch(0.55 0.14 55 / 0.06), transparent 50%)
amber-glow-minimal            radial-gradient(ellipse at top right,                     B2B CTA, footer
                              oklch(0.55 0.14 55 / 0.08), transparent 60%)
section-warmth                linear-gradient(to bottom,                                Workshop-gray sections
                              transparent, oklch(0.55 0.14 55 / 0.02), transparent)
```

### Color Rules

- **Page backgrounds**: Use only oak-white. NEVER pure white (#fff).
- **Card backgrounds**: Use card or workshop-gray. Never flat white.
- **Text on light**: Use iron-black (foreground) for primary, ash/muted-foreground for secondary.
- **Text on dark**: Use dark-text-primary for primary, dark-text-muted for secondary.
- **CTAs**: forge-amber (default), forge-amber-light (hover), forge-amber-dark (active).
- **Borders**: Use border token. On dark: dark-border (white/10%).
- **Accents**: forge-amber for primary accent, copper for secondary. NEVER blue.
- **Dark sections**: Always add atmospheric amber glow gradient + noise-overlay.

---

## TYPOGRAPHY SYSTEM

### Font Stack

```
PRIMARY FONT:     DM Sans              Used for: body, UI, subheadings
DISPLAY FONT:     DM Serif Display     Used for: hero headlines, section titles, editorial moments
MONOSPACE FONT:   JetBrains Mono       Used for: prices, dimensions, step numbers, technical specs
```

All loaded via `next/font/google` with `latin-ext` subset for Serbian characters (č, ć, š, ž, đ).

CSS variables: `--font-sans`, `--font-display`, `--font-mono`.

### Type Scale (Extreme Contrast Philosophy)

```
NAME              SIZE        LINE-HEIGHT    LETTER-SPACING    WEIGHT      FONT        USAGE
──────────────────────────────────────────────────────────────────────────────────────────────
display-hero      text-7xl    leading-[1.05] tracking-tight    400         display     Hero headline (desktop)
display-lg        text-6xl    leading-[1.05] tracking-tight    400         display     Hero headline (tablet)
display-md        text-5xl    leading-[1.05] tracking-tight    400         display     Hero headline (mobile)
heading-section   text-4xl    tracking-tight N/A               400         display     Section titles
heading-lg        text-3xl    tracking-tight N/A               400         display     Large headings
heading-md        text-xl     tracking-tight N/A               700         sans        Card titles, subheadings
heading-sm        text-lg     tracking-tight N/A               600         sans        Small headings
body-lg           text-lg     leading-relaxed N/A              300         sans        Lead paragraphs, hero body
body-md           text-base   leading-relaxed N/A              400         sans        Default body text
body-sm           text-sm     leading-relaxed N/A              400         sans        Secondary text, descriptions
label-upper       text-xs     N/A            tracking-[0.15em] 600         sans        Section labels, badges (UPPERCASE)
mono-display      text-4xl    N/A            N/A               700         mono        Step numbers, large data
mono-sm           text-sm     N/A            N/A               500         mono        Prices, dimensions, specs
```

### Typography Rules

- **Display headlines**: ALWAYS use `font-display` (DM Serif Display), weight 400, sizes 5xl–7xl
- **Section titles**: Use `font-display`, sizes 3xl–4xl
- **Body text**: Use `font-sans` (DM Sans), weights 300–500
- **Labels/badges**: DM Sans, uppercase, tracking-[0.12em] to tracking-[0.15em], font-semibold, text-xs
- **Technical data**: JetBrains Mono for prices, dimensions, step numbers
- **Size contrast**: Minimum 3x ratio between display and body sizes
- **Weight contrast**: Minimum 400 units between light body (200/300) and bold headlines (700/800)
- **NEVER** use Inter, Roboto, Open Sans, Lato, Arial, or system-ui defaults
- **NEVER** mix more than 3 font families in a view

---

## SPACING SYSTEM

### Base Unit: 4px

```
NAME              VALUE     TAILWIND        USAGE
──────────────────────────────────────────────────────────
space-0           0px       p-0             Reset
space-1           4px       p-1             Micro spacing (icon gaps)
space-2           8px       p-2             Tight spacing (badge padding)
space-3           12px      p-3             Compact spacing
space-4           16px      p-4             Default component padding
space-5           20px      p-5             Comfortable internal
space-6           24px      p-6             Card padding, component gaps
space-8           32px      p-8             Card content padding, large gaps
space-10          40px      p-10            Section internal spacing
space-12          48px      p-12            Mobile section padding
space-14          56px      py-14           Feature strip padding
space-16          64px      py-16           Mobile section vertical padding
space-20          80px      py-20           Desktop section vertical padding
space-24          96px      py-24           Large desktop sections
space-28          112px     py-28           Major desktop sections
space-32          128px     py-32           Hero vertical padding (desktop)
```

### Spacing Rules

- **Component internal**: space-2 through space-4 (8–16px)
- **Card padding**: space-6 to space-8 (24–32px). NEVER less than space-4 (16px).
- **Component gaps**: space-6 to space-8 (24–32px) for card grids
- **Section padding (mobile)**: space-12 to space-16 (48–64px) vertical
- **Section padding (desktop)**: space-20 to space-28 (80–112px) vertical
- **Hero padding (desktop)**: space-24 to space-32 (96–128px) vertical
- **Max content width**: max-w-7xl (1280px)
- **NEVER** use arbitrary values like `p-[17px]` or `mt-[23px]`
- **Philosophy**: Generous. Let content breathe like an open terrace.

---

## BORDER RADIUS SYSTEM

### Radius Scale

```
NAME              VALUE                           TAILWIND            USAGE
─────────────────────────────────────────────────────────────────────────────
radius-none       0px                             rounded-none        Sharp edges (rare)
radius-sm         calc(0.625rem - 4px) ≈ 6px      rounded-sm          Subtle rounding (badges)
radius-md         calc(0.625rem - 2px) ≈ 8px      rounded-md          Buttons, inputs
radius-lg         0.625rem = 10px                  rounded-lg          Default cards, containers
radius-xl         calc(0.625rem + 4px) ≈ 14px     rounded-xl          Prominent cards, image containers
radius-2xl        calc(0.625rem + 8px) ≈ 18px     rounded-2xl         Feature cards (USE SPARINGLY)
radius-full       9999px                           rounded-full        Pills, avatar circles only
```

### Radius Rules

- **Buttons**: radius-md (8px) consistently
- **Cards**: radius-lg to radius-xl (10–14px)
- **Image containers**: radius-xl (14px) with overflow-hidden
- **Icon containers**: radius-xl (14px)
- **Inputs**: radius-md (8px)
- **Feature/step cards**: radius-xl to radius-2xl (14–18px) MAX
- **NEVER** use `rounded-3xl` or higher
- **NEVER** use `rounded-2xl` as the default — it's reserved for special emphasis only
- **NEVER** mix radius values inconsistently within the same section

---

## SHADOW SYSTEM

### Shadow Scale

```
NAME              VALUE                                           USAGE
──────────────────────────────────────────────────────────────────────────
shadow-none       none                                            Flat surfaces (default)
shadow-warm       0 4px 24px -4px oklch(0.3 0.03 60 / 0.12)     Hover state for cards
shadow-warm-lg    0 8px 40px -8px oklch(0.3 0.03 60 / 0.18)     Elevated elements, modals
shadow-2xl        Tailwind default                                Hero images, dramatic elevation
```

### Shadow Rules

- **Default cards**: NO shadow (flat with border). Shadow appears on hover only.
- **Hover state**: Transition to shadow-warm
- **Elevated elements**: shadow-warm-lg
- **Hero images**: shadow-2xl (Tailwind default, for dramatic effect)
- **Shadows are WARM-TONED** — oklch with warm undertone, never pure black
- **NEVER** put shadows on everything — use selectively for hierarchy
- **NEVER** use colored shadows unless it's the warm system defined above

---

## MOTION SYSTEM

### Duration Scale

```
NAME              VALUE       USAGE
──────────────────────────────────────────────
duration-micro    200ms       Hover color transitions, button press
duration-fast     300ms       Badge bounce, micro-interactions
duration-normal   500ms       Fade-in, scale-in animations
duration-settle   600ms       Primary entrance animation (settle-in-place)
```

### Easing Functions

```
NAME              VALUE                                   USAGE
──────────────────────────────────────────────────────────────────────
ease-settle       cubic-bezier(0.25, 0.46, 0.45, 0.94)   ALL KOVO animations — weighted, decelerating
                                                          Feels like something heavy settling into place
```

### Animation Keyframes

```
NAME              TRANSFORM                               USAGE
──────────────────────────────────────────────────────────────────────
kovo-settle       translateY(20px) + opacity:0 → reset    Primary entrance (sections, cards)
kovo-fade-in      opacity:0 → opacity:1                   Subtle reveals
kovo-scale-in     scale(0.95) + opacity:0 → reset         Modal/overlay entrances
kovo-slide-right  translateX(-20px) + opacity:0 → reset   Horizontal reveals
kovo-badge-bounce scale(1) → scale(1.25) → scale(1)      Cart badge count change
```

### Stagger Delays

```
NAME              VALUE       USAGE
──────────────────────────────────────────────
stagger-1         80ms        First child delay
stagger-2         160ms       Second child
stagger-3         240ms       Third child
stagger-4         320ms       Fourth child
stagger-5         400ms       Fifth child
stagger-6         480ms       Sixth child
```

### Motion Rules

- **Page load**: Stagger-reveal content sections using animate-settle + stagger-N classes
- **Hover states**: duration-micro (200ms), color/shadow transitions only
- **Button press**: scale(1.02) on hover, 200ms transition
- **Product cards**: translateY(-4px) + shadow-warm on hover
- **Links**: Underline reveal via scaleX(0) → scaleX(1), transform-origin left, 250ms
- **Scroll-triggered**: Intersection Observer via ScrollReveal component, 60ms stagger per card
- **NEVER** add motion that doesn't clarify hierarchy or state change
- **NEVER** use bouncy/elastic easing — KOVO motion is weighted and deliberate
- **Philosophy**: "Like metal being set into place — deliberate, weighted, satisfying"

---

## Z-INDEX SCALE

```
NAME              VALUE     USAGE
──────────────────────────────────────────────
z-base            0         Default layer
z-content         1         Content above noise-overlay/dot-grid
z-sticky          20        Sticky header
z-drawer          30        Cart drawer
z-modal-backdrop  40        Modal backdrops
z-modal           50        Modals
z-tooltip         60        Tooltips
z-max             9999      Maximum layer
```

---

## BREAKPOINT SYSTEM

```
NAME              VALUE      USAGE
──────────────────────────────────────────────
sm                640px      2-column product grids, side-by-side CTAs
md                768px      Tablet layouts
lg                1024px     3-column grids, hero 2-column layout, desktop nav
xl                1280px     Max content width (max-w-7xl)
2xl               1536px     Large screen optimizations
```

---

## COMPONENT-SPECIFIC TOKENS

### Button Tokens

```
btn-padding-x:        space-8 (px-8 for lg), space-4 (px-4 for default)
btn-padding-y:        Built into size variant
btn-font-size:        body-sm (text-sm)
btn-font-weight:      font-medium (500) to font-semibold (600)
btn-border-radius:    radius-md (rounded-md)
btn-primary-bg:       forge-amber
btn-primary-hover:    forge-amber-light + scale(1.02)
btn-primary-active:   forge-amber-dark
btn-outline-border:   white/15 (on dark), border (on light)
btn-outline-hover:    white/30 border + white/5 bg (on dark)
```

### Card Tokens

```
card-padding:         space-6 to space-8 (p-6 to p-8)
card-border-radius:   radius-xl (rounded-xl) to radius-2xl
card-shadow:          shadow-none (default), shadow-warm (hover)
card-border:          1px solid border (border-border/60 for subtlety)
card-bg:              card token (oklch(0.98 0.005 80))
card-image-radius:    radius-xl (rounded-xl) with overflow-hidden
card-image-aspect:    aspect-[4/3]
```

### Badge Tokens

```
badge-padding:        px-4 py-1.5
badge-font-size:      text-xs
badge-font-weight:    font-semibold (600)
badge-tracking:       tracking-[0.12em]
badge-text-transform: uppercase
badge-bg:             forge-amber/10
badge-border:         forge-amber/30
badge-text:           forge-amber-light (on dark), forge-amber (on light)
```

### Section Label Tokens

```
label-font-size:      text-xs
label-font-weight:    font-semibold (600)
label-text-transform: uppercase
label-tracking:       tracking-[0.15em]
label-color:          forge-amber
label-margin-bottom:  mb-2
```

---

## DECORATIVE ELEMENT TOKENS

### Noise Overlay
```
Applied via: .noise-overlay::before
Opacity: 3% (0.03)
Usage: Dark sections (hero, B2B CTA, footer)
```

### Dot Grid
```
Applied via: .dot-grid
Color: forge-amber at 6% opacity
Size: 24px × 24px grid
Usage: Decorative background on dark sections (partial coverage)
```

### Warm Gradient Dividers
```
Thin horizontal rules with gradient fade:
amber center → transparent edges
Usage: Section dividers (sparingly)
```

---

## TOKEN USAGE EXAMPLES

### Correct Usage (Tailwind)

```tsx
{/* Button — uses token classes */}
<Button className="bg-forge-amber px-8 text-white transition-all duration-200 hover:bg-forge-amber-light hover:scale-[1.02]">

{/* Card — uses token classes */}
<div className="rounded-xl border border-border/60 bg-card p-8 transition-all duration-300 hover:shadow-warm">

{/* Section label — uses token pattern */}
<p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-forge-amber">

{/* Display heading — uses font-display */}
<h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
```

### Incorrect Usage (DO NOT DO THIS)

```tsx
{/* Arbitrary colors — FORBIDDEN */}
<div className="bg-[#f5f5f5]">           {/* Use bg-workshop-gray */}
<div className="text-[#666]">            {/* Use text-muted-foreground */}
<div className="bg-white">               {/* Use bg-oak-white or bg-background */}

{/* Arbitrary spacing — FORBIDDEN */}
<div className="p-[17px]">               {/* Use p-4 (16px) */}
<div className="mt-[23px]">              {/* Use mt-6 (24px) */}

{/* Wrong radius — FORBIDDEN */}
<div className="rounded-3xl">            {/* Max is rounded-2xl, sparingly */}

{/* Wrong font — FORBIDDEN */}
<h1 className="font-sans text-4xl">      {/* Display headings use font-display */}
```

---

## FOR AI: TOKEN ENFORCEMENT

When implementing designs:

1. **Before writing any CSS/Tailwind:**
   - Check if token exists for the value you need
   - If token doesn't exist → ASK, don't invent

2. **When token is missing:**
   ```
   ⚠️ MISSING TOKEN

   I need a value for: [property]
   Current options: [existing tokens]

   Should I:
   A) Use closest token: [token name]
   B) Create new token: [proposed value]
   C) Use arbitrary value: [value] (not recommended)
   ```

3. **Never** silently use arbitrary values like `p-[17px]` or `text-[13px]`

---

*Token Version: 1.0 — KOVO*
*Last Updated: 2026-02-14*
