# KOVO Frontend Redesign Plan

## Current State Audit

The site is functional with all pages and e-commerce logic working. But the design suffers from "AI slop" — generic Inter font, flat backgrounds, no motion, predictable layouts, and missing brand personality. The new KOVO logo (geometric modular icon with connection nodes) is not yet integrated.

### Issues by Category

**Typography**: Uses Inter (explicitly banned by the skill doc). No display/body contrast. No serif accent. Weight range is narrow (medium/semibold only). Size jumps are too mild.

**Color**: oklch values are in place but `--background` has zero chroma warmth (`oklch(0.97 0 0)` — pure neutral). Amber accent is present but underused. Dark sections lack atmospheric gradients.

**Motion**: Zero animations. No page entrance, no hover micro-interactions beyond basic color transitions, no stagger reveals, no scroll-triggered effects.

**Backgrounds**: Flat solid colors everywhere. Hero has a radial gradient but it's weak. Section transitions are border-based, not atmospheric. No texture, no depth.

**Logo**: Still using old placeholder SVG. The new modular icon logo needs to be integrated.

**Layout**: Spacing is adequate but not generous enough for a premium brand. Product card placeholders are plain gray boxes. Hero could be more dramatic.

---

## Redesign Phases

### Phase R1: Foundation (Typography + Colors + Logo)
1. Replace Inter with **DM Sans** (primary) + **DM Serif Display** (accent headlines) via `next/font/google`
2. Add **JetBrains Mono** for prices/specs/dimensions
3. Update `globals.css` color variables with warmer `--background` (`oklch(0.97 0.008 80)`) and tuned palette
4. Replace `public/logo.svg` with the new modular icon logo from the provided PNG (recreate as SVG)
5. Add custom CSS properties for font families: `--font-display`, `--font-body`, `--font-mono`
6. Update Tailwind `@theme` block with new font variables

### Phase R2: Header + Footer Redesign
7. Header: taller (h-20), use new logo, refined nav link styling with underline-reveal hover, wider letter-spacing on nav items
8. Footer: richer layout, logo icon as decorative element, warm dark background with subtle amber gradient, improved typography hierarchy
9. Mobile nav: use Sheet (slide-in) instead of dropdown, add stagger animation on menu items

### Phase R3: Homepage Redesign
10. Hero: dramatic serif headline, taller (min-h-[70vh]), atmospheric dark background with noise texture + amber radial glow, staggered entrance animation
11. Features strip: icon containers with amber accent, subtle entrance animation on scroll
12. Featured Products section: improved ProductCard with hover lift + warm shadow, stagger reveal
13. "Kako funkcioniše" section: atmospheric warm gray background, numbered steps with connection-line decoration (referencing logo nodes)
14. B2B CTA: full-bleed dark section with subtle geometric pattern overlay

### Phase R4: Product Pages Redesign
15. ProductCard: serif product name, mono price, hover translateY(-6px) with warm box-shadow, atmospheric placeholder with geometric pattern
16. Product catalog page: refined filter bar, stagger-reveal grid
17. Product detail page: larger image area, serif product name, specs in mono font, improved module display with forge-node decorations
18. Sets page: improved bundle visualization

### Phase R5: Content Pages + Cart
19. "Kako funkcioniše" page: editorial layout with alternating image/text, scroll-triggered reveals
20. "O nama" page: editorial serif headlines, brand story with atmospheric sections
21. Contact page: refined form styling with warm focus states
22. Dostava page: improved delivery cards with icon emphasis
23. Galerija page: improved placeholders with modular-node geometric pattern
24. Cart/Checkout: refined typography hierarchy, warm amber progress feel

### Phase R6: Global Polish + Motion Layer
25. Add framer-motion: page transition wrapper with fade-in
26. Add scroll-triggered section reveals via Intersection Observer component
27. Add stagger-reveal utility for grid items
28. Cart badge bounce animation on count change
29. Button press micro-interaction (scale)
30. Final spacing audit: ensure 80-120px section padding desktop, 48-64px mobile
31. Build, test, deploy, push to GitHub
