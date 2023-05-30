# Localization Setup

## Add Translation JSON

Translations JSON files, in the i18next format, should be added to their own locale directory in `integration/(core|custom)`. Languages added to the custom directory will override translations with the same keys found in the core directory files. Translation JSON files within a locale directory can be all in a single file or broken up into multiple files. If a section is in its own JSON file, it still needs to have the section name space set, so that the section can be determined during the generation step.

## Edit next.config.js

Supported languages for the project must be set in the `next.config.js` file, in the i18n object. Set any supported languages in the `locales` array and set the default language in the `defaultLocale` string. Only languages set in the `locales` array will be processed in the integration step and available for use in the project.

## Integrate

The translation files must be processed by the integration builder to generate the code split and type safe files for use within the project. To integrate any changes or additions to the translation JSON files, run the following command: `yarn integrate`

### Warnings

There will be console warnings output during generation for any translation that exists on the `defaultLocale` but is missing in one or more of the supported locales defined in `next.config.js`. Any missing translations will fallback to the translation defined by the `defaultLocale`.

# Using Localization

Import the `useLocalization` hook from `@/data/Localization` at the top of the component file. Within the component function, use the hook, passing a string reference to the section that is needed. If more than one section is needed within a component, the `useLocalization` hook can be used multiple times, with the different sections passed to each one.

## Referencing a Translation

Within the component code, reference the translation name directly within the used section, using standard object notation, then call the t function on that translation to output the appropriate string, passing any named arguments, if needed, to that function.

    	import { useLocalization } from '@/data/Localization';
    	export const Component: FC = () => {
    		const StoreLocator = useLocalization('StoreLocator');
    		return (
    			<Paper>
    				{StoreLocator.locateStore.t()}
    			</Paper>
    		);
    	};

### IDE Translation Warning

If a translation being accessed is missing for any of the supported locales, as defined by the `next.config.js`, the translation key will have a strike-through and give a depreciation warning that states the locale(s) that are missing the translation: StoreLocator.~~locateStare~~.t()

# General Locale Selection Algorithm

Until the language toggle to choose the desired language has been introduced, these are the general requirements for localization usage:

- the server-side context locale (specified in `next.config.js` via `i18n.defaultLocale` property) dictates the locale loaded in the store
- the client-side locale will be derived from this context locale
- languages specified in the locales section of `next.config.js` must have generated translations (via `yarn integrate` and presence of appropriate JSON files in the locale-specific folder)
- this locale will be used to derive the language-id, i.e., `langId` parameter that will be sent in API calls
- if desired, locale-detection can be turned-on using the `i18n.localeDetection` property
  - this has the side-effect of adding the locale at the end of the URL basePath
  - the basePath locale token then activates that locale for the store
- `next.config.js` locale needs to correspond to the language configured in the **Management Center Store Management** tool
