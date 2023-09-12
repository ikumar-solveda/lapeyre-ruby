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

A language toggle has been introduced to allow the selection of the desired language. The following are the general requirements for localization usage:

- The server-side context locale (specified in `next.config.js` via the `i18n.defaultLocale` property) determines the locale loaded in the store.
- The client-side locale will be derived from this context locale.
- Languages specified in the locales section of `next.config.js` must have generated translations (via `yarn integrate`) and the presence of appropriate JSON files in the locale-specific folder.
- This locale will be used to derive the language ID, i.e., the `langId` parameter that will be sent in API calls.
- If desired, locale detection can be enabled using the `i18n.localeDetection` property.
  - Enabling this has the side effect of adding the locale at the end of the URL basePath.
  - The basePath locale token then activates that locale for the store.
- The locale specified in `next.config.js` must correspond to the language configured in the **Management Center Store Management** tool.
- Language preference priority:
  - User-selected language.
  - If there is a language stored in local storage:
    - If it is different from the context default language and is not contained in the rejected languages, prompt a language confirmation dialog to ask the user to select "yes" or "no."
      - If the user selects "yes," use the context default language and save it to local storage.
      - If the user selects "no," use the language stored in local storage and save the context default language to the local storage rejected languages.
    - Otherwise, use the language stored in local storage.
  - If not, compare the context default language with the `next.config.js` default language:
    - If they are the same, use the `next.config.js` default language.
    - If they are different and the context default language is not contained in the rejected languages, prompt a language confirmation dialog to ask the user to select "yes" or "no."
      - If the user selects "yes," use the context default language and save it to local storage.
      - If the user selects "no," use the `next.config.js` default language and save the context default language to the local storage rejected languages.
- The locale is always added to the end of the URL basePath. If the locale is different from the `next.config.js` default language, it will be ignored if it is the same as the `next.config.js` default language.
