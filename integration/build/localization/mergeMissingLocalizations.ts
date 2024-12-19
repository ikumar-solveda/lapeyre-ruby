/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

/**
 * DISCLAIMER: this tool is for internal usage only -- use at your own risk
 */

import fs from 'fs-extra';
import { merge, set } from 'lodash';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'path';
import { FlattenedMissingLocaleData } from './types';

const PIVOT = 'en-US';
const DEFAULT = 'default';
const INPUT = 'localization-output';
const TRANSLATION_JSON = 'translation.json';
const STATIC_ROUTES_JSON = 'staticRoutes.json';
const MISSING_JSON = 'missing.json';
const MISSING_ROUTES_JSON = 'missingRoutes.json';
const CHECK_FILES = [TRANSLATION_JSON, STATIC_ROUTES_JSON];
const INPUT_FILES = [MISSING_JSON, MISSING_ROUTES_JSON];
const LOCALES_PATH = path.resolve(__dirname, '../../locales/core');
const INPUT_PATH = path.resolve(__dirname, '../../..', INPUT);

// find all locales that aren't the pivot or default
const dirs = readdirSync(LOCALES_PATH);
const locales = dirs.filter((dir) => dir !== PIVOT && dir !== DEFAULT);

CHECK_FILES.forEach((file, index) => {
	if (existsSync(path.resolve(INPUT_PATH, INPUT_FILES[index]))) {
		// read pivot -- we use the pivot to help retain same order in the other locales
		const search = fs.readJSONSync(path.resolve(LOCALES_PATH, PIVOT, file));

		// find missing keys in other locales (this should have been done and updated into the
		//   `missing.json` or `missingRoutes.json` file created by `find-missing-localizations` target)
		const flattenedData: FlattenedMissingLocaleData = fs.readJSONSync(
			path.resolve(INPUT_PATH, INPUT_FILES[index])
		);
		const { keys, ...values } = flattenedData;

		locales.forEach((locale) => {
			// check if we've generated new data for any missing keys for this locale
			const localeObject = values[locale];
			if (localeObject) {
				// read the source file for this locale
				const source = fs.readJSONSync(path.resolve(LOCALES_PATH, locale, file));

				// unflatten the generated object from new data
				const newData = {};
				keys.forEach((key, index) => set(newData, key, localeObject[index]));

				// first merge back into the source file
				merge(source, newData);

				// then merge back into pivot file to retain order
				merge(search, source);

				// now write output file for this locale
				mkdirSync(path.resolve(INPUT_PATH, locale), { recursive: true });
				fs.writeJSONSync(path.resolve(INPUT_PATH, locale, file), search, { spaces: '\t' });
			}
		});
	}
});
