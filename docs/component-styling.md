# Component Styling

## Composition

MUI Components are the building blocks for all components (blocks, content, layouts) and their associated part components; with the rare exception of third party components that must be included in the project. Third party components that need styling, should be wrapped in a `styled` (imported from `@mui/material`) method first, then used within the parent component. This allows them to accept the `sx` attribute for passing custom styles, just like an MUI Component. Raw HTML elements should not be used.

## Component Styling

When styling the MUI Components used to build a new component, follow this logic to determine how to add your styling.

1. Get as close as you can to the desired style using the best MUI Component for the job and setting its associated options, including variants if applicable.
2. If additional styling is needed for this MUI Component, is the desired change something that is desired globally for all of this component type either as a base style change or a variant customization?
3. If not, or if additional styling is required for this specific case, styling should be added to the MUI component using the `sx` property, by passing in an `SxProps` object.

## Spacing Between Items

Instead of adding a lot of `SxProps` for margins and padding, handle spacing between items on the parent wherever possible. Most commonly, this should be done using the MUI Stack component and setting a spacing attribute. Another option is to use the MUI Grid component with the spacing attribute. Doing this eliminates the need for a lot of custom styling and also connects the spacing back to the theme directly for better consistency.

## Avoid the Cascade

The cascade of CSS should be avoided within `SxProps` definitions. It introduces complex logical side-effects that are difficult to track down. It also makes refactoring the styling very likely for small structural changes. Instead break up rules for items within the React component structure into their own separate `SxProps` definitions.

## Supporting the SX Prop in Blocks

Blocks should support the `sx` prop, so when they are used their parent component can add to the base styles if needed. Use the `combineSX` utility to combine those props together safely.

example:

```javascript
import { combineSX } from '@/utils/combineSX';
import { numberInputContainerSX } from '@/components/blocks/NumberInput/styles/container';

<TextField sx={combineSX([numberInputContainerSX, sx])} {...props} />;
```
