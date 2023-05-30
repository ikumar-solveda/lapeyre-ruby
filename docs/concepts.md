# Core Concepts

## Separation of Concerns

The data integration layer and the presentation layer are to have clear boundaries and a well defined method of communication between them. The data layer will expose methods for data retrieval and mutation, which the presentation layer can use. All API integrations, caching and state management will be handled by the data layer.

## Separation of Core and Custom

Core code should be clearly distinguishable from client customizations. Each section of the code base will provide obvious areas for custom code to be added to override or add to the existing code base, without overwriting it. This will provide for easier re-integration of future core development back into a living project that is using it.

## Modularity

The foundation will be small and built around a few structural rules for organization. Everything else will be built on this foundation, following the core principles dictated by it. This will allow development on the project to quickly scale out during production. In the future, custom development for clients as well as new prospective features can also happen at a much more rapid pace.

## “Pit of Success” Development

Due to the number of developers who will be working directly on this project and the ones who will be using and adding additional customizations to it, it is important to ensure that any work produced will guide other developers toward good practices by making bad practices and anti-patterns difficult. Linting rules are put in place to help guide the adherence to these principles and it is every developer's responsibility to keep this concept in mind as they add code to the project.

# Implementation

## Page Route

`pages/[...path].tsx`

Catch-all route page handles all page requests. This calls the getPageProps method passing a page cache map and the page context (including path and other request data). The body of this page simply loads the Page component from inside the `presentation/components/core`, wrapping it with the data provider for any data that is fetched by `getPageProps`.

## Get Page Props

`presentation/utils/core/getPageProps.ts`

Handles calling the data properties that a page needs to render its contents. This function calls anything on the Data Layer for the server-side rendering: Meta, Layout, Content. Since app rendering is done in a single pass on the server, this method should be able to fetch all the data required for a given page before returning it. Server called data methods (starting with `get`) should all return an array of data items with key values, which `getPageProps` will wrap in a way that the page can use it.

## The Data Layer

`integration/data/*.ts`

Methods in the data layer handle the logic and normalization needed for fetching data from the REST APIs and providing the information needed by the presentation layer.

## Page Layout and Content

The presentation layer’s page rendering will utilize a Layout provided by the Data Layer. The layout includes a name, associated with a layout template, and slot arrays of content items. Content items include name, associated with a content component, and an ID. The page will then load in the content from the Content method in the data layer.

### Unified Approach

As far as the presentation layer is concerned, there are only layouts and content components that fill slots in those layouts. All the logic for layout and content is handled by the Data Layer. There will be the ability to set defaults for layouts and content item types within the Data Layer. An example of this could be the Layout request for the login page route could respond back with a set layout and only the Login component set in the first slot.

### Styling

Content elements are to be built up using Material UI (MUI) components. Custom styling of MUI components should be done in the form of overriding global theme styles or in adding new variations to those components within the presentation/styles directory. This will keep the style related code in one spot where it can be easily customized as needed for individual clients.

## Core and Custom

Most of the code for the project is in the integration and presentation directories. A structure is employed throughout those directories where core and custom directories are paired together. Path aliasing is implemented at the project level to have a unified default include structure that will prioritize the custom directories over their corresponding core. This allows customizations to be additions to just the custom directories, leaving the core code intact and easily updatable in an upgrade cycle. Any file that has the same file name as a core file at the same level will automatically be used instead of the core file.
