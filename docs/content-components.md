# Component Manifest

## `manifest.ts`

The manifest.ts is located at the root of the core content directory. It is where content elements are registered so that the application knows about their existence and how to load them.

## `manifestCustom.ts`

Using the same export structure as the core manifest, the custom manifest has the file name manifestCustom.ts and is located solely on the custom side of the directory structure. The object exported by this file is included by the core manifest and appended / merged into it. Having a distinct custom manifest allows the addition of custom content components without mirroring and overriding the core manifest file.

# Component Structure

Each content component should have its own directory within `presentation/components/core/content`, containing at least an index.ts file.

## Component Directory

`presentation/components/core/content/ComponentName`
A content component’s directory must be located in `presentation/components/core/content`.
The component directory should be named in PascalCase, matching the content component name provided by the Layout data methods.

> `.../ComponentName/index.tsx`
>
> The component index file should contain a single named export, with its name matching the name of the component directory. The primary component exported is generally the basic structural assembly of component parts.

---

> `.../ComponentName/ComponentName.stories.tsx`
>
> The component stories file is used to register and display a component with mocked data, for use within Storybook. It should import the main component export from the index.tsx file, using the component path alias: `@/components/content/ComponentName`

---

> `.../ComponentName/ComponentName.test.tsx`
>
> This unit test file should import and render the exported components from the component's stories to test against.

---

> `.../ComponentName/parts`
>
> A content component should be broken up into small understandable parts. These parts, used by a content component, should be added to the content component's parts directory. The parts directory contains all the component files for the parts needed to build up the parent content component.

---

> > `.../ComponentName/parts/PartName.tsx`
> >
> > Each part component file should have a single named export with a naming convention of `[ComponentName][PartName]`

---

> `.../ComponentName/styles`
>
> The styles directory contains all the custom styles applied to the MaterialUI components used throughout the content component and its parts. Styles are in SX format.

---

> > `.../ComponentName/styles/partName.ts`
> >
> > Each style file should have a single named export of the SxProps type, with the naming convention of `[componentName][PartName]SX`

---

> > `.../ComponentName/styles/partName`
> >
> > For parts with multiple custom styles, each style file should be put within a directory with the part name in camelCase.

---

> > > `.../ComponentName/styles/partName/subPart.ts`
> > >
> > > Each style file should have a single named export of the SxProps type, with the naming convention of `[componentName][PartName][SubPart]SX`
