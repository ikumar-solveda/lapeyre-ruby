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

### dotEnv file

Default environment variables can be set in dot environment files. See https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#default-environment-variables for details.
