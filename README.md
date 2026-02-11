# KOVO — Modular Wrought Iron Furniture

**Kovačka radnja Cotrić, Loznica** — premium wrought iron furniture engineered for flat-pack transport, fast assembly, and modular customization.

## What is KOVO?

KOVO is the digital storefront and product platform for the **LINEA collection** — a modern line of modular outdoor furniture where every piece shares the same connection system, design language, and interchangeable parts.

### LINEA Collection (3 Hero SKUs)

| Product | Price (RSD) | Assembly | Key Feature |
|---------|-------------|----------|-------------|
| **LINEA Stolica** | 12,900 | 15 min | Stackable ×6, interchangeable backrest panels |
| **LINEA Sto** | 15,900–19,900 | 10–15 min | Universal base — swap Bistro/Family tabletop |
| **LINEA Klupa 120** | 22,900 | 30 min | Shares backrest panels with chair |

**Sets**: Bistro Set (37,500), Family Set (62,900), Terasa Set (74,900), Salon Set (119,900)

### Modular Platform

- **Connection system**: M8/M10 inox hex bolts + centering pins + slot holes
- **Shared parts**: Backrest panels fit both chair and bench
- **Replaceable wood**: Seats, planks, and tabletops are spare-orderable
- **Single tool**: Allen key included in every package

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Language**: TypeScript
- **Deployment**: Netlify
- **Data**: `src/data/products.ts` and `src/data/modules.ts`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Documentation

All product development, research, and business planning lives in [`docs/`](./docs/):

- **[Documentation Index](./docs/README.md)** — links to all docs
- **[Product Development](./docs/product-development.md)** — LINEA modular system spec, modules, connections
- **[Research References](./docs/research-references.md)** — competitors, benchmarks, connection research
- **[Manufacturing Plan](./docs/manufacturing-plan.md)** — prototype schedule, hardware & packaging BOM
- **[Business Model](./docs/business-model.md)** — B2C/B2B strategy, pricing, spare parts revenue
- **[Original Brainstorm](./docs/original-brainstorm.md)** — complete product development journey

## Project Structure

```
kovo/
├── src/
│   ├── app/              # Next.js pages (App Router)
│   ├── components/       # React components
│   └── data/             # Product & module data (source of truth)
├── docs/                 # Product development documentation
├── public/               # Static assets
└── .windsurf/
    └── skills/           # Frontend design skill
```

## License

Proprietary — Kovačka radnja Cotrić, Loznica.
