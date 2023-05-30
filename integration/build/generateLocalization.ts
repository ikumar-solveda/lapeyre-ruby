/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import { GenerateInput, MissingLogInput } from './localization/types';
import path from 'path';
import { addTranslation } from './localization/addTranslation';
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

export const generateLocalization = ({
	localesDirectory,
	generatedDirectory,
	supportedLocales,
}: GenerateInput) => {
	const { defaultLocale } = supportedLocales;
	const core = path.resolve(localesDirectory, './core');
	const custom = path.resolve(localesDirectory, './custom');
	const output = path.resolve(generatedDirectory, './translations');
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
};
