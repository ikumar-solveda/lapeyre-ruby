/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import {
	envDetector,
	hostDetector,
	osDetector,
	processDetector,
	Resource,
} from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const OTEL_EXPORTER_OTLP_ENDPOINT = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || undefined;
const traceExporter = OTEL_EXPORTER_OTLP_ENDPOINT ? new OTLPTraceExporter() : undefined;
const spanProcessor = OTEL_EXPORTER_OTLP_ENDPOINT
	? new SimpleSpanProcessor(traceExporter as OTLPTraceExporter)
	: undefined;
const serviceName = process.env.OTEL_SERVICE_NAME || 'nextjs-store';

/**
 * possible other configuration inputs
 */

/**
 * metrics:
 */
// const metricReader = new PeriodicExportingMetricReader({
// 	exporter: new OTLPMetricExporter(),
// });
// const metricReader = new PrometheusExporter(); // can be configured with options

/**
 * logs:
 */
// const logsExporter = new SimpleLogRecordProcessor(new OTLPLogExporter())
// const logRecordProcessors = [new SimpleLogRecordProcessor(new OTLPLogExporter())],

const sdk = new NodeSDK({
	resource: new Resource({ [ATTR_SERVICE_NAME]: serviceName }),
	traceExporter,
	spanProcessor,
	metricReader: undefined,
	instrumentations: [getNodeAutoInstrumentations()],
	resourceDetectors: [envDetector, hostDetector, osDetector, processDetector],
});

// Start the OpenTelemetry SDK
sdk.start();
