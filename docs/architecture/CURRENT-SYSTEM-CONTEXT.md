# BBK — CURRENT SYSTEM CONTEXT SNAPSHOT

> **Status:** Current ground truth  
> **Updated:** 27 August 2026  
> **Purpose:** Sanitized system reference for BBKitchen engineering, migration, automation, and future Control Tower work.

## 1. REPOSITORY MAP

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

## 2. REPOSITORIES

| Repository | Visibility | Role |
|---|---|---|
| soolaeman/BBKitchen-Next.js-Migration-Sanitize | PUBLIC | Sanitized portfolio / canonical public engineering reference |
| soolaeman/Front-End-BBKitchen | PUBLIC | Active BBKitchen website / frontend / Next.js migration |
| soolaeman/BBK-AI-Growth-Automation | PUBLIC | AI Growth documentation + Apps Script processing/integration layer |
| soolaeman/BBK-Automation | PRIVATE | Production-oriented Python automation runtime |

## 5. OVERALL CURRENT ARCHITECTURE

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

Separate analytical sources:
GA4 / META / SEARCH & SEO DATA / FINANCE / CUSTOMER & SALES DATA
↓
FUTURE CONTROL TOWER

## 6. BBK-AUTOMATION

Repository: `soolaeman/BBK-Automation` — PRIVATE

Primary runtime:
GitHub Actions → run_cloud.py → telethon_fetch.py → telegram_parser_to_gsheet.py

Photo upload: upload_to_drive.py

## 7. GITHUB ACTIONS

Workflow: .github/workflows/run-bbk.yml

Schedule: 0 */3 * * *
Meaning: EVERY 3 HOURS
Manual: workflow_dispatch
Parameters: --date --start --end
Runner: ubuntu-latest
Python: 3.11
Dependencies: requirements.txt

## 8. GITHUB SECRETS / CREDENTIALS

Google Sheets: GSHEETS_CRED_JSON
Telegram: TELETHON_SESSION_BASE64
Google Drive: GDRIVE_FOLDER_ID, GDRIVE_CLIENT_ID, GDRIVE_CLIENT_SECRET, GDRIVE_REFRESH_TOKEN
WooCommerce / WordPress: WOO_CK, WOO_CS
OpenAI: OPENAI_API_KEY

Credentials are stored through environment variables, Script Properties, and GitHub Secrets rather than hard-coded business credentials.

## 9. PYTHON — run_cloud.py

Role: ORCHESTRATOR

Flow:
run_cloud.py
├── telethon_fetch.py
└── telegram_parser_to_gsheet.py

Timezone: Asia/Jakarta
Manual execution can override the date range.

## 10. PYTHON — telethon_fetch.py

Role: TELEGRAM INGESTION
Source: Telegram supplier groups

Current source codes:
GK / BB / SM / BL / ML / PY / PE / WT / ON / RB

Discrepancy:
Business context: 8 Supplier Groups
Python source: 10 Telegram source codes

Do not automatically assume 10 = 10 suppliers or 8 = 8 Telegram groups. Relationship requires verification.

## 11. TELEGRAM DATA INGESTION

Captured:
Message ID / Grouped ID / Date / Timestamp / Caption / Photo Source / Group / Message Link

Output: exports/{SOURCE}/result.json

Sources:
GK / BB / SM / BL / ML / PY / PE / WT / ON / RB

## 12. TELEGRAM ALBUM / MESSAGE GROUPING

Messages within approximately 15 seconds are treated as one product/photo group.
Caption selection: longest caption → primary caption.
Caption under 30 characters → skip.

## 13. DEDUPLICATION

Reference: RAW_INVENTORY
Primary reference: LINK_MESSAGE

Telegram message → LINK_MESSAGE → already exists? → YES: skip / NO: process

## 14. UNIT / SKU GENERATION

Pattern: BBK0001, BBK0002, BBK0003, ...
Generation: highest existing BBK number + 1.

