### HCL Commerce Version 9.1.14 (September 2023)

- New features:
  - B2B function
    - RubyB2B storefront (sample store)
    - Organization and contract selection
    - Catalog filtering
    - Contract-based pricing
    - Contract-based cart checkout
    - Requisition lists
  - Bundle details page
  - Kit details page
  - SKU list and attribute filter widget implementation (also used with default B2B product details page)
  - Language selection
  - Google tag manager integration
- Various defect fixes

### HCL Commerce Version 9.1.15 (December 2023)

- New features:
  - B2B function
    - Recurring orders
    - Administrative tooling
- Various defect fixes

### HCL Commerce Version 9.1.15.1 (January 2024)

- Added some missing translations
- Better tag support (h1, h2, a) in browse pages to assist with SEO page rankings
- Various defect fixes

### HCL Commerce Version 24.04.25 (April 2024)

- Email templates
- Sitemap generator
- Flexflow enablement
- Guest user shopping enablement for any store type (using FlexFlow)
- GDPR enablement (using FlexFlow)
- Quick order enablement (using FlexFlow)
- Free gift support in cart
- Address validation service enablement (through TS plugin configuration)
- AI/ML product recommendations (through project enablement)

### HCL Commerce Version 24.09.26 (September 2024)

- Updated BOPIS flow
- Save for later on cart page
- Language and currency personalization from user context
- Page layout rendering from search-term associations
- Contract name display on cart page for B2B stores

### HCL Commerce Version 24.12.17 (December 2024)

- Tiered pricing
- ATP inventory handling (backorder and future ordering)
- Request for Quote (RFQ) in B2B
- Coupon wallet and usage
- Primary address selection in address book and usage in cart
- Next.JS upgrade to version 14
- OpenTelemetry enablement
- schema.org meta-data injection (using FlexFlow)

### HCL Commerce Version 25.3.19 (March 2025)

- PWA Support
  - _Note_: Extra migration steps required if applicable
    - `next.config.js` moved to `configs/next.config.js`
    - `next.config.mjs` added in the project root
    - `Dockerfile` updated to explicitly copy the `configs` folder and `next.config.mjs` files.
- In-Progress Orders / Saved Carts
- Add to Quote Support in PDP Pages
- Video Display Support in PDP Pages (including YouTube and Vimeo)
- OpenGraph Meta-Data Injection (using FlexFlow)
