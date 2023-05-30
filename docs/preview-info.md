# Show and Hide Preview Information

When the store is launched within **Tooling** UI, i.e., **Management Center** we can show and hide preview information.

## Component Structure

### App Level

1. State: `integration/data/core/state/usePreviewMessageState.ts`, the global state that consumes the messages sent from **Tooling**.
2. Message event register: `presentation/components/core/content/PreviewCommunication`, receives messages and sets them to the PreviewMessage state.

### Widget Level

Frame to highlight with an information button: `presentation/components/core/preview/PreviewWidgetFrame.tsx`. It consumes the widget information and the marketing spot information of the widget. It posts a message to the parent tooling window when the info button is clicked.

#### Preview Widget Frame Styling

The styling of the preview widget frame in `SxProps` format, is saved in the `presentation/components/core/preview/styles` folder. Widgets might be rendered in a different way than the out-of-the-box (OOTB) defined style, e.g., on the mobile view. For the convenience of overwriting styling, we also provide a `widgets` subfolder under `styles`. This folder contains:

- A manifest file exporting `previewWidgetStyleManifest`
- `SxProps` for individual widgets that need mobile-specific styling.

The `mobile` style overwrite has a corresponding `custom` folder.

### Initialization of the Communication

Upon page load, the store sends a postMessage to **Tooling** from the `useLayout` hook.
