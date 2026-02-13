# ANTI-PATTERNS REFERENCE

> **These are the patterns that make things look "AI-coded."**
> **If you see them, they are red flags.**
> **Remove, replace, or rework.**

---

## THE ANATOMY OF "AI VIBE"

What makes something look AI-generated?

1. **Safety** - AI defaults to safe, common patterns
2. **Symmetry** - AI loves balance and centering
3. **Softness** - AI defaults to rounded, gentle shapes
4. **Genericism** - AI uses common patterns from training data
5. **Templating** - AI follows recognizable structures

Professional design often does the opposite.

---

## CATEGORY 1: LAYOUT ANTI-PATTERNS

### AP-1.1: The Generic Hero

**What it looks like**:
```
┌─────────────────────────────────────────────┐
│                                             │
│             ┌─────────────────────┐         │
│             │    Centered Logo    │         │
│             └─────────────────────┘         │
│                                             │
│         ╔═════════════════════════╗         │
│         ║   CENTERED HEADLINE     ║         │
│         ║   That Is Two Lines     ║         │
│         ╚═════════════════════════╝         │
│                                             │
│           Supporting text here              │
│                                             │
│           ┌─────────────────┐               │
│           │   Get Started   │               │
│           └─────────────────┘               │
│                                             │
│         Secondary link below                │
│                                             │
└─────────────────────────────────────────────┘
```

**Why it's bad**:
- Most cliché pattern on the web
- Instantly recognizable as template
- No visual tension or interest
- Users ignore it (banner blindness)

**Alternatives**:
- Split hero (text left, visual right)
- Asymmetric content placement
- Off-center focal point
- Full-bleed imagery with overlay
- Edge-to-edge layout
- Content-first, action-second approach

---

### AP-1.2: The Three-Column Feature Grid

**What it looks like**:
```
┌───────────────────────────────────────────────────────┐
│                      Features                         │
├─────────────────┬─────────────────┬───────────────────┤
│  ┌───────────┐  │  ┌───────────┐  │  ┌───────────┐   │
│  │   Icon    │  │  │   Icon    │  │  │   Icon    │   │
│  └───────────┘  │  └───────────┘  │  └───────────┘   │
│    Feature 1    │    Feature 2    │    Feature 3     │
│  Description    │  Description    │  Description     │
│     here        │     here        │     here         │
└─────────────────┴─────────────────┴───────────────────┘
```

**Why it's bad**:
- Tailwind/Landing page default
- Creates no visual hierarchy
- All features appear equal (usually not true)
- Users scan and skip

**Alternatives**:
- One large feature, two smaller
- Horizontal scrolling showcase
- Featured feature with details
- Interactive feature explorer
- Progressive disclosure pattern

---

### AP-1.3: Perfect Centering

**What it looks like**:
- Everything aligned to center
- Content perfectly balanced
- No visual tension
- Predictable eye movement

**Why it's bad**:
- Creates no visual interest
- Feels static and boring
- No hierarchy through position
- Looks unconsidered

**Alternatives**:
- Left-align with right accent
- Deliberate imbalance
- Grid-breaking elements
- Asymmetric emphasis

---

## CATEGORY 2: SHAPE ANTI-PATTERNS

### AP-2.1: Rounded Everything

**What it looks like**:
```css
/* The AI default */
rounded-2xl    /* 16px - too round */
rounded-3xl    /* 24px - way too round */
rounded-full   /* Pills everywhere */
```

**Why it's bad**:
- Softens everything unnecessarily
- Loses edge and precision
- Feels childish or casual
- Loses professional feel

**Alternatives by personality**:
| Brand Feel | Max Radius |
|------------|------------|
| Technical/Sharp | 0-4px |
| Professional | 4-8px |
| Modern/Balanced | 8-12px |
| Friendly/Approachable | 12-16px |
| Playful | 16px+ |

---

### AP-2.2: Card Shadows Everywhere

**What it looks like**:
- Every card has a shadow
- Shadows are soft and diffuse
- Everything appears elevated
- No flat surfaces

