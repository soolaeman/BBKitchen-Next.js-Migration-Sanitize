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

## 35 — Website

| Item | Current state |
|---|---|
| Repository | [`Front-End-BBKitchen`](https://github.com/soolaeman/Front-End-BBKitchen) — **PUBLIC** |
| Role | Public product / SEO / discovery layer |

```text
MASTER_INVENTORY
      ↓
WooCommerce
      ↓
BBKitchen Website
```

### Objective

**Unique Units → Unique Product Pages → Search Surface → Organic Discovery → Customer Interest → WhatsApp**

## 36 — Public vs Internal Data

| PUBLIC | INTERNAL |
|---|---|
| Product image | Supplier source |
| Description | Supplier price |
| Specification | Middle price |
| Condition | WA price |
| Safe availability | Floor price |
| SEO | Deal price |
| CTA | Margin |
|  | Commercial notes |
|  | Internal operational information |

> **Security boundary:** internal data must not leak through frontend JSON API, HTML, metadata, SEO schema, search index, or public endpoints.

## 37 — Telegram → Customer Workflow

```text
Telegram Source
      ↓
Admin
      ↓
Cross-check
      ↓
Save photo
      ↓
Copy caption
      ↓
Adjust commercial information
      ↓
WhatsApp
      ↓
Customer
```

### Telegram provides

- Photo
- Caption
- Source message
- Availability
- Original source

**MASTER_INVENTORY:** `R = LINK_TELEGRAM` is retained.

## 38 — Customer / Sales

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

### Attribution boundary

**Observable acquisition/events ≠ confirmed commercial outcome**

Website, GA4, and Meta may observe acquisition or events, but do not automatically guarantee:

`WhatsApp conversation → negotiation → final deal → revenue`

## 39 — GA4

```text
Website
  ↓
GA4
```

### Relevant dimensions

- Users
- Sessions
- Traffic source
- Medium
- Campaign
- Landing page
- Page views
- Engagement
- Events
- Conversions

> **Attribution boundary:** `GA4 → WhatsApp click` does not automatically equal **deal, revenue, or margin**.

## 40 — Meta / Meta Pixel / Ads

```text
Meta
  ↓
Ads
  ↓
Pixel / Events
```

### Relevant dimensions

- Impressions
- Reach
- Clicks
- CTR
- Spend
- Campaign
- Ad set
- Creative
- Audience
- Events

> **Attribution boundary:** `Meta → Website → WhatsApp → Deal` is not automatically guaranteed to be linked.

## 41 — SEO

```text
MORE UNIQUE UNITS
      ↓
MORE UNIQUE PRODUCT PAGES
      ↓
MORE SEARCH SURFACE
      ↓
MORE ORGANIC DISCOVERY
```

### Potential analysis

| Area | Signals |
|---|---|
| Search performance | Impressions · Clicks · CTR · Position |
| Queries | Search queries |
| Indexation | Indexed pages · Crawlability |
| Pages | Landing · Product · Category |
| On-page | Metadata · Internal linking · Content quality |

## 42 — Finance

### Desired intelligence

- Revenue
- COGS
- Cost
- Margin
- Ads cost
- Operational cost
- Cash in / cash out
- Receivable / payable
- Profitability

| Status | **NOT YET FULLY VERIFIED** |
|---|---|
| Current integration depth | Incomplete / requires additional source verification |

> Do not assume a complete financial dataset exists in the current system.

## 43 — Customer Data

### Desired structure

```text
Customer
├── ID
├── Name
├── Phone
├── Source
├── Campaign
├── Product Interest
├── Lead
├── Quotation
├── Deal
└── Revenue
```

| Status | **NOT YET CONFIRMED** |
|---|---|
| Connected customer database | Not established as complete |

## 44 — Reporting

```text
RAW DATA
   ↓
ANALYSIS
   ↓
INSIGHT
   ↓
DECISION
```

### Audience

`FOUNDER` · `ADMIN` · `OPERATIONS` · `MARKETING` · `SALES` · `INVESTOR`

## 45 — Control Tower — Future

**Purpose:** `READ` · `ANALYZE` · `ALERT` · `DECIDE` · `REPORT`

```text
EXISTING OPERATIONAL SYSTEM
            ↓
        MASTER DATA
            ↓
      BBK CONTROL TOWER
       ├── READ
       ├── ANALYZE
       ├── ALERT
       ├── DECIDE
       └── REPORT
```

> The Control Tower is an **analytical / decision layer**, not the primary upstream ingestion engine.

## 46 — Future Control Tower Modules

| # | Module |
|---:|---|
| 1 | Overview |
| 2 | Website / GA4 |
| 3 | Marketing / Meta |
| 4 | Product + Warehouse Intelligence |
| 5 | Customer / Sales |
| 6 | Finance |
| 7 | SEO |
| 8 | Reporting |
| 9 | Access Control |

> Scope should remain controlled. Not every business function needs to become a separate dashboard module.

## 47 — Warehouse Intelligence

```text
8 SUPPLIER / WAREHOUSE NETWORK
          ↓
   INVENTORY MOVEMENT
          ↓
   FAST-MOVING UNITS
          ↓
     HOT CATEGORIES
          ↓
 HOT SUPPLIERS / LOCATIONS
          ↓
 FUTURE WAREHOUSE PLANNING
```

### Decision questions

- Barang apa yang paling cepat bergerak?
- Supplier mana yang paling produktif?
- Kategori apa yang hot?
- Warehouse mana yang menghasilkan movement terbaik?
- Barang apa yang terlalu lama?

## 48 — Product Automation Guardrails

### Current states

`PENDING_PHOTOS` · `READY_TO_PUBLISH` · `PUBLISHED` · `ERROR` · `NO_PHOTOS_FOUND` · `SKIP: NO IMAGE`

### Monitor

| Area | Examples |
|---|---|
| Automation health | Job / execution state |
| Data quality | Missing or malformed data |
| Publishing | Publish errors / skipped products |
| Photos | Missing photos |
| AI extraction | Ambiguous price / status |
| Integrations | Failed external calls |

## 49 — AI

### Current verified usage

```text
Apps Script #5
      ↓
OpenAI gpt-4o-mini
      ↓
Price + Status extraction
```

### Google AI Studio

**Role:** Future / additional AI analysis environment

> Google AI Studio is **not** the existing BBK production runtime.

## 50 — Firecrawl

| Item | Current position |
|---|---|
| Role | External web research |
| Potential use | Competitor research · SEO research · Market intelligence · Website analysis · External data extraction |
| Transactional role | **Not established** as the primary BBK data layer |

## 51 — Single Source / Data Layer Model

| Layer | System | Role |
|---|---|---|
| Source of origin | Telegram / Supplier | Original source |
| Ingestion | BBK-Automation | Collect / process |
| Staging | `RAW_INVENTORY` | Ingestion dataset |
| Operational master | `MASTER_INVENTORY` | Product / inventory state |
| Public projection | WooCommerce | Public commerce layer |
| Public website | BBKitchen Website | Product / SEO / discovery |

> `RAW_INVENTORY` ≠ `MASTER_INVENTORY` ≠ WooCommerce ≠ Website

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

## 53 — Data Flow — Sold

```text
UNIT
 ↓
READY
 ↓
SOLD
 ↓
TANGGAL_TERJUAL
 ↓
DURASI_TERJUAL
```

### Derived metrics

- Days to Sell
- Inventory Aging
- Velocity

## 54 — Data Now Confirmed Analyzable

| Domain | Confirmed data |
|---|---|
| **Inventory** | Unit / SKU · Status · Warehouse / location · Source group · Condition · Entry date · Sold date · Days to sell · Availability |
| **Product** | Product · Category · SEO title · Description · Images · Publishing state · WooCommerce Product ID |
| **Pipeline** | Pending photos · Ready to publish · Published · Errors · No photos · Ambiguous status · Price processing state |
| **Source** | Telegram source · Message · Source link · Caption · Photo · Fetch date · Last seen date |

## 55 — Data Requiring Additional Sources

- Customer lifetime value
- Actual WhatsApp conversation
- Final deal price
- Actual margin
- Full quotation history
- Full invoice history
- Complete finance ledger
- Ad → WhatsApp → Deal attribution
- Customer acquisition cost
- Complete investor reporting

> These are **not automatically available** from the current product / inventory pipeline.

## 56 — Data Not to Invent

- ❌ Complete CRM
- ❌ Complete WhatsApp database
- ❌ Complete finance database
- ❌ Complete quotation system
- ❌ Complete invoice system
- ❌ Real-time supplier API
- ❌ Perfect ad attribution
- ❌ Final database architecture
- ❌ HOT / WARM / COLD thresholds
- ❌ Final KPI definitions

## 57 — Critical Data Boundaries

```text
PUBLIC
  ≠
INTERNAL
```

### Internal-only

- Supplier Price
- Middle Price
- WA Price
- Floor Price
- Deal Price
- Margin
- Supplier commercial information

> Internal commercial data remains **admin-controlled** and must not enter public data surfaces.

## 58 — Current Automation Stack

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

### External systems

Telegram · Google Sheets · Google Drive · OpenAI API · WooCommerce / WordPress · BBKitchen Website · GA4 · Meta · WhatsApp

### Research / intelligence

Google AI Studio · Firecrawl

## 59 — Future Dashboard Measurement Model

```text
MEASURE
   ↓
ANALYZE
   ↓
ALERT
   ↓
DECIDE
```

### Example

`37 units entered → 31 normalized → 27 photo-ready → 23 published → 8 sold → median days-to-sell = X`

### Dimensions

Supplier · Warehouse · Category · Condition · Price band · SEO · Traffic · Marketing source

### Decision actions

- Fix missing photos
- Review failed publish
- Prioritize hot supplier
- Increase content on weak category
- Investigate slow-moving units
- Review advertising

## 60 — Final Ground-Truth Position

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

### System boundary

**Operational pipeline:** Supplier → Telegram → Automation → Inventory → WooCommerce → Website

**Analytical layer:** Product / marketing / customer / finance signals → Control Tower

**Decision layer:** Analyze → Alert → Decide → Report

---

## Canonical References

| Area | Repository |
|---|---|
| Sanitized public system context | [BBKitchen-Next.js-Migration-Sanitize](https://github.com/soolaeman/BBKitchen-Next.js-Migration-Sanitize) |
| Active frontend | [Front-End-BBKitchen](https://github.com/soolaeman/Front-End-BBKitchen) |
| AI Growth + Apps Script | [BBK-AI-Growth-Automation](https://github.com/soolaeman/BBK-AI-Growth-Automation) |
| Production automation | `BBK-Automation` — PRIVATE |

**Public portfolio entry point:** [BBKitchen-Next.js-Migration-Sanitize](https://github.com/soolaeman/BBKitchen-Next.js-Migration-Sanitize)
