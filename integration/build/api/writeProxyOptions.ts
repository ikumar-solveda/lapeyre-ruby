/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import path from 'path';
import { APIConfig } from './types';

type ProxyOptionsInput = {
	configurations: APIConfig[];
	generatedDirectory: string;
};

export const writeProxyOptions = ({ configurations, generatedDirectory }: ProxyOptionsInput) =>
	fs.writeFile(
		path.resolve(generatedDirectory, 'apiProxyOptions.ts'),
		`${configurations
			.filter(
				({ envHostKey }, i, array) =>
					envHostKey &&
					array.findIndex(({ envHostKey: envLookup }) => envLookup === envHostKey) === i
			)
			.map(({ envHostKey }) => `const ${envHostKey} = process.env.${envHostKey};`).join(`
`)}
const MOCK_HOST_PORT = process.env.MOCK_HOST_PORT;
const useMock = process.env.USE_MOCK === 'true';
const MOCK_ORIGIN = \`http://localhost:\${MOCK_HOST_PORT}\`;
export const apiProxyOptions = [
${configurations
	.filter(
		({ envHostKey, public: pub }, i, array) =>
			envHostKey && array.findIndex(({ public: pubLookup }) => pubLookup === pub) === i
	)
	.map(
		({ envHostKey, public: pub, private: priv }) => `   {
        target: useMock ? MOCK_ORIGIN : ${envHostKey},
        pathRewrite: [
            {
                patternStr: '^${pub}',
                replaceStr: '${priv}',
            },
        ],
    },`
	).join(`
`)}
];
`
	);
