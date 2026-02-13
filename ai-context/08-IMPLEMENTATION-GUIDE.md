# IMPLEMENTATION GUIDE

> **How to use this system in your IDE with an AI coder**
> **Practical setup and workflow instructions**

---

## SYSTEM SETUP

### Step 1: Create Your Project Directory Structure

```
your-project/
├── ai-context/
│   ├── 00-MASTER-INSTRUCTIONS.md    ← AI reads first
│   ├── 01-PROJECT-BRIEF.md         ← You fill this out
│   ├── 02-DESIGN-TOKENS.md         ← Define or use template
│   ├── 03-PERSONA-CARDS.md         ← Reference
│   ├── 04-RESEARCH-PROTOCOL.md     ← Reference
│   ├── 05-CRITIQUE-FRAMEWORK.md    ← Reference
│   ├── 06-ANTI-PATTERNS.md         ← Reference
│   ├── 07-QUICK-REFERENCE.md       ← Reference
│   └── research/
│       └── [your research notes]
├── src/
│   └── [your code]
└── ...
```

### Step 2: Fill Out the Project Brief

Before any coding session:

1. Open `01-PROJECT-BRIEF.md`
2. Fill out all required sections
3. Be specific and brutal
4. Save the file

**The more specific you are, the better AI performs.**

---

## STARTING A CODING SESSION

### Initial Prompt Template

When starting a new session with your AI coder, use:

```
I'm working on [project name]. 

Before writing any code, please:
1. Read /ai-context/00-MASTER-INSTRUCTIONS.md
2. Read /ai-context/01-PROJECT-BRIEF.md
3. Read /ai-context/02-DESIGN-TOKENS.md
4. Select appropriate persona from /ai-context/03-PERSONA-CARDS.md
5. Confirm you understand the constraints

Then, wait for my next instruction.
```

### For Specific Components

```
Build [component name] for [project name].

Follow the workflow:
1. Read the brief and tokens
2. Research [specific references or "use pre-analyzed library"]
3. Apply appropriate persona
4. Build with constraints
5. Run critique framework
6. Iterate until professional

Begin when ready.
```

---

## WORKFLOW TRIGGERS

### When to Request Research

```
Before building, research these competitors:
- [site 1]
- [site 2]
- [site 3]

Use /ai-context/04-RESEARCH-PROTOCOL.md
Extract patterns, don't copy visuals.
Report findings before implementing.
```

### When to Run Critique

```
Run critique on [component]:
1. Anti-pattern scan
2. Constraint check  
3. Persona evaluation
4. Competitive comparison

Use /ai-context/05-CRITIQUE-FRAMEWORK.md
Report all issues found.
```

### When Something Looks Generic

```
This looks too generic/AI-generated.

Run these checks:
1. What makes it look template-like?
2. What anti-patterns are present?
3. How can we introduce sharper identity?

Use persona [X] to critique.
Suggest specific improvements.
```

---

## COMMON SCENARIOS

### Scenario: Building a Hero Section

**Prompt**:
```
Build the hero section for [project].

Requirements from brief:
- Brand personality: [X, Y, Z]
- Emotional goal: [X]
- Primary CTA: [X]
- What to avoid: [X]

Constraints:
- Use only tokens from design-tokens.md
- Avoid anti-patterns (no centered hero with centered button)
- Apply [persona] philosophy

Show me your research reasoning before implementing.
```

**What AI should do**:
1. Read brief and tokens
2. Select persona
3. Research reference heroes
4. Propose approach
5. Build
6. Self-critique
7. Iterate

---

### Scenario: Component Refinement

**Prompt**:
```
This component isn't working: [paste code or describe]

Run the critique framework:
1. Check all anti-patterns
2. Verify token compliance
3. Evaluate against persona
4. Compare to references

Report issues and propose fixes.
Do NOT implement yet - get my approval first.
```

**What AI should do**:
1. Analyze component
2. Run all critique levels
3. Document specific issues
4. Propose specific fixes
5. Wait for approval
6. Implement approved changes

---

### Scenario: Creating Design Tokens

**Prompt**:
```
Create design tokens for [project].

Based on brief:
- Brand personality: [X, Y, Z]
- Visual direction: [preferences]
- References: [sites]

Create:
1. Color palette (primary, secondary, neutral, semantic)
2. Typography scale
3. Spacing system
4. Border radius scale
5. Shadow system
6. Motion tokens

Document reasoning for each decision.
```

---

### Scenario: Fixing Generic Output

**Prompt**:
```
The AI output looks generic. Fix it.

Current issues:
- [specific problem 1]
- [specific problem 2]

Apply these corrections:
1. Reduce border radius to [X]
2. Increase contrast by [X]%
3. Tighten spacing by [X]%
4. Add [specific element]
5. Remove [specific element]

Run critique after fixing.
```

