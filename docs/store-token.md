# Store Resolution and Store Token

In order to show shopper content from the appropriate store, we need to determine the store being browsed. We support four mutually exclusive ways for doing this determination:

- Request `hostname` to store identifier mapping
- `storeId` URL parameter
- `storeIdentifier` URL parameter
- `storeToken` path parameter: specifically, the first path fragment after the `host` and React App `basename`(if it is used) of a URL

## Flow

When a request arrives at the **Next.js** server, in `integration/data/core/Settings.ts`, the following takes place:

1. If an entry in site-level `hostMapping` [storeConfig](store.config.md) is found for the `hostname` read from the request header, use the `storeIdentifier` found from the `hostMapping` config.

   Sample config:

   ```json
   {
   	"0": {
   		"hostMapping": {
   			"rubyb2b.hclcomdev.com": "rubyb2b"
   		}
   	},
   	"1": {
   		"sampleConfig": {
   			"enabled": true
   		}
   	},
   	"default": {
   		"sampleConfig": {
   			"enabled": false
   		}
   	}
   }
   ```

   Otherwise,

2. If there is a `storeId` URL parameter, use `storeId`. Otherwise,
3. If there is a `storeIdentifier` URL parameter, use `storeIdentifier`. Otherwise,
4. Try to resolve the store using the first fragment in the URL path as the `storeToken` to determine store information.
   - E.g., in the URL `https://<host>/emerald/furniture`, `emerald` will be used as the `storeToken`.
   - The resolved `storeToken` will be saved in the `settings` context.
5. If the chosen `storeToken` cannot be resolved into a valid store token, the default `storeIdentifier` hardcoded in `integration/data/core/config/STORE_IDENTIFIER.ts` will be used.

## Determining the URL Identifier for URL Service

To find the URL identifier:

1. Get the last segment in the `path` array (ignoring the other segments in the array).
2. If the element is empty, then treat it as the `home` page. Otherwise,
3. If the element is not empty, treat it as the URL identifier.

If the path contains a resolvable `storeToken` as its first segment, it is removed from the `path` array, and the above three steps are applied to determine the URL identifier.

Once found, this URL identifier is used to call the Query URL service to get page information.

## Constructing Links on Pages

All links in pages are constructed using `integration/data/core/Content/_NextRouter.ts`, which will automatically construct URLs with applicable `storeToken` path and URL parameters.
