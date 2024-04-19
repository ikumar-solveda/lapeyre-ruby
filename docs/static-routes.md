# Static Route Setup

When a route needs to be defined that is not recognized by the backend service, a static route will need to be setup.

## Setup Route Translation

- Add translation in the Routes object in `integration/locales/core/en-US/staticRoutes.json`

```json
{
	"Routes": {
		"Login": {
			"route": "sign-in",
			"title": "Sign In",
			"description": "Store Sign In",
			"keywords": "keyword, keyword"
		}
	}
}
```

- run `yarn integrate`

## Setup Page Layout

### Create Layout

Add a layout getter method to its own file located in integration/data/core/containers.

Example: `integration/data/core/containers/LoginPage.ts`

```javascript
import { Layout } from '@/data/types/Layout';

export const getLoginPage = (): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [{ name: 'Login', id: 'login' }],
		second: [],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
```

### Register Layout

Add the new new layout getter method to the layoutManifest in `integration/data/core/containers/manifest.ts`

```javascript
...
const layoutManifest = {
	...
	LoginPage: getLoginPage,
	...dataContainerManifestCustom,
};
...
```

### Register Route

Add a route to the dataRouteManifest in `integration/data/core/containers/manifest.ts` as well, using the translation route name as the key and the layoutManifest key as the value.

```javascript
export const dataRouteManifest: Record<keyof LocalRoutes, LayoutKeys> = {
	Login: 'LoginPage',
	...dataRouteManifestCustom,
};
```

### Protected Route

Add route protection to the dataRouteProtection in `integration/data/core/containers/manifest.ts`, using the translation route name as the key, and the validate method as the value.

For example:

```javascript
export const dataRouteProtection: Partial<
	Record<
		keyof LocalRoutes,
		(user: Partial<User>, _cart?: Order | boolean, settings?: Settings) => RouteProtection
	>
> = {
	Account: (user) => validateProtectedRoute({ user }, 'login'),
		...dataRouteProtectionCustom,
};
```

This line indicates that the Account route needs to call the validateProtectedRoute function and will receive a RouteProtection object which will allow/disallow access and also specify where to redirect to if route access is allowed/disallowed.

There are more complex examples of validateProtectedRoute (multiple parameters) in the manifest file. You may extend this method through customization or add your own methods.

### FlexFlow Route

If you want to add routes to flex flow, you can add them to dataRouteProtectionFlexFlowMap in `integration/data/core/containers/manifest.ts`, using the transalation route name as the key and the store feature constant as the value.

```javascript
export const dataRouteProtectionFlexFlowMap: Partial<Record<keyof LocalRoutes, string>> = {
	QuickOrder: EMS_STORE_FEATURE.QUICK_ORDER,
	...dataRouteProtectionFlexFlowMapCustom,
};
```

### CDN Cacheable Route

If you want a protected route to NOT be CDN cacheable, you can add it to notCDNCacheableRoute in `integration/data/core/containers/manifest.ts`, using the tranlsation route name as the key and true as the boolean value.

```javascript
export const notCDNCacheableRoute: Partial<Record<keyof LocalRoutes, boolean>> = {
	...mapValues(dataRouteProtection, () => true),
	Cart: true,
	...notCDNCacheableRouteCustom,
};
```