## 15. PHOTO PROCESSING

JPG → resize → BBKitchen branding/logo processing → WebP
Maximum dimension: approximately 1600px

Naming:
BBK####_1.webp
BBK####_2.webp
BBK####_3.webp

Output folder: BBK_WEBP_MASTER

## 16. RAW_INVENTORY

Role: STAGING / INGESTION DATASET

Confirmed fields:
A  KODE_UNIT
B  SOURCE_GROUP
C  LINK_MESSAGE
D  CAPTION_RAW
E  PHOTO_URLS
F  FETCH_DATE
G  LAST_SEEN_DATE
H  LOKASI_GUDANG
I  STATUS_UNIT
J  STATUS SCRIPT #1
K  HARGA
L  PRICE_ANALYSIS_STATUS

## 17. WAREHOUSE / LOCATION MAPPING

GK → PAMULANG 2, TANGSEL
BB → PAMULANG 2, TANGSEL
SM → PAMULANG 2, TANGSEL
BL → PAMULANG 2, TANGSEL
ML → PAMULANG BARAT, TANGSEL
RB → PAMULANG BARAT, TANGSEL
PY → SETU, TANGSEL
PE → SAWANGAN, DEPOK
WT → KEDAUNG, TANGSEL
ON → KEDAUNG, TANGSEL

Source-code-derived mapping. Not yet the final supplier master structure.

## 18. GOOGLE SHEETS WRITE PROCESS

Batch: 10 rows
Retry: maximum 3 retries
Purpose: Google API quota protection and network failure protection.

## 19. GOOGLE DRIVE

Script: upload_to_drive.py
Source: BBK_WEBP_MASTER
Destination: Google Drive
Deduplication: filename already exists → skip upload.

## 20. APPS SCRIPT LAYER

src/apps-script/
1. normalizeAndBuildMaster.gs
2. handleStockStatusChange.gs
3. publishMasterToWooCommerce.gs
4. syncDrivePhotosToMaster.gs
5. extractPriceAndStatus.gs

## 21. APPS SCRIPT #5 — PRICE + STATUS EXTRACTION

File: extractPriceAndStatus.gs
Source: RAW_INVENTORY
AI: OpenAI gpt-4o-mini, temperature 0, JSON response

Caption → extract price → extract status

Allowed status: AVAILABLE / SOLD / AMBIGUOUS
Output: I = STATUS, K = HARGA, L = processing/result state
Processing limit: 25 AI records / execution

## 22. PRICE EXTRACTION RULE

Do not automatically treat dimensions, capacity, wattage, quantity, model number, serial number, telephone number, address, date, year, or other unrelated numbers as price.

Supported formats include:
250.000 / 1.200.000 / 2,5 juta / 750rb / 1,5 jt

## 23. PRICING BOUNDARY

Confirmed ingestion field: HARGA

Commercial pricing model:
SUPPLIER PRICE → MIDDLE PRICE → WA PRICE → FLOOR PRICE → DEAL PRICE

EXTRACTED SOURCE PRICE ≠ ALL INTERNAL COMMERCIAL PRICES

## 24. INTERNAL PRICING

Internal/admin-only:
Supplier Price / Middle Price / WA Price / Floor Price / Deal Price

Public website:
Product information / Photo / Description / Specification / Safe availability information / CTA WhatsApp

Must not expose:
Supplier Price / Middle Price / WA Price / Floor Price / Deal Price / Margin / Internal commercial notes

This is a data/access boundary, not merely frontend hiding.

## 25. APPS SCRIPT #1 — NORMALIZATION / MASTER BUILD

File: normalizeAndBuildMaster.gs
RAW_INVENTORY → normalization / transformation → MASTER_INVENTORY

## 26. MASTER_INVENTORY

Confirmed worksheet: MASTER_INVENTORY

