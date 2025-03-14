/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { config } from '@dotenvx/dotenvx';
import nextConfig from 'configs/next.config';
import path from 'path';
import { generateApiFromSpecs } from './generateApiFromSpecs';
import { generateLocalization } from './generateLocalization';

config({ path: ['.env.local', '.env'] }); // Load environment variables from .env.local and .env
const localesDirectory = path.resolve(__dirname, '../locales');
const supportedLocales = nextConfig.i18n || {
	locales: [],
	defaultLocale: '',
};
const specsDirectory = path.resolve(__dirname, '../specs');
const generatedDirectory = path.resolve(__dirname, '../generated');

generateApiFromSpecs({
	specsDirectory,
	generatedDirectory,
	checkHash: false,
});

generateLocalization({
	localesDirectory,
	generatedDirectory,
	supportedLocales,
	checkHash: false,
});
