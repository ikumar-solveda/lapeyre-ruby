### Custom Marketing cookie content target

Use file `manifestCustom.ts` to specify cookie names with boolean value that will be used for marketing content targeting. To add custom cookie names:

- Add the cookie name to `manifestCustom.ts`
- This will merge with the existing cookies in the `core` folder
- If a cookie name already exists in `core`, the value in `manifestCustom.ts` will override it

  Example:

```ts
export const dataMarketingCookieContentTargetManifestCustom: { [name: string]: boolean } = {
	// add custom cookie name with boolean value here.
	// true = enable this cookie for marketing targeting
	// false = disable this cookie for marketing targeting
	mycookiename: true,
};
```
