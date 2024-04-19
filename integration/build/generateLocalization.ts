/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import { statSync } from 'node:fs';
import path from 'path';
import { computeHash } from './common/computeHash';
import { writeHashes } from './common/writeHashes';
import { addTranslation } from './localization/addTranslation';
import { GenerateInput, MissingLogInput } from './localization/types';
import { writeImporter } from './localization/writeImporter';
import { writeTranslationJSON } from './localization/writeTranslationJSON';

const logMissing = ({ missing, path }: MissingLogInput) => {
	Object.entries(missing).forEach(([key, value]) => {
		if (typeof value === 'string') {
			console.log('Missing Translation', [`${path.join('.')}.${key}`]);
		}
		if (typeof value === 'object') {
			logMissing({ missing: value, path: [...path, key] });
		}
	});
};

const computeHashes = (core: string, custom: string, output: string) => {
	const coreDir = statSync(core);
	const customDir = statSync(custom, { throwIfNoEntry: false });
	const outputDir = statSync(output, { throwIfNoEntry: false });

	const coreHash = coreDir.isDirectory() ? computeHash(core) : '';
	const customHash = customDir?.isDirectory() ? computeHash(custom) : '';
	const generatedFilesHash = outputDir?.isDirectory() ? computeHash(output) : '';

	return { coreHash, customHash, generatedFilesHash };
};

export const generateLocalization = ({
	localesDirectory,
	generatedDirectory,
	supportedLocales,
	checkHash = true,
}: GenerateInput) => {
	const { defaultLocale } = supportedLocales;
	const core = path.resolve(localesDirectory, './core');
	const custom = path.resolve(localesDirectory, './custom');
	const output = path.resolve(generatedDirectory, './translations');
	const hashPath = path.resolve(localesDirectory, './hash.json');

	if (checkHash) {
		const { coreHash, customHash, generatedFilesHash } = computeHashes(core, custom, output);
		const stored = fs.readJSONSync(hashPath);
		if (
			coreHash === stored.coreHash &&
			customHash === stored.customHash &&
			generatedFilesHash === stored.generatedFilesHash
		) {
			console.log('Translation pivots are same: no translations necessary');
			return;
		}
	}

	const translation = addTranslation({
		translations: addTranslation({
			translations: {},
			directory: core,
			supportedLocales,
		}),
		directory: custom,
		supportedLocales,
	});
	fs.rmSync(output, { recursive: true, force: true });
	const { languages, sections, missing } = writeTranslationJSON({
		translation,
		output,
		defaultLocale,
	});
	logMissing({ missing, path: [] });
	writeImporter({
		output,
		languages,
		sections,
		translation,
		defaultLocale,
		missing,
	});

	writeHashes({ hashPath, ...computeHashes(core, custom, output) });
};
