# Architecture

## Overview

The migration separates the public application layer from the existing content and commerce systems.

```text
Browser
  ↓
Next.js App Router
  ├─ SSR / UI
  ├─ route handlers
  ├─ metadata / SEO
  ├─ hierarchy-aware routing
  └─ server-side data access
       ├─ WordPress REST
       └─ WooCommerce REST
```

## Responsibilities

### Next.js

- public rendering and interaction
- route resolution
- metadata and canonical generation
- server-side data access
- controlled cache revalidation

### WordPress

- pages, posts, media, taxonomy
- parent/child content relationships
- editorial content source of truth

### WooCommerce

- products and catalog data
- stock/availability state
- commerce metadata

## Security boundary

Credentials belong to server-side environment variables. Browser components do not receive commerce credentials.

The portfolio repository uses placeholders and does not contain production secrets or private infrastructure identifiers.

## Hierarchy principle

A legacy URL is treated as data with a parent/child relationship. A shared hierarchy model can then drive:

1. route resolution
2. canonical metadata
3. sitemap generation

This reduces divergence between what the application renders and what the SEO layer publishes.

## Migration principle

The goal is not to duplicate the backend. The goal is to modernize the public application while preserving the backend's authoritative content and commerce contracts.