Known columns:
A  KODE_UNIT / SKU
B  PRODUCT TITLE
C  SEO TITLE
D  CATEGORY SLUG
E  STATUS_UNIT
F  PIPELINE / PUBLISH STATUS
G  LOKASI_UNIT
H  KONDISI_UNIT
I  EXCERPT
J  CONTENT
K  YOAST KEYWORD
L  YOAST DESCRIPTION
M  MAIN IMAGE
N  PHOTO URLS / GALLERY
O  TANGGAL_MASUK
P  TANGGAL_TERJUAL
Q  DURASI_TERJUAL
R  LINK_TELEGRAM
S  PRODUCT ID
T  NOT YET CONFIRMED
U  IMAGE ALT
V  IMAGE TITLE
W  IMAGE CAPTION
X  IMAGE DESCRIPTION

T remains undefined until a source confirms its meaning.

## 27. MASTER_INVENTORY ROLE

RAW_INVENTORY → MASTER_INVENTORY → operational product/inventory state

Contains unit identity, product data, SEO data, inventory status, location, condition, photos, Telegram source, WooCommerce Product ID, entry date, sold date, and sold duration.

## 28. APPS SCRIPT #4 — PHOTO SYNC

File: syncDrivePhotosToMaster.gs
Source: RAW_INVENTORY + Google Drive
Target: MASTER_INVENTORY

PENDING_PHOTOS → find photo → MAIN IMAGE + GALLERY → READY_TO_PUBLISH

Confirmed: M = MAIN IMAGE, N = GALLERY / PHOTO URLS
Processing limit: 15 products / execution
No photo: NO_PHOTOS_FOUND

## 29. APPS SCRIPT #3 — PUBLISH TO WOOCOMMERCE

File: publishMasterToWooCommerce.gs
Source: MASTER_INVENTORY
Processing limit: 5 products / execution
Publish condition: F = READY_TO_PUBLISH
Image requirement: MAIN_IMAGE required
No image: SKIP: NO IMAGE

## 30. MASTER → WOOCOMMERCE MAPPING

A → sku
B → title
C → seo_title
D → category_slug
E → status_unit
G → lokasi_unit
H → kondisi_unit
I → excerpt
J → content
K → yoast_keyword
L → yoast_description
M → main_image
N → photo_urls
R → link_telegram
U → image_alt
V → image_title
W → image_caption
X → image_description

Endpoint: /wp-json/bbk/v1/tambah-produk

## 31. WOOCOMMERCE STOCK STATE

MASTER STATUS = SOLD → Woo stock_status = outofstock
MASTER STATUS != SOLD → Woo stock_status = instock

Successful publish: HTTP 200 → F = PUBLISHED → S = WooCommerce Product ID
Error: F = ERROR: ...

## 32. APPS SCRIPT #2 — STOCK STATUS

File: handleStockStatusChange.gs
Target: MASTER_INVENTORY
Search: SKU OR Product ID

Relevant:
E = STATUS_UNIT
O = TANGGAL_MASUK
P = TANGGAL_TERJUAL
Q = DURASI_TERJUAL
S = PRODUCT ID

## 33. SOLD LIFECYCLE

STATUS = SOLD:
E = SOLD
P = TANGGAL_TERJUAL
Q = DURASI_TERJUAL

If duration is not provided: TANGGAL_TERJUAL - TANGGAL_MASUK
Result: DAYS TO SELL

## 34. READY LIFECYCLE

STATUS = READY:
E = READY
P = empty
Q = empty
R = LINK_TELEGRAM retained

## 35. CURRENT PRODUCT STATE MACHINE

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

Error/exception states: AMBIGUOUS / ERROR / NO_PHOTOS_FOUND / SKIP: NO IMAGE

## 36. INVENTORY INTELLIGENCE

Analyzable:
Unit count / Unit status / Warehouse-location / Source group / Condition / Product-category / Entry date / Sold date / Days to sell / Published state / Photo readiness / Pipeline errors

Potential derived metrics:
Inventory aging / Average days to sell / Median days to sell / Fast-moving units / Slow-moving units / Category velocity / Warehouse velocity / Supplier-source velocity

