# Directory Structure

## integration

- **data (core|custom)** - All the data fetching and mutation methods exposed for use by the presentation layer.
  - **Content** - Method exports for loading initial data from the REST API methods.
  - **constants**
  - **types**
  - **utils** - Data integration utilities
- **generated** - Data fetching and mutation methods and types generated from the Open API specs in the integration/specs directory.
- **mocks** - Rest mocking files, as used by the mock server at: integration/mock.ts
- **specs** - Open API spec data JSON files.
  - **custom**
  - **query**
  - **transactions**
- **locales (core|custom)** - i18next Formatted JSON Translation Files
  - **(LocaleName)**

## presentation

- **components (core|custom)** - All the React components used for the store. Starting with the root "Page" component, which loads layouts and content items.
  - **blocks** - Smaller components used to build content components.
    - **(BlockComponentName)**
      - **index.tsx** - Primary component export with data usage methods and basic structural assembly of component parts.
      - **parts** - Directory for small components used within the parent content component only.
    - **styles** - Directory for all style override SxProps exports used within the parent component and its associated parts.
  - **content** - Content item components for building out each page. Components would include all content blocks that fit into a layout, such as Header, Footer, Cart, ProductGrid or page composer widgets.
    - **(ContentComponentName)**
      - **index.tsx** - Primary component export with data usage methods and basic structural assembly of component parts.
      - **parts** - Directory for small components used within the parent content component only.
    - **styles** - Directory for all style override SxProps exports used within the parent component and its associated parts.
  - **layouts** - Layouts are page scaffolding components for organizing component items. Standard component slots are header and footer, and other named slots based on a particular template.
- **styles (core|custom)** - MUI Theme definition, including any MUI component variant defined for use within the presentation layer. Theme configuration files are lower case for top level configuration settings within the MUI theme and PascalCase for component style customization files / directories.
  - **(ComponentName)**
    - **index.ts** - Custom component styles and a loader for any variant and additive support being applied to the component.
    - **variants** - Contains custom variant definition files, named in camelCase with matching exports. Variants are mutually exclusive, only one being able to be set on a component through the variant prop.
  - **additives** - SX style groups, exported for use throughout the content components’ sx attributes. Additives can also be used on parsed custom HTML, using the add html attribute, with a comma separated string of additive names.
- **utils (core|custom)** - Presentation utilities

## pages

Core route handlers for pages and api calls. Individual page routes should not be added here. They should be handled in the integration layer.

## public

Files inside public can then be referenced by your code starting from the base URL (/).
