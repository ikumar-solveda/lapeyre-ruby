/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DEFAULT_CENSOR_STRING, DEFAULT_LOG_LEVEL } from '@/logging/constants';
import { redactionKeys } from '@/logging/redactionKeys';
import pino from 'pino';

const logLevel = process.env.LOG_LEVEL ?? DEFAULT_LOG_LEVEL;
const censorString = process.env.LOG_CENSOR_STRING ?? DEFAULT_CENSOR_STRING;

/**
 * to specify multiple streams, use:
 * `const stream =
      typeof pino.multistream === 'function' // handle non-availability in browser
        ? pino.multistream(
            [
              {
                stream: pino.destination({ dest: '<fs-path>', append: true, sync: true }),
                level: 'trace', // log all levels in the same stream
              },
              {
                stream: process.stdout,
                level: 'trace', // log all levels in the same stream
              },
            ].filter(Boolean)
          )
        : process.stdout;`
 */
const stream = process.stdout;
export const logger = pino(
	{
		level: logLevel,
		timestamp: pino.stdTimeFunctions.isoTime,
		redact: {
			paths: redactionKeys,
			censor: censorString,
		},
		formatters: {
			level: (label) => ({ level: label }),
			bindings: (_bindings) => ({}),
		},
	},
	stream
);