**Why it's bad**:
- Creates visual noise
- Loses impact of actual elevation
- Feels dated (2018 design)
- Increases cognitive load

**Alternatives**:
- Flat cards with borders
- Selective shadow usage
- Background color differentiation
- Single-level shadow system

---

### AP-2.3: Pill Buttons

**What it looks like**:
- `rounded-full` on all buttons
- Always pill-shaped CTAs
- Soft, friendly feel everywhere

**Why it's bad**:
- Overused pattern
- Can feel unprofessional
- Doesn't fit all brands
- Reduces urgency

**Alternatives**:
- Sharp rectangle buttons
- Subtle radius (4-8px)
- Mixed: sharp primary, pill secondary
- Context-appropriate shapes

---

## CATEGORY 3: COLOR ANTI-PATTERNS

### AP-3.1: Pastel Gradient Backgrounds

**What it looks like**:
```css
background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
/* or */
background: linear-gradient(to right, #ffecd2, #fcb69f);
```

**Why it's bad**:
- Extremely common AI output
- Feels dated quickly
- Softens brand impact
- Generic "startup" vibe

**Alternatives**:
- Solid color backgrounds
- High-contrast gradients
- Dark gradients with accent
- Texture/pattern backgrounds
- Color block sections

---

### AP-3.2: Safe Color Palettes

**What it looks like**:
- Lots of grays and whites
- Muted accent colors
- Low contrast overall
- "Clean" but boring

**Why it's bad**:
- No visual impact
- Forgettable appearance
- No brand distinction
- Lacks confidence

**Alternatives**:
- Bold color choices
- High-contrast combinations
- Intentional color usage
- Brand-specific palettes

---

### AP-3.3: Purple-to-Pink Gradients

**What it looks like**:
```css
/* The AI favorite */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
background: linear-gradient(to right, #6366f1, #a855f7);
```

**Why it's bad**:
- Most overused gradient ever
- Instantly screams "AI"
- Zero brand uniqueness
- Tired and cliché

**Alternatives**:
- Brand-specific gradients
- Single-color emphasis
- No gradients (often better)
- Subtle, contextual use

---

## CATEGORY 4: TYPOGRAPHY ANTI-PATTERNS

### AP-4.1: Inter Font Default

**What it looks like**:
```css
font-family: 'Inter', sans-serif;
/* Used without consideration */
```

**Why it's bad**:
- Default developer font
- Used everywhere in tech
- No brand distinction
- Feels unconsidered

**Alternatives**:
- Brand-specific font selection
- Intentional typeface matching
- Alternative sans-serifs
- Mixed font families

---

### AP-4.2: Weak Typography Hierarchy

**What it looks like**:
- Similar sizes throughout
- Minimal contrast
- Safe weight usage
- Generic heading structure

**Why it's bad**:
- No clear hierarchy
- Hard to scan
- Boring visually
- Lacks impact

**Alternatives**:
- Bold size contrasts
- Dramatic scale differences
- Weight variation
- Intentional hierarchy

---

### AP-4.3: Generic Copy Patterns

**What it looks like**:
- "Get Started" CTAs
- "Learn More" links
- "Our Features" headings
- "Why Choose Us" sections

**Why it's bad**:
- Feels templated
- No brand voice
- Ignored by users
- Lacks specificity

**Alternatives**:
- Action-specific CTAs
- Brand-voiced headings
- Unique section names
- Specific benefit statements

---

## CATEGORY 5: CONTENT ANTI-PATTERNS

### AP-5.1: Trust Logo Bar

**What it looks like**:
```
┌─────────────────────────────────────────────┐
│      Trusted by the world's best companies   │
│  [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]  │
└─────────────────────────────────────────────┘
```

**Why it's bad**:
- Overused pattern
- Often ignored
- Low credibility
- Template default

**Alternatives**:
- Specific testimonials
- Case study previews
- Quantified social proof
- Contextual trust signals

---

### AP-5.2: Generic Testimonial Cards

