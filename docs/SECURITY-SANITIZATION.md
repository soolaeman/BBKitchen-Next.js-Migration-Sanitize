# Security & Sanitization Notes

This repository is intentionally sanitized for portfolio publication.

## Generalized or removed

- production hostnames and infrastructure identifiers
- API credentials, tokens, and secrets
- private filesystem paths
- private deployment configuration
- internal migration/session logs
- internal AI prompts and SOPs
- private business operational notes
- production incident/debug history

## Environment variables

Use `.env.example` as a local template. Never commit real values.

## Public-repository rule

Before adding a file, check for:

```text
API_KEY
SECRET
PASSWORD
TOKEN
BEARER
AUTHORIZATION
consumer_key
consumer_secret
internal hostnames
private paths
```

Replace production-specific values with generic examples when they are useful to demonstrate the pattern.
