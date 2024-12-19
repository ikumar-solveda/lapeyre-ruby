# OpenTelemetry Enablement

## Pages Router

The storefront implementation (which uses the pages router) has enablement of **OpenTelemetry** (request-id tracking) when:

- `OTEL_JAVAAGENT_ENABLED` is set to `true`, or
- `OTEL_JAVAAGENT_ENABLED` variable is not set and `NEXTJS_OTEL_ENABLED` is set to `true` or is unset

## Extra Enablement

There is dependence on environment variables used by **OpenTelemetry** for pushing traces and spans to the endpoint configured to receive them.

Specifically, `OTEL_EXPORTER_OTLP_ENDPOINT` needs to be set in the environment for traces and spans to be sent to the **OpenTelemetry** server.

Other variables observed by **OpenTelemetry** may also be specified, but the `OTEL_EXPORTER_OTLP_ENDPOINT` **must** be set for telemetry to be exported.

These other variables are documented [here](https://opentelemetry.io/docs/languages/sdk-configuration/)

## Implementation

Per **Next.js** guidelines, core instrumentation is enabled through `instrumentation.ts` located in the root of the project which will dynamically load `instrumentation.node.ts` as necessary.

These files are located [here](../instrumentation.ts) and [here](../instrumentation.node.ts) respectively.
