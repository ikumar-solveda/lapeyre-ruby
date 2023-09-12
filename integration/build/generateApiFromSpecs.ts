/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import path from 'path';
import { generateApi } from 'swagger-typescript-api';
import nextConfig from '../../next.config';
import { getSpecFromFiles } from './api/getSpecFromFiles';
import { APIConfig } from './api/types';
import { writeProxyOptions } from './api/writeProxyOptions';

type GenerateInput = {
	specsDirectory: string;
	generatedDirectory: string;
};
const basePath = nextConfig.basePath ?? '';

const moduleTest = /import {.+?HttpClient.+?} from '.\/http-client'/;

export const generateApiFromSpecs = ({ specsDirectory, generatedDirectory }: GenerateInput) => {
	const configurations: APIConfig[] = [];
	fs.readdirSync(specsDirectory).forEach((directoryName) => {
		const output = path.resolve(generatedDirectory, `./${directoryName}`);
		const bundleFile = path.resolve(output, 'bundle.json');
		const inputDirectory = path.resolve(specsDirectory, `./${directoryName}`);
		const files = fs.readdirSync(inputDirectory);
		const config = fs.readJSONSync(path.resolve(inputDirectory, '.config.json'), 'utf-8') as
			| APIConfig
			| undefined;
		const spec = getSpecFromFiles({ files, inputDirectory });

		if (!spec || !config) return;

		configurations.push(config);
		fs.outputFileSync(bundleFile, JSON.stringify(spec), 'utf8');

		generateApi({
			name: `Api.ts`,
			input: bundleFile,
			singleHttpClient: true,
			generateResponses: true,
			generateClient: true,
			generateRouteTypes: false,
			silent: true,
			extractResponseBody: false,
			moduleNameFirstTag: true,
			modular: true,
			cleanOutput: true,
			unwrapResponseData: true,
			templates: path.resolve(process.cwd(), './integration/build/templates/modular'),
		})
			.then(({ files }) => {
				const modules: string[] = [];
				files.forEach(({ content, name }) => {
					fs.writeFileSync(path.resolve(output, name), content);
					if (moduleTest.test(content)) {
						const fileNameStart = (name || '').split('.').at(0);
						if (fileNameStart) {
							modules.push(fileNameStart);
						}
					}
				});
				fs.unlinkSync(bundleFile);
				fs.writeFile(
					path.resolve(output, 'index.ts'),
					`
import { HttpClient } from './http-client';
${modules.map((name) => `import { ${name} } from './${name}';`).join('\n')}
const publicClient = new HttpClient({
	baseUrl: process.env.NODE_ENV === 'production' ? '${basePath}${config.private}':'${basePath}${
						config.public
					}',
});
const privateClient = new HttpClient({
	baseUrl: (process.env.USE_MOCK === 'true' ? 'http://localhost:' + process.env.MOCK_HOST_PORT : process.env.${
		config.envHostKey
	} as string) + '${config.private}',
});
${modules
	.map(
		(name) => `
export const ${directoryName}${name} = (pub: boolean) => new ${name}(pub ? publicClient : privateClient);`
	)
	.join('')}
`
				);
			})
			.catch((e) => console.error(e));
	});
	writeProxyOptions({ configurations, generatedDirectory });
};
