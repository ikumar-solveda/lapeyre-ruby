/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import { APIConfig } from './types';
import path from 'path';

type ProxyOptionsInput = {
	configurations: APIConfig[];
	generatedDirectory: string;
};

export const writeProxyOptions = ({ configurations, generatedDirectory }: ProxyOptionsInput) => {
	fs.writeFile(
		path.resolve(generatedDirectory, 'apiProxyOptions.ts'),
		`
${configurations
	.filter(
		({ envHostKey }, i, array) =>
			array.findIndex(({ envHostKey: envLookup }) => envLookup === envHostKey) === i
	)
	.map(({ envHostKey }) => `const ${envHostKey} = process.env.${envHostKey};`).join(`
`)}
const MOCK_HOST_PORT = process.env.MOCK_HOST_PORT;
const useMock = process.env.USE_MOCK === 'true';
export const apiProxyOptions = [
${configurations
	.filter(
		({ public: pub }, i, array) =>
			array.findIndex(({ public: pubLookup }) => pubLookup === pub) === i
	)
	.map(
		({ envHostKey, public: pub, private: priv }) => `   {
        target: useMock ? 'http://localhost:' + MOCK_HOST_PORT : ${envHostKey},
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
};
