# BBKitchen — Next.js Migration (Sanitized Portfolio)

> A sanitized portfolio edition of a production-oriented Next.js migration integrating a WordPress/WooCommerce content system.

## What this project demonstrates

- Next.js App Router and server-side data fetching
- WordPress REST integration for content, media, taxonomy, and hierarchy-aware pages
- WooCommerce REST integration with server-side credentials
- READY / SOLD operational state modeling
- exact SKU lookup and server-side filtering
- cache revalidation after mutations
- pagination-aware READY/SOLD split fetching
- SEO-conscious legacy URL migration
- a clear server-side security boundary between the public app and backend credentials

## Portfolio position

This is **not a production repository**. It is a curated engineering portfolio derived from a real migration project.

The public version focuses on architecture, engineering patterns, trade-offs, and reusable implementation ideas. Production hosts, secrets, internal runbooks, session transcripts, private business notes, and deployment incidents are intentionally excluded.

## Architecture

```text
Browser
   │
   ▼
Next.js App Router
   ├── UI / SSR
   ├── route handlers
   ├── metadata / SEO
   ├── hierarchy-aware routing
   └── server-side integrations
          │
          ├──────────────► WordPress REST
          │
          └──────────────► WooCommerce REST
```

## Core design decisions

### Keep WordPress/WooCommerce as source of truth

Next.js owns the public application experience while the existing content and commerce systems remain authoritative.

### Keep commerce credentials server-side

Backend credentials are read from environment variables and never exposed to browser code.

### Model hierarchy as data

Parent/child page relationships are treated as first-class application data so routing, canonical metadata, and sitemap generation can share the same model instead of relying on unrelated hard-coded routes.

### Make availability operational

READY / SOLD is modeled as an operational state connected to WooCommerce stock behavior instead of as a visual-only frontend label.

## Sanitization policy

Excluded from this portfolio repository:

- secrets, tokens, API keys, passwords, or credentials
- production hostnames and private infrastructure identifiers
- private server filesystem paths
- internal deployment configuration
- session transcripts and forensic progress logs
- AI workflow prompts / internal SOPs
- private customer or business operational data
- production incident history

## Disclaimer

This repository demonstrates engineering patterns from the BBKitchen migration. It should not be interpreted as a mirror of the original production environment.
