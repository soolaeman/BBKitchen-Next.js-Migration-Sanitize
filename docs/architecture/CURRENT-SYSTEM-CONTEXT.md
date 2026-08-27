# BBK — CURRENT SYSTEM CONTEXT SNAPSHOT

> **Status:** Current ground truth  
> **Updated:** 27 August 2026  
> **Purpose:** Sanitized system reference for BBKitchen engineering, migration, automation, and future Control Tower work.

### Quick Navigation

[Repositories](#01--repository-map) · [Architecture](#02--overall-architecture) · [Automation](#03--bbk-automation) · [Inventory](#12--raw_inventory) · [Master](#22--master_inventory) · [WooCommerce](#27--master--woocommerce-mapping) · [Website](#35--website) · [Control Tower](#45--control-tower--future) · [Data Boundaries](#54--critical-data-boundaries) · [Final Position](#57--final-ground-truth-position)

## 01 — Repository Map

> **Public portfolio:** this sanitized repository  
> **Active frontend:** [Front-End-BBKitchen](https://github.com/soolaeman/Front-End-BBKitchen)  
> **AI + Apps Script:** [BBK-AI-Growth-Automation](https://github.com/soolaeman/BBK-AI-Growth-Automation)  
> **Production automation:** `BBK-Automation` — **PRIVATE**

| Repository | Visibility | Role |
|---|:---:|---|
| [**BBKitchen-Next.js-Migration-Sanitize**](https://github.com/soolaeman/BBKitchen-Next.js-Migration-Sanitize) | 🟢 PUBLIC | Canonical sanitized portfolio / engineering reference |
| [**Front-End-BBKitchen**](https://github.com/soolaeman/Front-End-BBKitchen) | 🟢 PUBLIC | Active BBKitchen website / frontend / Next.js migration |
| [**BBK-AI-Growth-Automation**](https://github.com/soolaeman/BBK-AI-Growth-Automation) | 🟢 PUBLIC | AI Growth documentation + Apps Script processing/integration |
| `BBK-Automation` | 🔴 PRIVATE | Production-oriented Python automation runtime |

### Canonical routing

- **Portfolio / sanitized architecture:** [BBKitchen-Next.js-Migration-Sanitize](https://github.com/soolaeman/BBKitchen-Next.js-Migration-Sanitize)
- **Frontend implementation:** [Front-End-BBKitchen](https://github.com/soolaeman/Front-End-BBKitchen)
- **AI + Apps Script layer:** [BBK-AI-Growth-Automation](https://github.com/soolaeman/BBK-AI-Growth-Automation)
- **Private runtime:** `BBK-Automation`

> GitHub does not provide a generic HTTP redirect between repositories. Public references therefore use direct repository links; the private runtime is intentionally not exposed as a public portfolio destination.

### Public / private boundary

**PUBLIC**
- Sanitized architecture
- Engineering patterns
- Migration documentation
- Non-sensitive Apps Script documentation
- Public frontend implementation

**PRIVATE**
- Production automation runtime
- Credentials and tokens
- Telegram sessions
- Private infrastructure identifiers
- Customer / supplier private data
- Internal commercial data
- Production-only configuration

## 02 — Overall Architecture

```text
SUPPLIER SOURCE
↓
TELEGRAM
↓
BBK-AUTOMATION
↓
PYTHON PROCESSING
↓
RAW_INVENTORY
↓
APPS SCRIPT PROCESSING
↓
MASTER_INVENTORY
↓
PUBLISH PIPELINE
↓
WOOCOMMERCE
↓
BBK WEBSITE
↓
SEO / PRODUCT DISCOVERY
↓
CUSTOMER
↓
WHATSAPP
↓
LEAD / QUOTATION / DEAL
```

Separate analytical sources:
```text
GA4 / META / SEARCH & SEO DATA / FINANCE / CUSTOMER & SALES DATA
↓
FUTURE CONTROL TOWER
```

## 03 — BBK-AUTOMATION

Repository: `soolaeman/BBK-Automation` — PRIVATE

Primary runtime:
```text
GitHub Actions
  ↓
run_cloud.py
  ↓
telethon_fetch.py
  ↓
telegram_parser_to_gsheet.py
```

Photo upload: upload_to_drive.py

## 04 — GitHub Actions

| Setting | Value |
|---|---|
| Workflow | `.github/workflows/run-bbk.yml` |
| Schedule | `0 */3 * * *` |
| Frequency | **Every 3 hours** |
| Manual execution | `workflow_dispatch` |
| Parameters | `--date` · `--start` · `--end` |
| Runner | `ubuntu-latest` |
| Python | `3.11` |
| Dependencies | `requirements.txt` |

## 05 — GitHub Secrets / Credentials

| System | Credential |
|---|---|
| Google Sheets | `GSHEETS_CRED_JSON` |
| Telegram | `TELETHON_SESSION_BASE64` |
| Google Drive | `GDRIVE_FOLDER_ID` · `GDRIVE_CLIENT_ID` · `GDRIVE_CLIENT_SECRET` · `GDRIVE_REFRESH_TOKEN` |
| WooCommerce / WordPress | `WOO_CK` · `WOO_CS` |
| OpenAI | `OPENAI_API_KEY` |

> Credentials are stored through environment variables, Script Properties, and GitHub Secrets — never hard-coded into business logic.

## 06 — PYTHON — run_cloud.py

Role: ORCHESTRATOR

Flow:
```text
run_cloud.py
├── telethon_fetch.py
└── telegram_parser_to_gsheet.py
```

Timezone: Asia/Jakarta
Manual execution can override the date range.

## 07 — Python — `telethon_fetch.py`

| Attribute | Current value |
|---|---|
| Role | Telegram ingestion |
| Source | Telegram supplier groups |
| Source codes | `GK` · `BB` · `SM` · `BL` · `ML` · `PY` · `PE` · `WT` · `ON` · `RB` |

### Verification boundary

| Context | Count |
|---|---:|
| Business context | **8 supplier groups** |
| Python source | **10 Telegram source codes** |

> **Do not infer:** `10 = 10 suppliers` or `8 = 8 Telegram groups`. The relationship requires verification.

## 08 — Telegram Data Ingestion

### Captured

- Message ID
- Grouped ID
- Date / timestamp
- Caption / text
- Photo source
- Source group
- Message link

### Output

`exports/{SOURCE}/result.json`

### Current source codes

`GK` · `BB` · `SM` · `BL` · `ML` · `PY` · `PE` · `WT` · `ON` · `RB`

## 09 — Telegram Album / Message Grouping

| Rule | Behavior |
|---|---|
| Time proximity | Messages within ~**15 seconds** → one product/photo group |
| Caption selection | **Longest caption** → primary caption |
| Minimum caption | Under **30 characters** → skip |

## 10 — Deduplication

| Item | Rule |
|---|---|
| Reference dataset | `RAW_INVENTORY` |
| Primary key/reference | `LINK_MESSAGE` |

```text
Telegram message
      ↓
LINK_MESSAGE
      ↓
Already exists?
 ├── YES → skip
 └── NO  → process
```

## 11 — Unit / SKU Generation

| Item | Rule |
|---|---|
| Pattern | `BBK0001` · `BBK0002` · `BBK0003` · ... |
| Generation | **Highest existing BBK number + 1** |

> The upstream Python ingestion layer participates in unit identity creation.

## 12 — PHOTO PROCESSING

```text
JPG
 ↓
resize
 ↓
BBKitchen branding / logo processing
 ↓
WebP
```
Maximum dimension: approximately 1600px

Naming:
BBK####_1.webp
BBK####_2.webp
BBK####_3.webp

Output folder: BBK_WEBP_MASTER

## 13 — `RAW_INVENTORY`

**Role:** Staging / ingestion dataset

| Column | Field |
|:---:|---|
| A | `KODE_UNIT` |
| B | `SOURCE_GROUP` |
| C | `LINK_MESSAGE` |
| D | `CAPTION_RAW` |
| E | `PHOTO_URLS` |
| F | `FETCH_DATE` |
| G | `LAST_SEEN_DATE` |
| H | `LOKASI_GUDANG` |
| I | `STATUS_UNIT` |
| J | `STATUS SCRIPT #1` |
| K | `HARGA` |
| L | `PRICE_ANALYSIS_STATUS` |

## 14 — Warehouse / Location Mapping

| Source | Location |
|---|---|
| `GK` | PAMULANG 2, TANGSEL |
| `BB` | PAMULANG 2, TANGSEL |
| `SM` | PAMULANG 2, TANGSEL |
| `BL` | PAMULANG 2, TANGSEL |
| `ML` | PAMULANG BARAT, TANGSEL |
| `RB` | PAMULANG BARAT, TANGSEL |
| `PY` | SETU, TANGSEL |
| `PE` | SAWANGAN, DEPOK |
| `WT` | KEDAUNG, TANGSEL |
| `ON` | KEDAUNG, TANGSEL |

> Source-code-derived mapping. **Not yet the final supplier master structure.**

## 15 — Google Sheets Write Process

| Setting | Value |
|---|---|
| Batch size | **10 rows** |
| Retry limit | **3 retries** |
| Purpose | Google API quota protection + network failure protection |

## 16 — Google Drive

| Item | Value |
|---|---|
| Script | `upload_to_drive.py` |
| Source | `BBK_WEBP_MASTER` |
| Destination | Google Drive |
| Deduplication | Existing filename → **skip upload** |

## 17 — Apps Script Layer

**Location:** `src/apps-script/`

| # | Script | Role |
|---:|---|---|
| 1 | `normalizeAndBuildMaster.gs` | Normalize / build master |
| 2 | `handleStockStatusChange.gs` | Stock lifecycle |
| 3 | `publishMasterToWooCommerce.gs` | WooCommerce publishing |
| 4 | `syncDrivePhotosToMaster.gs` | Photo synchronization |
| 5 | `extractPriceAndStatus.gs` | Price + status extraction |

## 18 — Apps Script #5 — Price + Status Extraction

| Item | Value |
|---|---|
| File | `extractPriceAndStatus.gs` |
| Source | `RAW_INVENTORY` |
| Model | `gpt-4o-mini` |
| Temperature | `0` |
| Response | JSON |
| Processing limit | **25 AI records / execution** |

```text
Caption
  ↓
Extract price
  ↓
Extract status
```

**Allowed status:** `AVAILABLE` · `SOLD` · `AMBIGUOUS`

**Output:** `I = STATUS` · `K = HARGA` · `L = processing/result state`

## 19 — Price Extraction Rule

### Numbers that are **not automatically prices**

- Dimensions
- Capacity
- Wattage
- Quantity
- Model number
- Serial number
- Telephone number
- Address
- Date / year
- Other unrelated numbers

### Supported human-style formats

`250.000` · `1.200.000` · `2,5 juta` · `750rb` · `1,5 jt`

## 20 — Pricing Boundary

**Confirmed ingestion field:** `HARGA`

```text
SUPPLIER PRICE
      ↓
MIDDLE PRICE
      ↓
WA PRICE
      ↓
FLOOR PRICE
      ↓
DEAL PRICE
```

> **Extracted source price ≠ all internal commercial prices.**

## 21 — Internal Pricing

### Internal / admin-only

- Supplier Price
- Middle Price
- WA Price
- Floor Price
- Deal Price
- Margin
- Internal commercial notes

### Public website

- Product information
- Photo
- Description
- Specification
- Safe availability information
- CTA WhatsApp

> **Boundary:** internal commercial data must be protected at the data/access layer — not merely hidden in the frontend.

## 22 — APPS SCRIPT #1 — NORMALIZATION / MASTER BUILD

File: normalizeAndBuildMaster.gs
```text
RAW_INVENTORY
  ↓
Normalization / transformation
  ↓
MASTER_INVENTORY
```

## 23 — `MASTER_INVENTORY`

**Confirmed worksheet:** `MASTER_INVENTORY`

| Column | Field |
|:---:|---|
| A | `KODE_UNIT / SKU` |
| B | `PRODUCT TITLE` |
| C | `SEO TITLE` |
| D | `CATEGORY SLUG` |
| E | `STATUS_UNIT` |
| F | `PIPELINE / PUBLISH STATUS` |
| G | `LOKASI_UNIT` |
| H | `KONDISI_UNIT` |
| I | `EXCERPT` |
| J | `CONTENT` |
| K | `YOAST KEYWORD` |
| L | `YOAST DESCRIPTION` |
| M | `MAIN IMAGE` |
| N | `PHOTO URLS / GALLERY` |
| O | `TANGGAL_MASUK` |
| P | `TANGGAL_TERJUAL` |
| Q | `DURASI_TERJUAL` |
| R | `LINK_TELEGRAM` |
| S | `PRODUCT ID` |
| T | **NOT YET CONFIRMED** |
| U | `IMAGE ALT` |
| V | `IMAGE TITLE` |
| W | `IMAGE CAPTION` |
| X | `IMAGE DESCRIPTION` |

> Column `T` remains undefined until a source confirms its meaning.

## 24 — MASTER_INVENTORY ROLE

RAW_INVENTORY → MASTER_INVENTORY → operational product/inventory state

Contains unit identity, product data, SEO data, inventory status, location, condition, photos, Telegram source, WooCommerce Product ID, entry date, sold date, and sold duration.

## 25 — APPS SCRIPT #4 — PHOTO SYNC

File: syncDrivePhotosToMaster.gs
Source: RAW_INVENTORY + Google Drive
Target: MASTER_INVENTORY

```text
PENDING_PHOTOS
  ↓
Find photo
  ↓
MAIN IMAGE + GALLERY
  ↓
READY_TO_PUBLISH
```

Confirmed: M = MAIN IMAGE, N = GALLERY / PHOTO URLS
Processing limit: 15 products / execution
No photo: NO_PHOTOS_FOUND

## 26 — APPS SCRIPT #3 — PUBLISH TO WOOCOMMERCE

File: publishMasterToWooCommerce.gs
Source: MASTER_INVENTORY
Processing limit: 5 products / execution
Publish condition: F = READY_TO_PUBLISH
Image requirement: MAIN_IMAGE required
No image: SKIP: NO IMAGE

## 27 — MASTER → WooCommerce Mapping

| MASTER | WooCommerce |
|:---:|---|
| A | `sku` |
| B | `title` |
| C | `seo_title` |
| D | `category_slug` |
| E | `status_unit` |
| G | `lokasi_unit` |
| H | `kondisi_unit` |
| I | `excerpt` |
| J | `content` |
| K | `yoast_keyword` |
| L | `yoast_description` |
| M | `main_image` |
| N | `photo_urls` |
| R | `link_telegram` |
| U | `image_alt` |
| V | `image_title` |
| W | `image_caption` |
| X | `image_description` |

**Endpoint:** `/wp-json/bbk/v1/tambah-produk`

## 28 — WooCommerce Stock State

| MASTER status | WooCommerce |
|---|---|
| `SOLD` | `outofstock` |
| Anything else | `instock` |

### Publish result

- **HTTP 200** → `F = PUBLISHED` → `S = WooCommerce Product ID`
- **Error** → `F = ERROR: ...`

## 29 — Apps Script #2 — Stock Status

| Item | Value |
|---|---|
| File | `handleStockStatusChange.gs` |
| Target | `MASTER_INVENTORY` |
| Search | SKU **or** Product ID |

**Relevant fields:** `E = STATUS_UNIT` · `O = TANGGAL_MASUK` · `P = TANGGAL_TERJUAL` · `Q = DURASI_TERJUAL` · `S = PRODUCT ID`

## 30 — Sold Lifecycle

**When:** `STATUS = SOLD`

| Field | Result |
|---|---|
| E | `SOLD` |
| P | `TANGGAL_TERJUAL` |
| Q | `DURASI_TERJUAL` |

If duration is not provided:

`TANGGAL_TERJUAL - TANGGAL_MASUK` → **Days to Sell**

## 31 — Ready Lifecycle

**When:** `STATUS = READY`

| Field | Result |
|---|---|
| E | `READY` |
| P | empty |
| Q | empty |
| R | `LINK_TELEGRAM` retained |

## 32 — CURRENT PRODUCT STATE MACHINE

```text
TELEGRAM SOURCE
↓
RAW_INVENTORY
↓
PRICE / STATUS PROCESSING
↓
MASTER_INVENTORY
↓
PENDING_PHOTOS
↓
READY_TO_PUBLISH
↓
PUBLISHED
↓
READY / SOLD
```

Error/exception states: AMBIGUOUS / ERROR / NO_PHOTOS_FOUND / SKIP: NO IMAGE

## 33 — Inventory Intelligence

### Confirmed analyzable dimensions

- Unit count
- Unit status
- Warehouse / location
- Source group
- Condition
- Product / category
- Entry date
- Sold date
- Days to sell
- Published state
- Photo readiness
- Pipeline errors

### Potential derived metrics

- Inventory aging
- Average / median days to sell
- Fast-moving units
- Slow-moving units
- Category velocity
- Warehouse velocity
- Supplier / source velocity

## 34 — Supplier / Warehouse Intelligence

```text
SUPPLIER / SOURCE
      ↓
INVENTORY
      ↓
MOVEMENT
      ↓
DAYS TO SELL
```

**Potential classifications:** `HOT` · `WARM` · `COLD`

> Thresholds are **not yet defined**. Do not invent them.

## 35 — WEBSITE

Repository: [soolaeman/Front-End-BBKitchen](https://github.com/soolaeman/Front-End-BBKitchen) — PUBLIC
Role: PUBLIC PRODUCT / SEO / DISCOVERY LAYER

```text
MASTER_INVENTORY
  ↓
WooCommerce
  ↓
BBKitchen Website
```

Objective:
Unique Units → Unique Product Pages → Search Surface → Organic Discovery → Customer Interest → WhatsApp

## 36 — PUBLIC VS INTERNAL DATA

PUBLIC:
Product Image / Description / Specification / Condition / Safe availability information / SEO / CTA

INTERNAL:
Supplier Source / Supplier Price / Middle Price / WA Price / Floor Price / Deal Price / Margin / Commercial Notes / Internal operational information

Internal data must not leak through frontend JSON API, HTML, metadata, SEO schema, search index, or public endpoint.

## 37 — TELEGRAM → CUSTOMER WORKFLOW

Telegram Source → Admin → Cross-check → Save photo → Copy caption → Adjust commercial information → WhatsApp → Customer

Telegram provides photo, caption, source message, availability, and original source.
MASTER_INVENTORY R = LINK_TELEGRAM is retained.

## 38 — CUSTOMER / SALES

```text
Website / Social / Ads / Referral
  ↓
Customer
  ↓
WhatsApp
  ↓
Lead
  ↓
Negotiation
  ↓
Quotation
  ↓
Deal
  ↓
Revenue
```

Website / GA4 / Meta can observe acquisition/events but does not automatically guarantee WhatsApp conversation → negotiation → final deal → revenue.

## 39 — GA4

```text
Website
  ↓
GA4
```

Relevant: Users / Sessions / Traffic Source / Medium / Campaign / Landing Page / Page Views / Engagement / Events / Conversions

GA4 → WhatsApp Click ≠ Deal / Revenue / Margin

## 40 — META / META PIXEL / ADS

```text
Meta
  ↓
Ads
  ↓
Pixel / Events
```

Relevant: Impressions / Reach / Clicks / CTR / Spend / Campaign / Ad Set / Creative / Audience / Events

Meta → Website → WhatsApp → Deal is not automatically guaranteed to be linked.

## 41 — SEO

MORE UNIQUE UNITS → MORE UNIQUE PRODUCT PAGES → MORE SEARCH SURFACE → MORE ORGANIC DISCOVERY

Potential analysis: Impressions / Clicks / CTR / Position / Queries / Indexed Pages / Landing Pages / Product Pages / Category Pages / Metadata / Internal Linking / Crawlability / Content Quality

## 42 — FINANCE

Desired intelligence: Revenue / COGS / Cost / Margin / Ads Cost / Operational Cost / Cash In / Cash Out / Receivable / Payable / Profitability

Integration depth: NOT YET FULLY VERIFIED

## 43 — CUSTOMER DATA

Desired structure:
Customer → ID / Name / Phone / Source / Campaign / Product Interest / Lead / Quotation / Deal / Revenue

Current status: NOT YET CONFIRMED AS A COMPLETE CONNECTED DATABASE

## 44 — REPORTING

```text
RAW DATA
  ↓
ANALYSIS
  ↓
INSIGHT
  ↓
DECISION
```

Audience: FOUNDER / ADMIN / OPERATIONS / MARKETING / SALES / INVESTOR

## 45 — CONTROL TOWER — FUTURE

Purpose: READ / ANALYZE / ALERT / DECIDE / REPORT

EXISTING OPERATIONAL SYSTEM → MASTER DATA → BBK CONTROL TOWER → READ / ANALYZE / ALERT → DECIDE → REPORT

## 46 — FUTURE CONTROL TOWER MODULES

1. Overview
2. Website / GA4
3. Marketing / Meta
4. Product + Warehouse Intelligence
5. Customer / Sales
6. Finance
7. SEO
8. Reporting
9. Access Control

## 47 — WAREHOUSE INTELLIGENCE

8 supplier/warehouse network → inventory movement → fast-moving units → hot categories → hot suppliers/locations → future warehouse planning

Decision questions:
Barang apa yang paling cepat bergerak?
Supplier mana yang paling produktif?
Kategori apa yang hot?
Warehouse mana yang menghasilkan movement terbaik?
Barang apa yang terlalu lama?

## 48 — PRODUCT AUTOMATION GUARDRAILS

Current states:
PENDING_PHOTOS / READY_TO_PUBLISH / PUBLISHED / ERROR / NO_PHOTOS_FOUND / SKIP: NO IMAGE

Monitor:
Automation Health / Data Quality / Publishing Errors / Missing Photos / Ambiguous Prices-Status / Failed Integrations

## 49 — AI

Current verified AI usage:
Apps Script #5 → OpenAI gpt-4o-mini → Price + Status extraction

Google AI Studio: future / additional AI analysis environment.
It is not the existing production runtime.

## 50 — FIRECRAWL

Role: External Web Research
Potential: Competitor research / SEO research / Market intelligence / Website analysis / External data extraction

Not established as the primary BBK transactional data layer.

## 51 — SINGLE SOURCE / DATA LAYER MODEL

SOURCE OF ORIGIN: Telegram / Supplier
↓
INGESTION: BBK-Automation
↓
STAGING: RAW_INVENTORY
↓
OPERATIONAL MASTER: MASTER_INVENTORY
↓
PUBLIC PROJECTION: WooCommerce
↓
PUBLIC WEBSITE: BBKitchen

RAW_INVENTORY ≠ MASTER_INVENTORY ≠ WooCommerce ≠ Website

## 52 — DATA FLOW — CURRENT

```text
SUPPLIER
  ↓
TELEGRAM
  ↓
Telethon
  ↓
exports/result.json
  ↓
Python Parser
  ├── grouping
  ├── deduplication
  ├── BBK code generation
  ├── warehouse mapping
  ├── photo processing
  └── Google Sheets ingestion
  ↓
RAW_INVENTORY
  ↓
Apps Script
  ├── Price / Status extraction
  ├── Normalize / Build Master
  └── Drive Photo Sync
  ↓
MASTER_INVENTORY
  ↓
Publish
  ↓
WooCommerce
  ↓
BBKitchen Website
  ↓
SEO / Customer Discovery
  ↓
WhatsApp
```

## 53 — DATA FLOW — SOLD

UNIT → READY → SOLD → TANGGAL_TERJUAL → DURASI_TERJUAL

Derived: Days to Sell / Inventory Aging / Velocity

## 54 — DATA NOW CONFIRMED ANALYZABLE

Inventory: Unit / SKU / Status / Warehouse-location / Source group / Condition / Entry date / Sold date / Days to sell / Availability

Product: Product / Category / SEO title / Description / Images / Publishing state / WooCommerce Product ID

Pipeline: Pending Photos / Ready to Publish / Published / Errors / No Photos / Ambiguous Status / Price Processing State

Source: Telegram source / Message / Source link / Caption / Photo / Fetch date / Last seen date

## 55 — DATA REQUIRING ADDITIONAL SOURCES

Customer lifetime value
Actual WhatsApp conversation
Final deal price
Actual margin
Full quotation history
Full invoice history
Complete finance ledger
Ad → WhatsApp → Deal attribution
Customer acquisition cost
Complete investor reporting

## 56 — DATA NOT TO INVENT

❌ Complete CRM
❌ Complete WhatsApp database
❌ Complete Finance database
❌ Complete quotation system
❌ Complete invoice system
❌ Real-time supplier API
❌ Perfect ad attribution
❌ Final database architecture
❌ HOT/WARM/COLD thresholds
❌ Final KPI definitions

## 57 — CRITICAL DATA BOUNDARIES

PUBLIC ≠ INTERNAL

Internal: Supplier Price / Middle Price / WA Price / Floor Price / Deal Price / Margin / Supplier commercial information

## 58 — CURRENT AUTOMATION STACK

```text
GitHub
├── GitHub Actions
│   └── Python
│       ├── run_cloud.py
│       ├── telethon_fetch.py
│       ├── telegram_parser_to_gsheet.py
│       └── upload_to_drive.py
│
└── Apps Script
    ├── normalizeAndBuildMaster.gs
    ├── handleStockStatusChange.gs
    ├── publishMasterToWooCommerce.gs
    ├── syncDrivePhotosToMaster.gs
    └── extractPriceAndStatus.gs
```

External systems: Telegram / Google Sheets / Google Drive / OpenAI API / WooCommerce-WordPress / BBKitchen Website / GA4 / Meta / WhatsApp

Research / intelligence: Google AI Studio / Firecrawl

## 59 — FUTURE DASHBOARD MEASUREMENT MODEL

```text
MEASURE
  ↓
ANALYZE
  ↓
ALERT
  ↓
DECIDE
```

Example:
37 units entered → 31 normalized → 27 photo-ready → 23 published → 8 sold → median days-to-sell = X

Dimensions: Supplier / Warehouse / Category / Condition / Price band / SEO / Traffic / Marketing source

Decision layer:
Fix missing photos
Review failed publish
Prioritize hot supplier
Increase content on weak category
Investigate slow-moving units
Review advertising

## 60 — FINAL GROUND-TRUTH POSITION

```text
SOURCE
↓
Supplier / Telegram
↓
BBK-AUTOMATION
↓
Python ingestion
↓
RAW_INVENTORY
↓
Apps Script
↓
MASTER_INVENTORY
├── WooCommerce → BBK WEBSITE → SEO
└── Internal Ops → WhatsApp → Lead / Deal
↓
BUSINESS DATA
↓
CONTROL TOWER
├── ANALYZE
├── ALERT
└── REPORT
↓
DECIDE
```

---

## Canonical References

| Area | Repository |
|---|---|
| Sanitized public system context | [BBKitchen-Next.js-Migration-Sanitize](https://github.com/soolaeman/BBKitchen-Next.js-Migration-Sanitize) |
| Active frontend | [Front-End-BBKitchen](https://github.com/soolaeman/Front-End-BBKitchen) |
| AI Growth + Apps Script | [BBK-AI-Growth-Automation](https://github.com/soolaeman/BBK-AI-Growth-Automation) |
| Production automation | `BBK-Automation` — PRIVATE |

**Public portfolio entry point:** [BBKitchen-Next.js-Migration-Sanitize](https://github.com/soolaeman/BBKitchen-Next.js-Migration-Sanitize)
