/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import path from 'path';
import nextConfig from '../../next.config';
import { generateLocalization } from './generateLocalization';
const localesDirectory = path.resolve(__dirname, '../locales');
const supportedLocales = nextConfig.i18n || { locales: [], defaultLocale: '' };
const generatedDirectory = path.resolve(__dirname, '../generated');

generateLocalization({
	localesDirectory,
	generatedDirectory,
	supportedLocales,
});
