# Working with HCL Customer Service Hub

HCL Customer Service Hub (CSR) is a web app used by customer service representatives. The shop-on-behalf-of feature launches the store in an embedded iframe within the web app.

### Interactions between Store and CSR

The CSR app sets user session information into `sessionStorage` and launches the store with URL parameters `shopAsUser` and `storeId` using [iFrame Resizer React](https://github.com/davidjbradshaw/iframe-resizer-react). The communication between CSR and the store uses the `postMessage` API.

The store detects the `shopAsUser` URL parameter, skips any server-side session-related calls to the Commerce server, and switches to token mode (reading from `sessionStorage`) instead of using cookies. It relies on the client to establish the CSR shop-on-behalf-of session.

### Session Error and Order Lock/Unlock Notification

During the shop-on-behalf-of session, the CSR app receives notifications for all session errors instead of handling them in the store. Additionally, lock/unlock cart/order messages are sent from the store to the CSR app to prompt CSR to lock/unlock the cart/order.

### Development Environment Setup

When launched from the CSR app, the store uses the CSR's hostname and port. The proxy defined in the CSR development server will proxy the store requests to the store development server. All necessary proxy rules are defined in the CSR's `setupProxy.js` config. A similar setup can be used for production deployment if necessary.

### Components and Files Related to Customer Service Hub Integration

- `integration/data/core/types/customerService.ts`
- `integration/data/core/utils/customerService.ts`
- `presentation/components/core/content/CustomerService/index.tsx`
- `presentation/utils/core/customerService.ts`
