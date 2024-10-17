/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

/**
 * DISCLAIMER: this tool is for internal usage only -- use at your own risk
 */

import fs from 'fs-extra';
import { merge } from 'lodash';
import { mkdirSync, readdirSync } from 'node:fs';
import path from 'path';

const findMissing = (search: Record<string, any>, source: Record<string, any>, prefix = '') => {
	const result: Record<string, string> = {};

	Object.entries(search).forEach(([key, value]) => {
		const path = prefix ? `${prefix}.${key}` : key;
		if (typeof value === 'string') {
			if (!source[key]) {
				result[path] = value;
			}
		} else if (typeof value === 'object') {
			const subResult = findMissing(value, source[key] || {}, path);
			if (Object.keys(subResult).length) {
				merge(result, subResult);
			}
		}
	});

	return result;
};

const PIVOT = 'en-US';
const DEFAULT = 'default';
const OUTPUT = 'localization-output';
const TRANSLATION_JSON = 'translation.json';
const STATIC_ROUTES_JSON = 'staticRoutes.json';
const MISSING_JSON = 'missing.json';
const MISSING_ROUTES_JSON = 'missingRoutes.json';
const CHECK_FILES = [TRANSLATION_JSON, STATIC_ROUTES_JSON];
const OUTPUT_FILES = [MISSING_JSON, MISSING_ROUTES_JSON];
const LOCALES_PATH = path.resolve(__dirname, '../../locales/core');
const OUTPUT_PATH = path.resolve(__dirname, '../../..', OUTPUT);

// find first locale that isn't the pivot or default
const dirs = readdirSync(LOCALES_PATH);
const otherLocale = dirs.find((dir) => dir !== PIVOT && dir !== DEFAULT) as string;

CHECK_FILES.forEach((file, index) => {
	// read pivot and other locale
	const search = fs.readJSONSync(path.resolve(LOCALES_PATH, PIVOT, file));
	const source = fs.readJSONSync(path.resolve(LOCALES_PATH, otherLocale, file));

	// find missing keys in other locale
	const missing = findMissing(search, source);
	const keys = Object.keys(missing);

	// write output file with keys as a separate array and the values as a separate array with the pivot locale as the value array's key
	if (keys.length > 0) {
		mkdirSync(OUTPUT_PATH, { recursive: true });
		const data = { keys, [PIVOT]: Object.values(missing) };
		fs.writeJSONSync(path.resolve(OUTPUT_PATH, OUTPUT_FILES[index]), data, { spaces: 2 });
	}
});
