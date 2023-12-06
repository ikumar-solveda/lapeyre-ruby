/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { CONFIGS, NAMES } from '@/data/constants/metrics';
import { Histogram, register } from 'prom-client';

/**
 * es6 is singleton per module, however, we check against the registry explicitly, because in
 *   dev-mode, a recompile may try to re-register a metric, which will lead to an error
 *
 * we remedy this by simply checking the registry to see if the metric's been previously registered
 *
 * we also need to account for the case where an invocation may be attempted client-side, in which
 *   case the bundler will have replaced the module with an empty object and no such construction
 *   will occur -- we handle that using try/catch and return nullish and enclosing the
 *   initialization inside an IIFE -- callers need to handle nullish value as necessary
 */

export const backendMetrics = (() => {
	let rc;
	try {
		rc = (register?.getSingleMetric(NAMES.backend) as Histogram) ?? new Histogram(CONFIGS.backend);
	} catch (e) {}
	return rc;
})();

export const requestMetrics = (() => {
	let rc;
	try {
		rc = (register?.getSingleMetric(NAMES.request) as Histogram) ?? new Histogram(CONFIGS.request);
	} catch (e) {}
	return rc;
})();
