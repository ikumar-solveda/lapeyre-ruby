# Cookie-Based User Session

## Use Cases

### Targeted Marketing Content / Promotion

For each page request, if there is a cookie saved in the browser from the previous user session or if a guest/registered shopper reloads the page in the browser, we need to be able to pass the cookie to the Commerce server during server-side rendering. This ensures that the user-specific information and targeted marketing content are properly rendered before being served to the browser.

### E-mail and Notification Generation

We need to be able to generate e-mail and notification content for shoppers, such as order information and validation codes. See [E-mail Templates](./email-templates.md).

## Cookie Management

_Next.js server:_

- Pass client cookies along with the requests from the **Next.js** server to the Commerce server, server-side.
- Do not propagate the cookie from the Commerce server response back to the client.

_On the client (browser):_

- Cookie CRUD (Create, Read, Update, Delete) operations should ideally occur on the client and be synchronized during hydration.
- Session invalidation and recovery should also occur on the client.

_Cookies used by Next.js for state management_

- `WC_MarketingTrackingConsent_${storeId}`: the cookie used for tracking shoppers' marketing tracking consent React state management.
- `WC_PrivacyNoticeVersion_${storeId}`: the cookies is used for tracking the acceptance of privacy policy and the privacy policy version.

## Session Error

### Client-side session error

- If there is a session error in a client-side AJAX call, a popup is shown.

  ![session error client side](images/sessionError.svg)

### Server-side session error

- For `getServerSideProps` session errors:

  - During the initial page load request, e.g., requesting the URL `/living-room`, if the browser has a saved expired cookie, the server should send a redirect to `/session-error`.
  - If a navigation triggers a `getServerSideProps` request, e.g., `/_next/data/development/en-US/bedroom.json?path=bedroom`, and a user session error is detected, let the client handle the page load and session error by showing a popup.

- When landed on Session Error page, shopper need to click on "Sign In" button to go to Sign-In page.

## Persistent session (Remember Me)

The persistent session of NextJs store depends solely on service responses and it is not configured by views. The configuration file `Rest/WebContent/WEB-INF/config/com.ibm.commerce.rest/wc-rest-security.xml` in `Rest.war` from transaction server controls what service calls are permitted for partial authenticated shoppers.

### Enable persistent session

Refer to help center [Enabling global persistent sessions](https://help.hcltechsw.com/commerce/9.1.0/admin/tasks/tsepersist_session_dev.html) for details regarding enabling/disabling persistent session in commerce transaction server.

By default, the NextJs store has the `Remember Me` feature enabled. If the commerce transaction server has the global persistent session disabled, the `Remember Me` feature needs to be disabled in the store. To disable `Remember Me`, remove the `Remember Me` checkbox from the following files:

1. `presentation/components/core/content/Login/parts/LoginChangePasswordForm.tsx`
2. `presentation/components/core/content/Login/parts/LoginForm.tsx`
3. `presentation/components/core/content/Register/index.tsx`

### Sample Code with Cookie Passing Logic

Refer to the `getCategoryExtended` function for an example of cookie-passing logic: [../integration/data/core/Content/\_Category.ts](../integration/data/core/Content/_Category.ts)
