# Layout Usage

The **Next.js** store makes use of the page-layouts and widgets provided by the **Management Center Page Composer** tool. The general display of the layouts and widgets closely mimics that of the **React.js** stores (albeit styling and other look and feel might be slightly different).

## Converting pages from previous versions to Page Composer-enabled pages

Previously documented instructions (for the **React.js** stores) are applicable and can be followed. These are documented here: [https://help.hcltechsw.com/commerce/9.1.0/storeseparation/tasks/PgComp_ConvPgtoPgComp.html](https://help.hcltechsw.com/commerce/9.1.0/storeseparation/tasks/PgComp_ConvPgtoPgComp.html)

## Page Layouts and Widgets

The existing Page Composer layouts and widgets (that were previously used for **React.js** stores) are used with the **Next.js** store.

Recall the known set of page-layouts from the **Management Center Page Composer** tool:
![Page Layouts](images/page-layouts.png 'Page Layouts')

More information about layouts is available here: [https://help.hcltechsw.com/commerce/9.1.0/management-center/concepts/cpc_layoutsoverview.html](https://help.hcltechsw.com/commerce/9.1.0/management-center/concepts/cpc_layoutsoverview.html)

These were previously documented for the **React.js** stores here: [https://help.hcltechsw.com/commerce/9.1.0/storeseparation/concepts/cc_PgCompWidgOverview.html](https://help.hcltechsw.com/commerce/9.1.0/storeseparation/concepts/cc_PgCompWidgOverview.html).

In version 9.1.13.0, the `Kit page` and `Bundle page` layouts are not yet supported in **Next.js** store. They will be in future versions.

The widget library is documented in detail here: [https://help.hcltechsw.com/commerce/9.1.0/management-center/concepts/cpc_widgets.html](https://help.hcltechsw.com/commerce/9.1.0/management-center/concepts/cpc_widgets.html)

## General Filesystem Organization

As documented in [content-components.md](content-components.md), a manifest file is used to track any page-layouts created in **Tooling**. The manifest file effectively provides a mapping from the page-layout (by its name) to the React component that implements it.

To start, there must exist an entry for any page-layout that has to be used in the store front in `integration/data/core/containers/manifest.ts` located [here](../integration/data/core/containers/manifest.ts). The entry has to be made inside the `layoutManifest` object.

The key in this object is the name of the layout pascal-cased, e.g., `product-page` would be listed as `ProductPage`. The name refers to the `layout.containerName` attribute from the URL Service response.

The value in this object is a function that returns an object that denotes the layout that will be used, e.g., the implementation for the `getProductPage` function is this:

```typescript
export const getProductPage = (props: IncomingContent): Layout => ({
	name: 'TripleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: getContentItemForSlot(props, 'first'),
		second: getContentItemForSlot(props, 'second'),
		third: getContentItemForSlot(props, 'third'),
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
```

This `manifest.ts` file is used by the `getLayout` function (server-side) or `useLayout` hook (client-side). These can be found in this file: [integration/data/core/Layout.ts](../integration/data/core/Layout.ts).

The hook is referenced from the `Page` component inside [presentation/components/core/Page.tsx](../presentation/components/core/Page.tsx) and used inside the `PageBlock` component inside [presentation/components/core/blocks/Page/index.tsx](../presentation/components/core/blocks/Page/index.tsx). The name assigned to layout in the object returned by the value function is used as a key to lookup the component implementation that will render the layout.

As an example, from the object above, `TripleStack` is used to look for a component implementation inside the `layoutManifest` object located inside [presentation/components/core/layouts/manifest.ts](../presentation/components/core/layouts/manifest.ts). This eventually points to the component implementation inside [presentation/components/core/layouts/TripleStack.tsx](../presentation/components/core/layouts/TripleStack.tsx).

## Widget Lookup

Similar to page-layout manifests in `integration/data/core/Layout.ts`, there is a manifest file for widgets used inside these layouts. This manifest resides inside [presentation/components/core/content/manifest.ts](../presentation/components/core/content/manifest.ts) in the `contentManifest` object.

The keys of this object are the pascal-cased names of the widget (with the `-widget` suffix removed), e.g., `featured-product-recommendation-widget` is pascal-cased to `FeaturedProductRecommendation` and points to the component implementation inside [presentation/components/core/content/FeaturedProductRecommendation/index.tsx](../presentation/components/core/content/FeaturedProductRecommendation/index.tsx)
