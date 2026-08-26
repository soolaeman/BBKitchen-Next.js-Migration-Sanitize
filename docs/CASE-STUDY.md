# Case Study — WordPress/WooCommerce to Next.js

## Problem

A production-oriented WordPress/WooCommerce site needed a modern Next.js application layer while retaining its content model, product catalog, and established URL structure.

## Constraints

- Preserve public URL families.
- Keep WordPress/WooCommerce as source of truth.
- Keep commerce credentials out of the browser.
- Support hierarchical content.
- Keep catalog pagination deterministic as availability changes.

## Approach

1. Introduce a Next.js App Router application.
2. Move backend reads and mutations behind server-side integration helpers.
3. Represent WordPress parent/child relationships explicitly.
4. Use WooCommerce stock state as the availability source.
5. Revalidate relevant application data after mutations.
6. Use a READY/SOLD split-fetch strategy when pagination requires deterministic availability ordering.

## Operational workflow

```text
Sales Helper
    ↓
READY ↔ SOLD
    ↓
WooCommerce stock state
    ↓
Next.js revalidation
    ↓
Updated catalog
```

## Pagination idea

When READY products should appear before SOLD products, a split-fetch strategy can query the relevant groups independently, calculate the page boundary, and fetch only the records required for the requested page. This avoids relying on a large combined result set followed by expensive application-side sorting.

## Lessons

- Migration is about preserving contracts as much as changing frameworks.
- Server-side boundaries are important when a public application talks to commerce APIs.
- URL hierarchy should be modeled once and reused by routing and SEO systems.
- Production claims should be backed by runtime evidence rather than source-code presence alone.
