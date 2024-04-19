# Adding Custom Email Templates

Adding a new email template requires identifying the view that has been added in transaction-server and creating the associated layouts and presentation layer components for it.

## Layout

Layouts for email templates provided out of the box require:

- Adding a layout fetcher function in the `layoutManifest` object in [integration/data/core/email/views/manifest.ts](../integration/data/core/email/views/manifest.ts)
  - The key is the name of the view added in transaction-server (any `View` suffixes are discarded, so the name here should exclude that suffix)
  - The value is a function that returns an object with key `layoutName` and a string value that identifies the presentation layer component name. For simplicity this should just be the same as the view nme
- Adding an object under the `EmailTemplate.Meta` translation object (see the `en-US` locale file at [integration/locales/core/en-US/translation.json](../integration/locales/core/en-US/translation.json))
  - The key is the name of the view added in transaction-server
  - The value is an object with two attributes: `Title` and `Description`. These are used for the template's `head` meta-data.

## Presentation Layer

Presentation layer components for email templates are looked up using definitions inside [presentation/components/core/email/templates/manifest.ts](../presentation/components/core/email/templates/manifest.ts)

- The key for the entry must be the value specified in the `layoutManifest` value function entry for the view name
- The value for the entry should be the react-component that will render the email template
- As before, for simplicity, this should just be the view name added in transaction-server

## Example

Consider a view name added in transaction-server called `PromotionDisplayView` (its purpose is unimportant). Since the `View` suffix will be discarded when the request is processed, this view should be referred to as just `PromotionDisplay`.

### Layout

- Create a file under [integration/data/core/email/views](../integration/data/core/email/views) called `PromotionDisplay.ts`
  - The name of the file does not actually matter, but for symmetry and convenience, naming it the same as the view name is helpful.
  - The content of the file should be:

```typescript
export const getPromotionDisplayTemplateLayout = (): Record<'layoutName', string> => ({
	layoutName: 'PromotionDisplay',
});
```

- Create an entry for this layout fetcher inside `layoutManifest` in [integration/data/core/email/views/manifest.ts](../integration/data/core/email/views/manifest.ts), e.g.,

```typescript
...
import { getPromotionDisplayTemplateLayout } from '@/data/email/views/PromotionDisplay';
...
const layoutManifest = {
  ...
  PromotionDisplay: getPromotionDisplayTemplateLayout,
  ...
};
```

- Create an entry for meta-data in translation files, e.g., for the `en-US` locale, update the `EmailTemplate.Meta` object in the file: [integration/locales/core/en-US/translation.json](../integration/locales/core/en-US/translation.json):

```json
...
  "EmailTemplate": {
    ...
    "Meta": {
      ...
      "PromotionDisplay": {
        "Title": "Sample Title",
        "Description": "Sample Description"
      }
      ...
    }
    ...
  }
...
```

### Presentation Layer

- Create the presentation layer component for the view name with the file: `presentation/components/core/email/templates/PromotionDisplay/index.tsx`
- Update the [presentation/components/core/email/templates/manifest.ts](../presentation/components/core/email/templates/manifest.ts) file with an entry for the component:

```typescript
...
import { PromotionDisplay } from '@/components/email/templates/PromotionDisplay';
...
export const contentManifest: Record<string, ComponentType<ServerPageProps>> = {
  ...
  PromotionDisplay,
  ...
}
```
