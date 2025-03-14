/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import nextConfig from 'configs/next.config';
import fs from 'fs-extra';
import { APISpecData } from 'integration/build/api/types';
import path from 'path';
import { GenerateApiOutput } from 'swagger-typescript-api';
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
	const promises = files.map(({ fileContent: content, fileName, fileExtension }) => {
		const name = `${fileName}${fileExtension}`;
		if (moduleTest.test(content)) {
			const fileNameStart = name.split('.').at(0);
			if (fileNameStart) {
				modules.push(fileNameStart);
			}
		}
		return fs.writeFile(path.resolve(output, name), content); // writing API outputs.
	});
	promises.push(fs.unlink(bundleFile));
	promises.push(
		fs.writeFile(
			// writing public and private client.
			path.resolve(output, 'client.ts'),
			`import keyBy from 'lodash/keyBy';
import { HttpClient } from './http-client';

export const traceDetails = process.env.TRACE_DETAILS?.trim() ? keyBy(process.env.TRACE_DETAILS.split(',').map((f) => f.trim()).filter(Boolean)) : undefined;
${
	config.envHostKey
		? [getPublicClientInstance(basePath, config), getPrivateClientInstance(config)].join('\n')
		: getDynamicClientGetter(configuration)
}
`
		)
	);
	promises.push(
		...modules.map((name) =>
			fs.writeFile(
				// writing API public or private client instances.
				path.resolve(output, `${originWithModule(directoryName, name)}.ts`),
				`${
					config.envHostKey
						? `import { publicClient, privateClient } from './client'`
						: `import { getClient, getBaseOrMockURL, traceDetails } from './client'`
				};
import { ${name} } from './${name}';

const ${originWithModule(directoryName, name)} = (pub: boolean${
					config.envHostKey ? '' : ', baseUrl: string'
				}) => new ${name}(${
					config.envHostKey
						? 'pub ? publicClient : privateClient'
						: 'getClient(pub, getBaseOrMockURL(baseUrl), traceDetails)'
				});
export default ${originWithModule(directoryName, name)};
`
			)
		)
	);
	promises.push(
		fs.writeFile(
			// writing barrel file for all APIs aiming to have better backward compatibility.
			path.resolve(output, 'index.ts'),
			`${modules
				.map((name) => `import ${name} from './${originWithModule(directoryName, name)}';`)
				.join('\n')}

${modules
	.map(
		(name) => `
export const ${originWithModule(directoryName, name)} = ${name};`
	)
	.join('')}
`
		)
	);
	await Promise.all(promises);
};
