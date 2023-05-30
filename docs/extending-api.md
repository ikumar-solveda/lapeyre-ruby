# Extending Supported APIs

Additional Open API specs must be defined for use in the project by adding a directory under `integration/specs` and include a .config.json file along with any spec JSON files you wish to incorporate in the Open API format.

Example:

- integration
  - specs
    - custom
      - .config.json
      - specs.json

## Configuration

Configuration settings for a API Specs directory includes three settings:

- `public` The path that the front end will call for these endpoints, on the Node server. This must start with "/api/"
- `private` The path that the Node server will call on the host server.
- `envHostKey` The environment variable key that will define the host server address.

`.config.json`

```json
{
	"public": "/api/lookup",
	"private": "/path/to/endpoints",
	"envHostKey": "CUSTOM_HOST"
}
```

## Integrate

All changes and additions to specs files must be processed by the integration builder to generate the methods and types for use within the project. To integrate any changes or additions, run the following command: `yarn integrate`
