# CDN Cache Support

According to Google CDN cache documentation, a proper `Cache-Control` header is needed in order to have the content cached in CDN. To address this requirement, we have done the following:

### Cache-Control Header

We add the `Cache-Control` header to the pages that can be cached by CDN. The default value of the header is `'public, max-age=1800, stale-while-revalidate=60'`. This value can be overwritten by setting the environment variable `CACHE_CONTROL_HEADER`.

A utility function `setCacheHeaderIfRequiredForCDN` is introduced to handle this.

When running your application locally with `next dev`, your headers are overwritten by `Next.js` to prevent caching locally.

### User Information in CDN-Cached Pages

We save server-side fetched data into `Next.js` page's `pageProps`, which may include the non-sensitive part of user information. For pages that can be cached by CDN, we use generic user and cart information for SWR `fallback`.

### Determining Pages that can be Cached by CDN

A utility function `canBeCachedByCDN` is introduced to determine whether the page can be cached by CDN or not based on the URL.

Additionally, a manifest constant `notCDNCacheableRoute` is added to file `integration\data\core\containers\manifest.ts` and it is used by `canBeCachedByCDN`
