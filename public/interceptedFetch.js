/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

const storeviewURL = new URL(window.location.href);
const shopAsUser = storeviewURL.searchParams.get('shopAsUser');
if (shopAsUser) {
  window.fetchIntercepted = true;
  const orgFetch = window.fetch;
  window.fetch = (reqUrl, options) => {
    const url = reqUrl.toString();
    if (window.processFetchOptions && (url.startsWith('/api/search/') || url.startsWith('/api/resources/'))) {
      const processed = window.processFetchOptions({ url, options });
      if (processed) {
        const { reqUrl: r, options: o } = processed;
        return orgFetch(r, o);
      } else {
        return orgFetch(reqUrl, options);
      }
    } else {
      return orgFetch(reqUrl, options);
    }
  };
}
