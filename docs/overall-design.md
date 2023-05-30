# Overview

The goal of this new **Next.js** store front is to transition over from the pure **React.js** based framework created in Emerald/Sapphire to leverage server-side rendering (SSR), which is desirable for SEO (crawl from search vendors: Google, etc.).

Client-side rendering (CSR) (Emerald/Sapphire) requires multiple passes over the same route by any crawlers and subsequent passes might occur on a delayed timeframe (not feasible).

SSR accomplishes this by allowing the pre (server-side) rendered page (HTML and other content) to be indexed in completion in the first pass.

# Design Considerations

The Emerald storefront has decent separation of concerns re: business-logic and presentation. With this store front, this separation has been made more explicit with data fetching and business-logic hooks placed under `integration` and the presentation layer placed under the `presentation` directories respectively.

With extensibility being a key-concern (ease of extension without significant diff/patch or re-merge), each of these two key concepts (data and presentation) have sub-directories called `core` and `custom`. The intent being that `core` will contain OOTB assets that can be updated/overwritten at will and `custom` will contain customized assets. These won't be touched by an upgrade path. The extension paradigm is described below.

Styles being a subset of presentation are located under the `presentation` directory and have their own `core` and `custom` sub-directories. The consumption of styles is done through the material-ui theming paradigm. A given theme from the `custom` directory is preferred and the **Ruby** theme used as the default/fallback.

Individual styles (per component) can be specified under each component implementation and similarly overridden if a similar path exists under the appropriate `custom` directory.

Since this is a **Node.js** project, there are a myriad of ways through which override/extension/overload may be performed and this is sometimes to the detriment of the project. The project relies on `ESLint` and the typescript-config descriptor (`tsconfig.json`) to enforce some basic rules to ensure stability in imports, namely:

- The use of aliases specified in `tsconfig.json` that automatically prefer the `custom` folder over the `core` folder, i.e., customizations over any OOTB function (if present), e.g., consider this alias for "data": `"@/data/*": ["integration/data/custom/*", "integration/data/core/*"]`
- The use of `ESLint` to enforce imports using these aliases and forbidding use of relative imports (see `.eslintrc` for details)

A detailed description of the entire directory structure is outlined in [structure.md](structure.md).

## **API**

The API generation assets (invoked using `yarn integrate`) take care of creating typescript API from Open API specs provided under `integration/specs` directory.

The basic requirement is a directory-name to denote the encapsulated name of the Open API specs being generated and a `.config.json` file to configure endpoints for those generated APIs.

As an example refer to the contents of `integration/specs/query`, which will in turn generate API under `integration/generated/query`.

Additional specs (whether custom or HCL-Commerce specific) need to follow a similar path specification for inclusion by the `yarn integrate` invocation.

## **Translation**

Translations in this store front have been made type-safe (also through the use of some assets invoked by `yarn integrate`). These follow the same directory structure for customization, i.e., `custom` preferred over `core`. Collisions in the JSON specification of the translation files are resolved recursively with anything in the `custom` directory asset overwriting anything from `core`.

## **Static Routes as Translated Identifiers**

Routes not configured through the backend may be customized for localization using a translated JSON approach. The `yarn integrate` asset generates type-safe objects that provide this route information. If such a route exists in the static-route JSON and has been "attached" to a page, the store will load that page. These follow the same customization paradigm described in the **Translation** section above.

## **High-Level Implementation Details**

**Next.js** route specification has to be provided under the `pages` directory and a catch-all specified by `[...path].tsx`.

The file `[...path].tsx` can be considered consists two parts: server-side logic and client-side logic, which have a clear boundary.

- The server-side logic invoked by getServerSideProps only executes server-side
- The logic in the Page functional component runs client-side, i.e., browser, and at the pre-rendering phase of server-side rendering

All HCL Commerce routes are catch-all since the `/urls` (Elastic Search v2) API provides the routes for browse-pages. Static-page routes are looked up using the translated-route specifications provided in the store.

Upon landing onto a page, invocation eventually reaches the `getPageProps` function (server-side) from `getServerSideProps` function, which initiates the process of determining the layout information for the route.

This is done by checking if the route requires protection (authentication), otherwise if it can be retrieved by the `/urls` endpoint or if it corresponds to a static one.

The `dataContainerManifest` object inside `integration\data\core\containers\manifest.ts` points to the container-layout generation function for the specified route. It also takes as input the layout of the container (fetched either from the `/urls` API call or a null-ish object).

Right after this, the `getContent` function is called, which uses the `dataContentManifest` object from `integration\data\core\Content\manifest.ts` to determine if any server-side fetching needs to be performed for any of the nested widgets.

The layout of the container is used to specify where in the page (provided by the mapped function) the various widgets used in those layouts will reside. A utility function `getContentItemForSlot` is used to formalize this widget mapping.

The function converts the widget-names to Pascal Case (for react-convention matching) and stores any other necessary information for that widget in the return value.

The catch-all from earlier eventually uses the `PageBlock` element to load the content of the route. The input to this is the layout information fetched using the `useLayout` hook (or the `getLayout` function that was called from `getPageProps` during SSR).

The known-set of renderable-layouts are specified in `layoutManifest` object in `presentation\components\core\layouts\manifest.ts`.

This process of layout determination is described with some examples in [layout-usage.md](layout-usage.md).

## **Fallback and SWR**

