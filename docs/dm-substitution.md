# DM Substitution Support for E-Marketing Spots

`/integration/data/core/Content/_ESpotDataFromName.ts` and `/integration/data/core/Content/_ESpotDataFromName-Server.ts` both get DM Substitution values via the utility function in file `/integration/data/core/utils/getDMSubstitutions.ts`. This function gets the value data from the manifest at `/integration/data/core/DM_Substitution/manifest.ts`. The values are then added to the query base for the `getESpotParams` call.

## For Developers

Developers can add substitution params to `/integration/data/core/DM_Substitution/manifest.ts` which is used for all the different E-marketing spot content supported out of the box via the "default" key:

```typescript
export const dataDMSubstitutionsManifest: {
	[emsName: ID]: (props: DataDMSubstitutionManifestProps) => DM_SubstitutionProps[];
} = {
	[DM_SUBSTITUTION_DEFAULT_KEY]: getDefaultDMSubstitutions,
	...dataDMSubstitutionManifestCustom,
};
```

In `/integration/data/core/DM_Substitution/default.ts`, a new key value pair can be added to `getDefaultDMSubstitutions`:

```typescript
export const getDefaultDMSubstitutions = ({
	settings,
}: DataDMSubstitutionManifestProps): DM_SubstitutionProps[] => [
	{ name: '[storeName]', value: settings.storeName },
	{ name: '[currencyParam]', value: settings.defaultCurrency },
];
```

## Customization flow

DM Substitution values can be customized for different E-Marketing Spot names using the custom manifest `/integration/data/custom/DM_Substitution/manifestCustom.ts`:

```typescript
export const dataDMSubstitutionManifestCustom: {
	[emsName: ID]: (props: DataDMSubstitutionManifestProps) => DM_SubstitutionProps[];
} = {
	['testEMS']: getCustomDMSubProps,
};
```

A new file can be added `/integration/data/custom/DM_Substitution/testEMS.ts` with the util function `getCustomDMSubProps` and list of key value pairs in the form of `DM_SubstitutionProps`:

```typescript
export const getCustomDMSubProps = ({
	settings,
}: DataDMSubstitutionManifestProps): DM_SubstitutionProps[] => [
	{ name: '[testParam]', value: 'val1' },
	{ name: '[catParam]', value: settings.catalogId },
];
```

The function has access to values like settings from `DataDMSubstitutionManifestProps` just like in the core manifest file.