## 37. SUPPLIER / WAREHOUSE INTELLIGENCE

SUPPLIER / SOURCE → INVENTORY → MOVEMENT → DAYS TO SELL

Potential classifications: HOT / WARM / COLD
Thresholds are not yet defined.

## 38. WEBSITE

Repository: [soolaeman/Front-End-BBKitchen](https://github.com/soolaeman/Front-End-BBKitchen) — PUBLIC
Role: PUBLIC PRODUCT / SEO / DISCOVERY LAYER

MASTER → WooCommerce → BBKitchen Website

Objective:
Unique Units → Unique Product Pages → Search Surface → Organic Discovery → Customer Interest → WhatsApp

## 39. PUBLIC VS INTERNAL DATA

PUBLIC:
Product Image / Description / Specification / Condition / Safe availability information / SEO / CTA

INTERNAL:
Supplier Source / Supplier Price / Middle Price / WA Price / Floor Price / Deal Price / Margin / Commercial Notes / Internal operational information

Internal data must not leak through frontend JSON API, HTML, metadata, SEO schema, search index, or public endpoint.

## 40. TELEGRAM → CUSTOMER WORKFLOW

Telegram Source → Admin → Cross-check → Save photo → Copy caption → Adjust commercial information → WhatsApp → Customer

Telegram provides photo, caption, source message, availability, and original source.
MASTER_INVENTORY R = LINK_TELEGRAM is retained.

## 41. CUSTOMER / SALES

Website / Social / Ads / Referral → Customer → WhatsApp → Lead → Negotiation → Quotation → Deal → Revenue

Website / GA4 / Meta can observe acquisition/events but does not automatically guarantee WhatsApp conversation → negotiation → final deal → revenue.

## 42. GA4

Website → GA4

Relevant: Users / Sessions / Traffic Source / Medium / Campaign / Landing Page / Page Views / Engagement / Events / Conversions

GA4 → WhatsApp Click ≠ Deal / Revenue / Margin

## 43. META / META PIXEL / ADS

Meta → Ads → Pixel / Events

Relevant: Impressions / Reach / Clicks / CTR / Spend / Campaign / Ad Set / Creative / Audience / Events

Meta → Website → WhatsApp → Deal is not automatically guaranteed to be linked.

## 44. SEO

MORE UNIQUE UNITS → MORE UNIQUE PRODUCT PAGES → MORE SEARCH SURFACE → MORE ORGANIC DISCOVERY

Potential analysis: Impressions / Clicks / CTR / Position / Queries / Indexed Pages / Landing Pages / Product Pages / Category Pages / Metadata / Internal Linking / Crawlability / Content Quality

## 45. FINANCE

Desired intelligence: Revenue / COGS / Cost / Margin / Ads Cost / Operational Cost / Cash In / Cash Out / Receivable / Payable / Profitability

Integration depth: NOT YET FULLY VERIFIED

## 46. CUSTOMER DATA

Desired structure:
Customer → ID / Name / Phone / Source / Campaign / Product Interest / Lead / Quotation / Deal / Revenue

Current status: NOT YET CONFIRMED AS A COMPLETE CONNECTED DATABASE

## 47. REPORTING

RAW DATA → ANALYSIS → INSIGHT → DECISION

Audience: FOUNDER / ADMIN / OPERATIONS / MARKETING / SALES / INVESTOR

## 48. CONTROL TOWER — FUTURE

Purpose: READ / ANALYZE / ALERT / DECIDE / REPORT

EXISTING OPERATIONAL SYSTEM → MASTER DATA → BBK CONTROL TOWER → READ / ANALYZE / ALERT → DECIDE → REPORT

## 49. FUTURE CONTROL TOWER MODULES

1. Overview
2. Website / GA4
3. Marketing / Meta
4. Product + Warehouse Intelligence
5. Customer / Sales
6. Finance
7. SEO
8. Reporting
9. Access Control

## 50. WAREHOUSE INTELLIGENCE

8 supplier/warehouse network → inventory movement → fast-moving units → hot categories → hot suppliers/locations → future warehouse planning

Decision questions:
Barang apa yang paling cepat bergerak?
Supplier mana yang paling produktif?
Kategori apa yang hot?
Warehouse mana yang menghasilkan movement terbaik?
Barang apa yang terlalu lama?

## 51. PRODUCT AUTOMATION GUARDRAILS

Current states:
PENDING_PHOTOS / READY_TO_PUBLISH / PUBLISHED / ERROR / NO_PHOTOS_FOUND / SKIP: NO IMAGE

Monitor:
Automation Health / Data Quality / Publishing Errors / Missing Photos / Ambiguous Prices-Status / Failed Integrations

## 52. AI

Current verified AI usage:
Apps Script #5 → OpenAI gpt-4o-mini → Price + Status extraction

Google AI Studio: future / additional AI analysis environment.
It is not the existing production runtime.

## 53. FIRECRAWL

Role: External Web Research
Potential: Competitor research / SEO research / Market intelligence / Website analysis / External data extraction

Not established as the primary BBK transactional data layer.

## 54. SINGLE SOURCE / DATA LAYER MODEL

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

## 55. DATA FLOW — CURRENT

SUPPLIER → TELEGRAM → Telethon → exports/result.json → Python Parser
Python Parser: grouping / deduplication / BBK code generation / warehouse mapping / photo processing / Google Sheets ingestion
↓
RAW_INVENTORY
↓
Apps Script: Price / Status extraction / Normalize / Build Master / Drive Photo Sync
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

## 56. DATA FLOW — SOLD

UNIT → READY → SOLD → TANGGAL_TERJUAL → DURASI_TERJUAL

Derived: Days to Sell / Inventory Aging / Velocity

## 57. DATA NOW CONFIRMED ANALYZABLE

Inventory: Unit / SKU / Status / Warehouse-location / Source group / Condition / Entry date / Sold date / Days to sell / Availability

Product: Product / Category / SEO title / Description / Images / Publishing state / WooCommerce Product ID

Pipeline: Pending Photos / Ready to Publish / Published / Errors / No Photos / Ambiguous Status / Price Processing State

Source: Telegram source / Message / Source link / Caption / Photo / Fetch date / Last seen date

## 58. DATA REQUIRING ADDITIONAL SOURCES

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

## 59. DATA NOT TO INVENT

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

## 60. CRITICAL DATA BOUNDARIES

PUBLIC ≠ INTERNAL

Internal: Supplier Price / Middle Price / WA Price / Floor Price / Deal Price / Margin / Supplier commercial information

## 61. CURRENT AUTOMATION STACK

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

External systems: Telegram / Google Sheets / Google Drive / OpenAI API / WooCommerce-WordPress / BBKitchen Website / GA4 / Meta / WhatsApp

Research / intelligence: Google AI Studio / Firecrawl

## 62. FUTURE DASHBOARD MEASUREMENT MODEL

MEASURE → ANALYZE → ALERT → DECIDE

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

## 63. FINAL GROUND-TRUTH POSITION

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

---

## Canonical References

| Area | Repository |
|---|---|
| Sanitized public system context | [BBKitchen-Next.js-Migration-Sanitize](https://github.com/soolaeman/BBKitchen-Next.js-Migration-Sanitize) |
| Active frontend | [Front-End-BBKitchen](https://github.com/soolaeman/Front-End-BBKitchen) |
| AI Growth + Apps Script | [BBK-AI-Growth-Automation](https://github.com/soolaeman/BBK-AI-Growth-Automation) |
| Production automation | `BBK-Automation` — PRIVATE |

**Public portfolio entry point:** [BBKitchen-Next.js-Migration-Sanitize](https://github.com/soolaeman/BBKitchen-Next.js-Migration-Sanitize)