**What it looks like**:
- Profile picture + quote
- Name and title below
- All same size
- Horizontal grid

**Why it's bad**:
- Template pattern
- Low engagement
- Ignored section
- No visual interest

**Alternatives**:
- Featured testimonial
- Quote-focused design
- Varied presentation
- Contextual placement

---

### AP-5.3: FAQ Accordion

**What it looks like**:
- Standard accordion pattern
- "+/-" icons
- Generic questions
- Bottom of page placement

**Why it's bad**:
- Cliché pattern
- Low engagement
- Often ignored
- Better ways to answer questions

**Alternatives**:
- Inline answers in content
- Different presentation style
- Proactive question answering
- Visual FAQ format

---

## CATEGORY 6: INTERACTION ANTI-PATTERNS

### AP-6.1: Pointless Animation

**What it looks like**:
- Elements fading in on scroll
- Everything animates
- Long, slow transitions
- Decorative motion

**Why it's bad**:
- Distracting
- Slows perceived performance
- Feels gimmicky
- No functional purpose

**Alternatives**:
- Functional animation only
- Fast, subtle transitions
- State-change motion
- Hierarchy-clarifying motion

---

### AP-6.2: Hover Effects on Everything

**What it looks like**:
- Scale on hover for all cards
- Color change on all interactive
- Shadow increase on hover
- Generic hover states

**Why it's bad**:
- Overwhelming
- Loses significance
- Feels template-y
- Distracting

**Alternatives**:
- Selective hover states
- Meaningful interactions
- Context-appropriate effects
- Refined micro-interactions

---

## THE ANTI-PATTERN CHECKLIST

### Quick Reference Card

Before marking complete, verify NONE of these exist:

```
LAYOUT
□ Centered hero with centered button
□ Three-column feature grid
□ Perfect centering throughout
□ Template section order

SHAPE
□ rounded-2xl/3xl used liberally
□ Pill-shaped buttons everywhere
□ Card shadows on everything
□ Excessive rounding

COLOR
□ Pastel gradient backgrounds
□ Purple-to-pink gradients
□ Safe, muted color palette
□ Generic blue CTA

TYPOGRAPHY
□ Inter font (unless specified)
□ Weak size contrast
□ Generic copy ("Get Started")
□ Same heading style throughout

CONTENT
□ Generic trust logo bar
□ Standard testimonial cards
□ FAQ accordion
□ Placeholder-feeling content

INTERACTION
□ Decorative animations
□ Hover effects everywhere
□ Slow transitions
□ Purposeless motion
```

---

## ANTI-PATTERN REPLACEMENT GUIDE

| Anti-Pattern | Replace With | When |
|--------------|--------------|------|
| Centered hero | Split/asymmetric layout | Most of the time |
| 3-column features | Varied hierarchy | When features aren't equal |
| rounded-2xl everywhere | Specified radius | Always |
| Pill buttons | Sharp/subtle radius | Professional brands |
| Pastel gradients | Bold colors or none | Most of the time |
| Inter font | Specified font | Always |
| "Get Started" | Specific action | Always |
| Logo bar | Testimonials | Better proof |
| FAQ accordion | Inline answers | Most cases |
| Scroll animations | Static or minimal | Default choice |

---

## FOR AI: ANTI-PATTERN ENFORCEMENT

### Detection Protocol

1. **After each component** - Scan against checklist
2. **If any match** - Flag immediately
3. **Document the anti-pattern** - What was detected
4. **Propose alternative** - Specific replacement
5. **Implement fix** - Before moving on

### Detection Output

```
🚨 ANTI-PATTERN DETECTED

Pattern: [Name from list]
Location: [Where in code/design]
Why it's problematic: [Reason]

Suggested replacement:
[Specific alternative]

Implementing fix now.
```

### Prevention Mindset

When building, actively think:
- "Am I using this because it's right or because it's easy?"
- "Would a senior designer approve this?"
- "Does this look like it came from a template?"
- "Is there a more interesting/unique approach?"

---

*Anti-Patterns Version: 1.0*
*Last Updated: [DATE]*
