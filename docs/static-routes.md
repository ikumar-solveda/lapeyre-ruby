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
