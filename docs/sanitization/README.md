# BBK Sanitization System

Modular sanitization and synchronization framework for the BBKitchen repository ecosystem.

## Source repositories

- `soolaeman/Front-End-BBKitchen` — private production frontend
- `soolaeman/BBK-Automation` — private production automation/runtime
- `soolaeman/BBK-AI-Growth-Automation` — private Apps Script / AI Growth operational layer

## Public repository

- `soolaeman/BBKitchen-Next.js-Migration-Sanitize` — public sanitized architecture and portfolio representation

## Operating model

Each source repository is handled independently:

`AUDIT → SANITIZE/CLEANUP → VERIFY → SYNC`

Cross-repository maintenance:

`CHANGE DETECTION → IMPACT ANALYSIS → AFFECTED REPO SYNC → CONTEXT UPDATE`

## Status rules

- 🔐 LOCKED — changes require an explicit architectural/security decision.
- 🔒 SOURCE-BOUND — update only when the authoritative source changes.
- 🔒 EVIDENCE-BOUND — update only when supported by source evidence.
- 🟡 UNVERIFIED — do not treat as confirmed.
- 🟢 FUTURE DESIGN — may evolve as planning changes.

## Scope

This framework does not copy production repositories wholesale. It selectively maintains public-safe representations while keeping production implementations private.
