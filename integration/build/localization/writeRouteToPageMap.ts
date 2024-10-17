/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import fs from 'fs-extra';
import { encodePathAsURIComponent } from 'integration/build/common/encodePathAsURIComponent';
import type {
	TranslatableRoute,
	WriteTranslationInput,
} from 'integration/build/localization/types';
import { transform } from 'lodash';
import path from 'path';

/**
 * Writes the route to page map based on the provided translation and output path.
 * @param {WriteTranslationInput} options - The options object containing the translation and output path.
 */
export const writeRouteToPageMap = ({ translation, output }: WriteTranslationInput) => {
	const mapOutput = path.resolve(output, `./index.ts`);
	const map = Object.entries(translation).reduce(
		(routesToPage, [locale, { Routes }]: [string, { Routes: Record<string, TranslatableRoute> }]) =>
			transform(
				Routes,
				(result, value, key) => {
					if (value.route) {
						const encoded = encodePathAsURIComponent(value.route);
						result[encoded] = [
							...(result[encoded] ?? []),
							{ pageName: key, locale: locale.toLowerCase() },
						];
					}
					return result;
				},
				routesToPage
			),
		{} as { [key: string]: { pageName: string; locale: string }[] }
	);
	fs.outputFileSync(
		mapOutput,
		`
export const routeToPage: Record<string, {pageName: string; locale:string}[]> = ${JSON.stringify(
			map
		)}
`,
		'utf8'
	);
};
