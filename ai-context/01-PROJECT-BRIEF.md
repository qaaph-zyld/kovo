# PROJECT BRIEF — KOVO

> **This brief defines the KOVO project vision. AI must read this before writing any code.**

---

## PROJECT OVERVIEW

### Project Name
KOVO — Modularni kovani nameštaj

### One-Line Description
Premium modular wrought iron furniture e-commerce — flat-pack delivery, tool-free assembly.

### Primary Purpose
Sell the LINEA collection of modular wrought iron furniture (chairs, tables, benches, sets) to Serbian consumers and B2B clients (cafés, restaurants, hotels). Communicate that premium wrought iron furniture can arrive flat-pack, assemble in minutes, and last for years — eliminating transport damage and complexity.

---

## BRAND IDENTITY

### Brand Personality (3 Adjectives Maximum)
1. Confident
2. Precise
3. Warm Industrial

### Emotional Goal
Users should feel **trust in craftsmanship** — the confidence that comes from seeing something built with precision and care. Not cold-tech sterility, not rustic nostalgia. The feeling of a blacksmith who studied at a design school.

### Brand Voice
Direct, warm, expert. Serbian language throughout. No corporate filler. Speaks like a master craftsman who respects the customer's intelligence. Every CTA says exactly what it does.

---

## VISUAL DIRECTION

### What I LOVE (Be Specific)
1. High-contrast typography — extreme size jumps between display (5xl–7xl) and body (base/lg), weight contrasts of 200 vs 800
2. Warm industrial tones — forged iron blacks, copper/amber accents, warm off-whites derived from physical materials
3. Atmospheric dark sections — iron-deep backgrounds with subtle radial amber glow, noise texture overlays for material feel
4. Editorial product photography as hero — layouts where the product is the star, not UI chrome
5. Generous spacing that breathes — sections with 80–120px vertical padding, like an open terrace

### What I HATE (Be Brutal)
1. Pastel gradients — especially purple-to-pink, the "AI default"
2. `rounded-2xl` / `rounded-3xl` everywhere — soft, childish, loses the industrial edge
3. Inter font or any generic sans-serif — zero brand distinction
4. Generic SaaS hero (centered headline + centered button + "Get Started")
5. Cold clinical design, blue accents, flat white backgrounds — conflicts with brand warmth

### Reference Sites

| Site URL | What I Like About It |
|----------|---------------------|
| linear.app | Sharp minimal density, information-rich, precise edges |
| stripe.com | Layered depth, polished animation, content hierarchy through size contrast |
| vercel.com | Dark tech elegance, monospace accents, neon-on-dark energy |
| Premium furniture brands (Restoration Hardware, Kettal) | Product-as-hero photography, generous spacing, editorial layouts |

### Sites to AVOID

| Site URL | What I Dislike About It |
|----------|------------------------|
| Generic Tailwind template sites | Soft shadows, rounded everything, pastel gradients, 3-column feature grids |
| Cheap furniture e-commerce | Cluttered, low-quality imagery, aggressive popups, no brand identity |

---

## CONVERSION GOALS

### Primary Action
Add product to cart → Complete purchase (e-commerce conversion)

### Secondary Actions
1. Request B2B quote (for cafés, restaurants, hotels)
2. Explore the LINEA collection (browse products)
3. Understand modularity (how flat-pack + assembly works)

### Conversion Path
Landing → Hero communicates value prop → Browse products/sets → Product detail with configurator → Add to cart → Cart drawer → Checkout. B2B path: Landing → B2B CTA section → Contact form with "b2b" type.

---

## DESIGN CONSTRAINTS

### Layout Density
- [x] Balanced (comfortable spacing, clear sections)
- Premium product showcase — generous but not wasteful. Sections breathe like an open terrace.

### Border Radius Preference
- [x] Subtle rounding (4-8px for buttons/inputs)
- [x] Moderate rounding (12-16px for cards, image containers)
- Base radius: 0.625rem (10px). Cards: radius-lg to radius-2xl. Never rounded-3xl+.

### Shadow Philosophy
- [x] Subtle / Minimal shadows
- Warm-toned shadows only (oklch warm undertone, not pure black). `shadow-warm` and `shadow-warm-lg` defined in globals.css.

### Color Contrast Preference
- [x] High contrast / Bold
- Iron black text on warm white backgrounds. Forge amber accents pop against both light and dark sections.

### Animation Approach
- [x] Moderate / Some delight
- Weighted "settle-in-place" animations (600ms, cubic-bezier(0.25, 0.46, 0.45, 0.94)). Stagger reveals. Functional hover states. No decorative motion.

---

## CONTENT STRATEGY

### Key Messages (Prioritized)
1. Premium wrought iron furniture that arrives flat-pack — no transport damage
2. Assembly in 15–45 minutes with included tools
3. Modular system — shared parts, replaceable components, one platform many products
4. Built to last outdoors — anti-corrosion protection, solid oak + forged iron
5. Available for B2B — cafés, restaurants, hotels with volume pricing

### Content Density
- [x] Rich (full information, multiple sections)
- Product pages are information-rich. Homepage balances hero impact with feature communication.

### Trust Elements Needed
- [x] Statistics / Numbers (assembly time, weight capacity, material specs)
- [x] Certifications / Badges (anti-corrosion, material quality)
- [x] Case studies (B2B installations)
- Quantified social proof over generic logo bars.

---

## TECHNICAL REQUIREMENTS

### Must-Have Features
1. Product catalog with filtering (by type, by set)
2. Cart with drawer UI (Zustand state management)
3. Module configurator (exploded view, part selection)
4. Responsive design (mobile-first, touch-friendly)

### Nice-to-Have Features
1. Design generator (AI-powered custom configurations)
2. QR code assembly instructions
3. B2B quote calculator

### Browser/Device Priority
- [x] Equal priority (desktop for browsing, mobile for on-site reference)

### Performance Constraints
Static export to Netlify. No server-side rendering. Images via next/image with unoptimized:true.

---

## OUT OF SCOPE

1. Payment processing / checkout flow (future phase)
2. User accounts / authentication
3. Real-time inventory management

---

## ADDITIONAL NOTES

- All text content in **Serbian (sr)** with proper characters (č, ć, š, ž, đ)
- Fonts loaded via `next/font/google` with `latin-ext` subset
- Colors in oklch() format via CSS custom properties
- Stack: Next.js 16, Tailwind CSS v4, shadcn/ui, Zustand, framer-motion

---

*Brief Version: 1.0*
*Last Updated: 2026-02-14*
