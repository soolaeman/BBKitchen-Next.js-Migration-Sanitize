# BBKitchen — Next.js Migration (Sanitized Portfolio)

> A sanitized portfolio edition of a production-oriented Next.js migration integrating a WordPress/WooCommerce content system.

## What this project demonstrates

- Next.js App Router and server-side data fetching
- WordPress REST integration for pages, posts, media, taxonomy and hierarchy-aware content
- WooCommerce REST integration with server-side credentials
- READY / SOLD operational state modeling
- exact SKU lookup and server-side filtering
- cache revalidation after mutations
- pagination-aware READY/SOLD split fetching
- SEO-conscious migration of an existing URL hierarchy
- separation between public rendering and backend credentials

## Architecture

```text
Browser
   │
   ▼
Next.js App Router
   ├── public UI / SSR
   ├── route handlers
   ├── SEO + metadata
   ├── hierarchy-aware routing
   └── server-side integrations
          │
          ├──────────────► WordPress REST API
          │
          └──────────────► WooCommerce REST API

Environment variables hold backend endpoints and credentials.
No credentials are committed to this repository.
```

## Portfolio scope

This repository is intentionally **sanitized**. It is not a production deployment and does not contain the original repository's private migration journal, internal SOPs, infrastructure notes, credentials, or operational incident history.

Backend URLs are configured through environment variables rather than hard-coded production infrastructure identifiers.

## Key engineering decisions

### Preserve the content system as source of truth

The migration keeps WordPress/WooCommerce as the authoritative content and commerce layer while Next.js becomes the public application layer.

### Keep credentials server-side

WooCommerce credentials are read from environment variables and used only by server-side integration helpers.

### Treat hierarchy as a first-class concern

Legacy parent/child relationships are modeled as application data rather than flattened into a set of unrelated pages. This supports route resolution, canonical URLs and sitemap generation from the same conceptual hierarchy.

### Make availability operational

READY / SOLD is represented as a business state and synchronized with WooCommerce stock state rather than maintained as an unrelated frontend-only flag.

## Sanitization policy

Excluded from this portfolio repository:

- secrets, tokens and credentials
- private deployment configuration
- internal server paths and infrastructure identifiers
- internal session transcripts and forensic progress logs
- AI workflow prompts / internal SOPs
- private business operational notes
- production incident history

## Disclaimer

This repository is a portfolio representation of engineering patterns from the BBKitchen migration. It is not intended to expose the original production environment or its private operational configuration.

## License

Portfolio source. See the repository owner for usage permissions.