---

## PROMPT LIBRARY

### For Starting Projects

```
I'm starting a new [type] project.

Project: [name]
Brief: [location]
Tokens: [location or "need to create"]
Personas: [which ones]

Start by reading the master instructions, then the brief.
Confirm understanding before proceeding.
```

### For Component Work

```
Build [component] using the system.

Brief section: [relevant section]
Tokens to use: [specific tokens]
Persona: [which one]
Anti-patterns to avoid: [specific ones]

Research → Plan → Build → Critique → Iterate
```

### For Refinement

```
Refine this [component] to be more professional.

Current state: [code/description]
Issues I see: [your observations]
What I want: [desired outcome]

Run critique, identify gaps, propose fixes.
```

### For Quality Check

```
Quality check this [component/page].

Run full critique framework:
- Anti-pattern scan
- Token compliance
- Persona alignment
- Competitive comparison

Rate: 1-10 professionalism
List: All issues
Suggest: Specific fixes
```

---

## TROUBLESHOOTING

### Problem: AI Still Outputs Generic Designs

**Causes**:
- Brief not specific enough
- Tokens not defined
- Anti-patterns not emphasized
- Persona not selected

**Solutions**:
```
The output is still too generic. 

Review:
1. Is the brief specific enough? [check]
2. Are tokens defined? [check]
3. Is a persona selected? [check]
4. Are anti-patterns listed? [check]

Re-read /ai-context/00-MASTER-INSTRUCTIONS.md
Then try again with more constraints.
```

---

### Problem: AI Uses Arbitrary Values

**Causes**:
- Tokens not being read
- Token gaps exist

**Solutions**:
```
You used arbitrary values: [list them]

This violates the constraint system.

Options:
1. Use existing token: [suggest token]
2. Create new token: [propose value]
3. Ask me for direction

Do NOT use arbitrary values without approval.
```

---

### Problem: AI Skips Research Phase

**Causes**:
- Not prompted to research
- Excitement to implement

**Solutions**:
```
You skipped the research phase.

Before implementing:
1. Use /ai-context/04-RESEARCH-PROTOCOL.md
2. Research [references]
3. Extract patterns
4. Document findings
5. THEN implement

Stop. Start over with research.
```

---

### Problem: AI Doesn't Self-Critique

**Causes**:
- Not prompted to critique
- Eager to finish

**Solutions**:
```
You marked this complete without critique.

Run /ai-context/05-CRITIQUE-FRAMEWORK.md:
1. Anti-pattern scan
2. Constraint check
3. Persona evaluation
4. Competitive comparison

Report findings. Iterate if needed.
Never skip critique.
```

---

## SESSION WORKFLOW

### At Start of Session

1. Confirm AI reads master instructions
2. Confirm AI reads project brief
3. Confirm AI reads design tokens
4. Confirm AI selects persona
5. Begin work

### During Session

1. Request research before implementation
2. Ask for reasoning on decisions
3. Request critique after each component
4. Demand iteration on issues
5. Approve changes before implementation

### At End of Session

1. Run final quality check
2. Verify all constraints met
3. Confirm no anti-patterns
4. Document decisions made
5. Note areas for future work

---

## EXPECTED AI BEHAVIORS

### Good AI Behavior

- ✅ Reads documents before coding
- ✅ Asks clarifying questions
- ✅ Reports research findings
- ✅ Self-critiques output
- ✅ Proposes alternatives
- ✅ Uses only defined tokens
- ✅ Flags constraint violations
- ✅ Iterates without being asked

### Bad AI Behavior (Stop and Correct)

- ❌ Writes code without reading brief
- ❌ Uses arbitrary values silently
- ❌ Outputs generic template patterns
- ❌ Skips critique phase
- ❌ Marks things complete prematurely
- ❌ Ignores specified constraints
- ❌ Copies instead of extracting patterns
- ❌ Defends instead of iterating

---

## MAINTAINING THE SYSTEM

### Update Project Brief When

- Brand direction changes
- New reference sites found
- Constraints evolve
- Scope changes

### Update Design Tokens When

- Brand colors change
- Typography decisions made
- Spacing philosophy clarified
- New components need new tokens

### Add to Anti-Patterns When

- You notice repeated generic output
- New template patterns emerge
- AI makes same mistake repeatedly

---

## SUCCESS METRICS

You know the system is working when:

1. **AI asks questions** before implementing
2. **Research happens** before code
3. **Critique is routine** after each component
4. **Output doesn't look** like templates
5. **Tokens are used** consistently
6. **Brand personality** is evident
7. **Generic patterns** are absent
8. **Senior designer** would approve

---

*Implementation Guide Version: 1.0*