The `getPageProps` function accepts a `Map` object named `cache` and the server context object, it returns an object with a `fallback` property. All the data fetched from transaction server and search server triggered directly or indirectly by `getPageProps` for this particular page request are saved in the `cache`. The `cache` is transformed and saved as `fallback` returned from `getPageProps`.

The `getServerSideProps` function then includes the `fallback` in its returned `props` object. The `props` object with `fallback` is passed to `Page` functional component by **Next.js**. The SWR config takes `fallback` as initial state of SWR for initial construction of the page.

In the current implementation, we eliminate the usage of global state and **Redux** and instead rely heavily on the mechanism provided by **SWR**. See figure below with **Redux** flow described on the left and **SWR** flow on the right.

![Redux vs SWR](images/swr.svg 'Redux vs SWR')

More about SWR, https://swr.vercel.app/docs/advanced/understanding

## **Sample Threads**

Following are some samples that describe thread-flow of some scenarios (through code and figures)

### Page Resolution

Consider a request to <host>/furniture which is a product-listing-page:

- **Next.js** will trigger an invocation of `getServerSideProps`
- `getServerSideProps` will:
  - invoke: getSettings which will fetch all store-information if a `storeId` query-string parameter is specified, otherwise a default store-identifier will be used whose information will be fetched; the response will be cached
  - invoke: `getPageProps`, which will:
    - invoke: `getLayout` to fetch the layout associated with the route, i.e., `furniture`, which will:
      - invoke: `getPageDataFromId`, which will validate user and store information and then either validate `furniture` as a static-route or call the `/urls` API to fetch the page-layout information of `furniture` the response will be cached
      - invoke: `getNormalizedLayout` which will:
        - assign a default-layout using `defaultContainerLayoutManifest` if one isn't found in the returned response
        - invoke: an appropriate function via the mapping found in `dataContainerManifest`, i.e., for the `furniture` route, it'll be `ProductListingPage`  `getProductListingPage`
      - invoke: `getContent` for each layout slot of the page-layout, which will:
        - invoke: an appropriate function via the mapping found in `dataContentManifest`; if found, the response will be cached
      - return an object containing the cached values indexed by the `fallback` key
- the catch-all route in `[...path].tsx` will be triggered; the `<PageComponent>` element is surrounded by the `<SWRConfig>` context which is provided the `fallback` value thereby ensuring all responses are available when each component is rendered that uses a hook with the same key
- the `<Page>` component is rendered which eventually renders `<PageBlock>`, which will:
  - lookup the page-container using `layout.name`, i.e., for `furniture`, it will be `<Aside>`
  - `<Aside>` will eventually render each of the slots in the layout using the `<LayoutSlot>` component
    - For `furniture`, these will usually be the:
    - `<BreadcrumbTrail>` component
    - `<FacetNavigation>` component
    - `<CatalogEntryList>` component

![Figure 1.](./images/sample-thread-01.png 'Figure 1. Typical page resolution flow using the <host>/furniture SEO URL as an example')

### Error Scenario

Similarly, page resolution to 404 for a missing route occurs as shown in the figure below. The presence of `{ notFound: true }` in the properties returned by `getServerSideProps` function (`getPageProps` function call) marks the page missing.

![Figure 2.](./images/sample-thread-02.png 'Figure 2. Missing route resolution to 404')

### Some Redirection Scenarios

Session error redirects are resolved in somewhat the same fashion (see figure below)

![Figure 3.](./images/sample-thread-03.png 'Figure 3. Session-error resolution')

Protected (authenticated) route resolutions follow a similar path. Route protection is defined in the `dataRouteProtection` object in `integration/data/core/containers/manifest.ts`. See figure below.

![Figure 4.](./images/sample-thread-04.png 'Figure 4. Other route redirection resolution (protected via authentication)')

## **Serviceability**

For server-side execution, the `pino` package can be used to log invocations. `pino` is a low-overhead **Node.js** logger. For enablement specify one or more of the variables listed below inside the `.env.local` file (use the `.env.local.example` file as template)

### LOG_LEVEL

Available log-levels are `trace`, `debug`, `info`, `warn`, `error`, `fatal`. When configured as `info`, all messages displayed at levels `info` through `fatal` are displayed. `trace` displays all and `debug` displays all but `trace`. By default, server-side API client log messages are displayed at level `trace`. To display these, set the variable to `trace` as below:

```bash
LOG_LEVEL=trace
```

### TRACE_DETAILS

This variable identifies which API methods will be logged. Its default is empty, i.e.,

```bash
TRACE_DETAILS=
```

Which implies all functions are logged. Functions can be filtered using a comma-separated spec, e.g.,

```bash
TRACE_DETAILS=findProducts,getV2CategoryResources
```

This spec will display the log messages from findProducts and getV2CategoryResources functions only.

### LOG_CENSOR_STRING

This variable is used as masking string to mask sensitive, e.g., GDPR-related, information from log files. The default value given in the template is `**GDPR COMPLIANT**` and if the value is empty or not set, the default censor string is `****`
The set of values to mask are identified by their keys in `logging/core/redactionKeys.ts` file.
More info here: [https://getpino.io/#/docs/redaction](https://getpino.io/#/docs/redaction)

### Other Information

The default logging configuration is defined in `logging/core/logger.ts`
Currently core fetcher functions haven’t been instrumented with any logging. These will be added over time.
Some GH issues of note: [https://github.com/pinojs/pino/issues/670](https://github.com/pinojs/pino/issues/670)
