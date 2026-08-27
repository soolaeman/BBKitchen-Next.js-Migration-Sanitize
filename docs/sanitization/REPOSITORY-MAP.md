# BBK Repository + Source-of-Truth Map

## Repository boundaries

| Repository | Visibility | Role | Source of truth |
|---|---|---|---|
| `Front-End-BBKitchen` | PRIVATE | Production frontend | Frontend implementation |
| `BBK-Automation` | PRIVATE | Production ingestion/automation | Current Python automation runtime |
| `BBK-AI-Growth-Automation` | PRIVATE | Apps Script + AI Growth operational layer | Active Apps Script processing |
| `BBKitchen-Next.js-Migration-Sanitize` | PUBLIC | Sanitized architecture + portfolio | Public-safe projection only |

## Legacy boundary

Python ingestion previously present in `BBK-AI-Growth-Automation` is legacy when superseded by `BBK-Automation`. It must not be treated as the current ingestion source of truth.

## Public boundary

Production repositories remain private. The public repository may contain only sanitized architecture, genericized examples, mock data, and public-safe documentation.

## Update rule

A source repository change does not automatically justify copying implementation into this repository. Detect the change, determine its public impact, sanitize where required, verify, then update only the affected public representation.
