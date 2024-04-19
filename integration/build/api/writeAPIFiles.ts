/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import fs from 'fs-extra';
import { APISpecData } from 'integration/build/api/types';
import path from 'path';
import { GenerateApiOutput } from 'swagger-typescript-api';
import nextConfig from '../../../next.config';
import { getDynamicClientGetter } from './getDynamicClientGetter';
import { getPrivateClientInstance } from './getPrivateClientInstance';
import { getPublicClientInstance } from './getPublicClientInstance';

const basePath = nextConfig.basePath ?? '';
const moduleTest = /import {.+?HttpClient.+?} from '.\/http-client'/;
const originWithModule = (directory: string, module: string) =>
	`${directory}${module}`.replace(/\-(\w)/g, (_, p1) => p1.toUpperCase());

export const writeAPIFiles = async (
	{ files, configuration }: GenerateApiOutput,
	specData: APISpecData
) => {
	const { bundleFile, configuration: config, directoryName, output } = specData;
	const modules: string[] = [];

	const promises = files.map(({ content, name }) => {
		if (moduleTest.test(content)) {
			const fileNameStart = name.split('.').at(0);
			if (fileNameStart) {
				modules.push(fileNameStart);
			}
		}
		return fs.writeFile(path.resolve(output, name), content);
	});
	promises.push(fs.unlink(bundleFile));
	promises.push(
		fs.writeFile(
			path.resolve(output, 'index.ts'),
			`import { keyBy } from 'lodash';
import { HttpClient } from './http-client';
${modules.map((name) => `import { ${name} } from './${name}';`).join('\n')}

const traceDetails = process.env.TRACE_DETAILS?.trim() ? keyBy(process.env.TRACE_DETAILS.split(',').map((f) => f.trim()).filter(Boolean)) : undefined;
${
	config.envHostKey
		? [getPublicClientInstance(basePath, config), getPrivateClientInstance(config)].join('\n')
		: getDynamicClientGetter(configuration)
}${modules
				.map(
					(name) => `
export const ${originWithModule(directoryName, name)} = (pub: boolean${
						config.envHostKey ? '' : ', baseUrl: string'
					}) => new ${name}(${
						config.envHostKey
							? 'pub ? publicClient : privateClient'
							: 'getClient(pub, getBaseOrMockURL(baseUrl), traceDetails)'
					});`
				)
				.join('')}
`
		)
	);
	await Promise.all(promises);
};
