## Environment variables

### NODE_INSTANCE_NUMBER

`NODE_INSTANCE_NUMBER` environment variable is used at deployment time to tell Next.js store container how many Node.js instances can be run by using Node.js `cluster` API. `NODE_INSTANCE_NUMBER` is read from environment variable configuration during deployment; if the value is not specified, it is derived from number of CPU unit specified in the helm-chart for Next.js container.

### SEARCH_ORIGIN

`SEARCH_ORIGIN` is the Elastic Search server that Next.js server needs to connect to.

### TRANSACTION_ORIGIN

`TRANSACTION_ORIGIN` is the Transaction server that Next.js server needs to connect to.

### LOG_LEVEL

`LOG_LEVEL` is for used serviceability. The logger in Next.js APP uses [Pino](https://getpino.io/). Available log-levels are `trace`, `debug`, `info`, `warn`, `error`, `fatal`. These levels are described [here](https://getpino.io/#/docs/api?id=loggerlevels-object).

When specified, all messages at current and higher levels are output, e.g., when configured as `info`, all messages specified at levels `info` through `fatal` are displayed. The configured value out of the box is `info`.

### TRACE_DETAILS

This variable identifies which API methods will be logged. Its default is empty, i.e.,

```bash
TRACE_DETAILS=
```

Which implies all functions are logged. Functions can be filtered using a comma-separated spec, e.g.,

```bash
TRACE_DETAILS=findProducts,getV2CategoryResources
```

This spec will display the log messages from findProducts and getV2CategoryResources functions only.

### LOG_CENSOR_STRING

This variable is used as masking string to mask sensitive, e.g., GDPR-related, information from log files. The default value given in the template is `**GDPR COMPLIANT**` and if the value is empty or not set, the default censor string is `****`
The set of values to mask are identified by their keys in `logging/core/redactionKeys.ts` file.
More info here: [https://getpino.io/#/docs/redaction](https://getpino.io/#/docs/redaction)

### STORE_CONFIG_FILE

This variable saves the file path to store configuration file.

### dotEnv file

Default environment variables can be set in dot environment files. See https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#default-environment-variables for details.

### Store configuration file

The store configuration file is a JSON5-formatted file named storeConfig.json5. This file includes store-specific configurations that control and define certain aspects of the storefront UI flow, such as enabling guest shopping.

It is loaded as a Node.js singleton variable and is utilized by both the server-side and client-side.

To update the store configuration file within a Docker container, one of the two methods below can be performed:

1. Set the environment variable `STORE_CONFIG_FILE` to point to the file path within a mounted volume. Files in the mounted volume can be updated much more easily than inside the container.

2. Edit the file directly inside the container.

Both methods require restarting the container to make updates available.
