# E-mail Templates

## Rationale

Content-rendering for displays in notifications as an automated function was previously provided by the JSP-based storefronts. This wasn't feasible with the client-side rendered storefronts. However, since Next.js provides server-side rendering, this is now being provided again.

Recall that prior to this implementation, if content-rendering for notifications, etc. was desired, the commerce-remote-store (CRS) container needs to be stood up and its email templates utilized. This is no longer necessary and with some configuration updates at the transaction-server (TS), the Next.js-based storefronts can now provided that function.

Cookie-based authentication allows user-data to be retrieved and rendered inside any rendered content.

## Endpoints (View-names)

View-names that were used as the rendering endpoints for various content (especially for e-mail templates) are still valid and will be used to render content for e-mail templates. These are outlined below.

## Authentication

As outlined above, the content-rendering request needs to send the authentication in the cookies so that any user-data that needs to be rendered inside the content can be fetched. This user-data can be things like order-details or validation-codes for a user doing a password-reset.

## Implementation

### Next.js app Router

Different from the implementation of the storefront, e-mail templates are implemented using the app-router. The app-router is a newer paradigm and has built-in support for React Server Components (RSC).

Since the e-mail templates/content-rendering function is mutually exclusive of the storefront (but within the same implementation domain), it made sense to implement this "new" function using this newer (app-router) paradigm.

Note that both app-router and page-router implementations can reside within the same server.

### Layout (View-name) Lookup

The entry-point for e-mail templates is [../app/email/\[viewName\]/page.tsx](../app/email/[viewName]/page.tsx).

This entry-point performs the lookup for the view-name specified by the `viewName` parameter (in the app-path). The known view-names are defined in [../integration/data/core/email/views/manifest.ts](../integration/data/core/email/views/manifest.ts).

The `layoutName` attribute specifies the name of the component in the presentation layer that will render the content for the e-mail template that has been identified.

For simplicity, the naming is symmetrical across the layout fetchers and presentation layer templates but they need not be (left as an exercise for customization).

The presentation layer templates are catalogued at [../presentation/components/core/email/templates/manifest.ts](../presentation/components/core/email/templates/manifest.ts). The components perform a relatively straight-forward rendering of content using query-parameters specified when the view-name is invoked from TS.

For simplicity and to abide by some e-mail rendering conventions, all presentation layer templates utilize a simple HTML `table` implementation. Most content renders the header and footer using the `Header` and `Footer` email component blocks, which in turn use e-marketing spots for content. Some content uses localized text, and finally some content displays order-detail data. Cookie-based authentication will ensure that order-details can be fetched as necessary.
