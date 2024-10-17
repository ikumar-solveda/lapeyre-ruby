# Serviceability

For server-side execution, the `pino` package can be used to log invocations. `pino` is a low-overhead **Node.js** logger. For enablement specify one or more of the variables listed below inside the `.env.local` file (use the `.env.local.example` file as template)

## LOG_LEVEL

Available log-levels are `trace`, `debug`, `info`, `warn`, `error`, `fatal`. When configured as `info`, all messages displayed at levels `info` through `fatal` are displayed. `trace` displays all and `debug` displays all but `trace`. By default, server-side API client log messages are displayed at level `trace`. To display these, set the variable to `trace` as below:

```bash
LOG_LEVEL=trace
```

## TRACE_DETAILS

This variable identifies which API methods will be logged. Its default is empty, i.e.,

```bash
TRACE_DETAILS=
```

Which implies all functions are logged. Functions can be filtered using a comma-separated spec, e.g.,

```bash
TRACE_DETAILS=findProducts,getV2CategoryResources
```

This spec will display the log messages from findProducts and getV2CategoryResources functions only.

## LOG_CENSOR_STRING

This variable is used as masking string to mask sensitive, e.g., GDPR-related, information from log files. The default value given in the template is `**GDPR COMPLIANT**` and if the value is empty or not set, the default censor string is `****`
The set of values to mask are identified by their keys in `logging/core/redactionKeys.ts` file.
More info here: [https://getpino.io/#/docs/redaction](https://getpino.io/#/docs/redaction)

## Other Information

The default logging configuration is defined in `logging/core/logger.ts`
Currently core fetcher functions haven’t been instrumented with any logging. These will be added over time.
Some GH issues of note: [https://github.com/pinojs/pino/issues/670](https://github.com/pinojs/pino/issues/670)
