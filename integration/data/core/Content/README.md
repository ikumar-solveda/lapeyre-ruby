### Content Data Handlers

Method exports for loading initial data from the REST API methods.

#### Content Items

Each content item represented within a layout must have a handler file with a name in PascalCase. This file can export the get... and use... methods associated with that content item, returning the data needed to initialize that component.

#### manifest.ts

Any get... export handlers provided by the content item files should be added to the manifest. This allows the getContent method inside the index.ts file to fetch the appropriate data.

#### Utility Getters

For sharing data calls between content item handlers, the get... exports those rely on should be created in files that start with an underscore before the PascalCase name of the unility. Example: `_ESpotDataFromId.ts`
