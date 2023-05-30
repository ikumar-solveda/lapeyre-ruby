/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import pino from 'pino';
import { redactionKeys } from '@/logging/redactionKeys';
import { DEFAULT_LOG_LEVEL, DEFAULT_CENSOR_STRING, DEVELOPMENT } from '@/logging/constants';

const logLevel = process.env.LOG_LEVEL ?? DEFAULT_LOG_LEVEL;
const isPinoPrettyEnable = process.env.NODE_ENV === DEVELOPMENT;
const censorString = process.env.LOG_CENSOR_STRING ?? DEFAULT_CENSOR_STRING;
export const logger = pino({
	level: logLevel,
	transport: isPinoPrettyEnable
		? {
				target: 'pino-pretty',
				options: {
					colorize: true,
					ignore: '*',
				},
		  }
		: {
				target: 'pino/file',
				options: {
					destination: 1,
				},
		  },
	redact: {
		paths: redactionKeys,
		censor: censorString,
	},
	formatters: {
		level: (label) => ({
			level: label,
		}),
	},
});
