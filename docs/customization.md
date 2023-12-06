# General Approach

As discussed in [concepts.md](concepts.md), the general idea behind extensibility is to add any customizations under the `custom` folder of any appropriate data or presentation layer entities that need to be customized.

Future updates on this store front will only be made on the contents of `core` directories and should not interfere with any assets deployed in the `custom` folder.

## **Data Layer Extensions**

### Partial Function Override

Consider the implementation of various functions inside [integration/data/core/Content/\_Category.ts](../integration/data/core/Content/_Category.ts). If desired, one of the functions in those files may be adjusted like so:

- Adding a file: `integration/data/custom/Content/_Category.ts`
- Importing all the functions except the one to be adjusted from the `core` asset like so:

```typescript
import {
	DATA_KEY,
	fetcher,
	getCategoryExtended,
	parseChildCategoryId,
	cacheCategories,
	getCategoryFetchPayload,
} from '@/core/data/Content/_Category';
```

- Adding the custom implementation inside the file, e.g., in this case overriding `getCategory`:

```typescript
/**
 * Override implementation of single category fetch
 * @param cache server-side request fetch cache
 * @param id category-id to fetch
 * @returns Promise<CategoryType | undefined>
 */
export const getCategory = async (cache: Cache, id: ID, context: GetServerSidePropsContext) => {
	// custom implementation
};
```

- Exporting all the imported functions and the overridden function from the file again:

```typescript
export {
	DATA_KEY,
	fetcher,
	getCategoryExtended,
	getCategory,
	cacheCategories,
	getCategoryFetchPayload,
	parseChildCategoryId,
};
```

### Partial Hook Override

Consider the implementation of the `useCheckOut` hook and its `submit` function. The `core` hook is located under [integration/data/core/Content/CheckOut.ts](../integration/data/core/Content/CheckOut.ts). To override just its `submit` function and use all its other attributes, an override may be performed like so::

- Adding a file: `integration/data/custom/Content/Checkout.ts`
- Importing all the exports from the core file like so:

```typescript
import {
	getCheckOut,
	ReviewType as _ReviewType,
	useCheckOut as useCheckOutCore,
} from '@/core/data/Content/CheckOut';
```

- Updating the implementation of the `submit` function:

```typescript
const useCheckOut = () => {
	const { submit: _toIgnore, ...coreCheckout } = useCheckOutCore();

	const submit = async (_reviewValues?: _ReviewType) => {
		// custom implementation
	};

	return {
		...coreCheckout,
		submit,
	};
};
```

- Exporting all the imported functions and the overridden function from the file again:

```typescript
export type ReviewType = _ReviewType;
export { getCheckOut, useCheckOut };
```

### Full Hook Override

A full hook override just requires creating a file with the same parent path and name as one from core and re-implementing all attributes of its return value and ensuring any exports from the original are exported from the override.

## **Presentation Layer Extensions**

While it is theoretically possible for partial component overrides to occur, full overrides are more likely to be the extension paradigm. Below we describe a sample scenarios for each type.

### Partial Component Override

Consider an on-prem deployment where an adopter wishes to change the look-and-feel of the quantity widget on the PDP. The steps toward such a customization would be:

- Add a file `presentation/components/custom/content/ProductDetails/parts/Quantity.tsx`
- Add the required changes inside that file
- Rebuild the project
- The `import { ProductDetailsQuantity } from '@/components/content/ProductDetails/parts/Quantity';` import in the core PDP will automatically use the custom implementation of `ProductDetailsQuantity` (the file-name and component export should be aptly named otherwise the compiler will rightly complain)

### Full Component Override

An extension to the previous scenario is where the adopter would like to completely override the look and feel of the PDP. Similarly, such a customization could be accomplished by:

- Adding a file: `presentation/components/custom/content/ProductDetails/index.tsx`
- Adding changes to that file (potentially re-using some components from `core`)
- Rebuilding the project
- Same as before, the `"@/components/*"` alias in `tsconfig.json` will automatically pick up the `custom` directory implementation due to precedence specified in the rule.

## **Localization**

Consider an on-prem deployment where an adopter wishes to refer to "cart" as "bag". The steps toward such a customization would be:

- Add a custom translation to override the OOTB ones:
  - add a file: `integration/locales/custom/en-US/translation.json`
  - add this content to the file:
  ```json
  {
  	"Cart": {
  		"Title": "Shopping Bag"
  	}
  }
  ```
- Run `yarn integrate`

## API Extensions

The [extending-api.md](extending-api.md) document details extension possibilities for new API usage.

## Troubleshooting

#### Type error during Next.js build

No matter partial override or full override, the custom component/function need to be compatible with the original one especially for function signature or component properties. The Next.JS build process with do a type check against all files in the project even if the component/function was not referenced by any component. To have a overridden component/function with incompatible signature/properties will fail the type check.
