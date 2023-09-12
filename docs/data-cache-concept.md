## Server side data cache

Server side cache is defined in following files

1. `integration/data/core/types/Cache.ts`, defines cache interface
2. `integration/data/core/utils/getCache.ts`, the logic part of cache implementation

The cache at server side can be considered in one of two ways:

### Request scope cache

But default and also for backward compatibility, all caches are saved in request scope. Request scope cache doesn't care about user type, whether it is in preview or not, etc. Since it only can last for a request.

### Server memory cache

Memory cache are persisted across different request. (For now, default to 1 min), remove it once we have invalidation mechanism.

To use memory cache, when `set` and `get`, we need to provide a `cacheScope` parameter. CacheScope type is defined in `integration/data/core/types/Cache.ts`. An util function `getServerCacheScope` is available to use if data needs to be saved in server memory cache and it is session sensitive. Otherwise, if the data does not care about session and need to saved in memory cache, we can just use
`const cacheScope = {requestScope: false}; ` and pass it to cache functions.

```ts
const cacheScope = getServerCacheScope(context, user.context);
const params = constructRequestParamsWithPreviewToken({ context });
const value =
	cache.get(key, cacheScope) || fetcher(false)(props.storeId, props.emsName, props.query, params);
cache.set(key, value, cacheScope);
```

### Server side remote cache using Redis

TBA

### Cache invalidation

TBA
