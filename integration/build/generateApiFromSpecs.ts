/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import { isEqual } from 'lodash';
import { statSync } from 'node:fs';
import path from 'path';
import { generateApi } from 'swagger-typescript-api';
import { getConfiguration } from './api/getConfiguration';
import { getSpecFromFiles } from './api/getSpecFromFiles';
import { APISpecData } from './api/types';
import { writeAPIFiles } from './api/writeAPIFiles';
import { writeProxyOptions } from './api/writeProxyOptions';
import { computeHash } from './common/computeHash';
import { writeHashes } from './common/writeHashes';

type GenerateInput = {
	specsDirectory: string;
	generatedDirectory: string;
	checkHash?: boolean;
};

const STAT_OPTS = { throwIfNoEntry: false };
const GENERATE_API_OPTS = {
	name: 'Api.ts',
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
};

const computeHashes = (specsDirectory: string, output: string) => {
	const outDirs: string[] = [];
	const specDirs: Record<string, string> = {};

	fs.readdirSync(specsDirectory).forEach((name) => {
		const dirPath = path.resolve(specsDirectory, `./${name}`);
		if (statSync(dirPath, STAT_OPTS)?.isDirectory()) {
			outDirs.push(name);
			Object.assign(specDirs, { [`${name}Hash`]: computeHash(dirPath) });
		}
	});

	outDirs.forEach((name) => {
		const dirPath = path.resolve(output, `./${name}`);
		if (statSync(dirPath, STAT_OPTS)?.isDirectory()) {
			Object.assign(specDirs, { [`${name}GeneratedHash`]: computeHash(dirPath) });
		}
	});

	// proxy-options file
	const filePath = path.resolve(output, './apiProxyOptions.ts');
	if (statSync(filePath, STAT_OPTS)?.isFile()) {
		Object.assign(specDirs, { apiProxyOptionsGeneratedHash: computeHash(filePath) });
	}

	return { ...specDirs };
};

export const generateApiFromSpecs = ({
	specsDirectory,
	generatedDirectory,
	checkHash = true,
}: GenerateInput) => {
	const hashPath = path.resolve(specsDirectory, './hash.json');

	if (checkHash) {
		const hash = computeHashes(specsDirectory, generatedDirectory);
		const { comment, ...stored } = fs.readJSONSync(hashPath, { throws: false }) ?? {};
		if (isEqual(hash, stored)) {
			console.log('Generated API pivots are same: no API generation necessary');
			return;
		}
	}

	const specData: APISpecData[] = [];
	const promises = fs
		.readdirSync(specsDirectory)
		.filter((name) => statSync(path.resolve(specsDirectory, `./${name}`), STAT_OPTS)?.isDirectory())
		.map((directoryName) => {
			const inputDirectory = path.resolve(specsDirectory, `./${directoryName}`);
			console.log(`Processing spec inside: ${inputDirectory}`);

			const files = fs.readdirSync(inputDirectory);
			const configuration = getConfiguration(
				fs.readJSONSync(path.resolve(inputDirectory, '.config.json'), 'utf-8')
			);
			const spec = getSpecFromFiles({ files, inputDirectory, configuration });
			return { directoryName, spec, configuration };
		})
		.filter(({ spec, configuration }) => spec && configuration)
		.map(({ directoryName, spec, configuration }) => {
			const output = path.resolve(generatedDirectory, `./${directoryName}`);
			console.log(`Generating spec inside: ${output}`);

			const bundleFile = path.resolve(output, 'bundle.json');
			fs.rmSync(output, { recursive: true, force: true });
			fs.outputFileSync(bundleFile, JSON.stringify(spec), 'utf8');
			specData.push({ directoryName, configuration, bundleFile, output });
			return generateApi({ ...GENERATE_API_OPTS, input: bundleFile });
		});

	Promise.all(promises)
		.then((apis) => Promise.all(apis.map((api, i) => writeAPIFiles(api, specData[i]))))
		.then(() => {
			const configurations = specData.map(({ configuration }) => configuration);
			return writeProxyOptions({ configurations, generatedDirectory });
		})
		.then(() => {
			writeHashes({ hashPath, ...computeHashes(specsDirectory, generatedDirectory) });
		})
		.catch((e) => console.error(e));
};
