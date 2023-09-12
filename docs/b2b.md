# B2B vs B2C Flows

## Distinction

For general purpose API execution, there is no standout separation of logic for B2B vs B2C stores. B2B behaviour was effectively achieved by instrumenting all API execution invocations with appropriate contract-id specification. For B2C stores, the contract-id specification is that of the default contract. In B2B storefronts, this selection can be changed through the organization or contract switcher (documented on the knowledge-center).

## Use Cases ("data" and "presentation" Layers)

For exposing B2B function, e.g., organization and contract switcher, there is reliance on the store-type retrieved from initial settings retrieval for the store, i.e., for the `storeType` attribute to be `'BMH'`.

In the "data" layer, this detection can be done with a non-hook function that utilizes the `Settings` interface (which should be initialized prior to usage). This is the `isB2BStore` function located in [isB2BStore.ts](../integration/data/core/utils/isB2BStore.ts).

In the "presentation" layer, this function is accessible through an import from [Settings.ts](../integration/data/core/Settings.ts). It is exported through this file to enable usage in the presentation layer. Recall that `ESLint` configuration discourages direct imports from the "data" layer in the presentation layer for clear separation of duties (except when hooks are involved).

Additionally, for use in components, provision has been made of the `B2B` component that can be used to surround any JSX that should only render in B2B environments. The inverse, i.e., B2C, can be specified by specifying the `is` parameter of the component as `false`. This component is located at [B2B/index.tsx](../presentation/components/core/blocks/B2B/index.tsx).

## Examples

### `B2B` Component

One obvious example of usage of the component is the organization and contract switcher. Refer to [AccountDropMenu.tsx](../presentation/components/core/content/Header/parts/AccountDropMenu.tsx) for more details.

### `isB2BStore` Function

The `B2B` component actually uses the `isB2BStore` function and compares its value to that specified for the input `is` prop.
