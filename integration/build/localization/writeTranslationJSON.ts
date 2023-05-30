/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import { AvailabilityTable, Missing, WriteTranslationInput } from './types';
import path from 'path';
import { filterEmptyObjectValues } from './filterEmptyObjectValues';
import { getMissingValues } from './getMissingValues';
import { objectOverlay } from './objectOverlay';

export const writeTranslationJSON = ({
	translation,
	output,
	defaultLocale,
}: WriteTranslationInput) => {
	const languages: AvailabilityTable = {};
	const sections: AvailabilityTable = {};
	const reference = translation[defaultLocale];
	const missing: Missing = {};
	Object.entries(translation).forEach(([lang, currentTranslation]) => {
		const langOutput = path.resolve(output, `./${lang}`);
		languages[lang] = true;
		missing[lang] = {};
		Object.entries(reference).forEach(([section, translation]) => {
			const sectionFile = path.resolve(langOutput, `${section}.ts`);
			const sectionTranslation = currentTranslation[section];
			const missingValues = getMissingValues({
				reference: translation?.hasOwnProperty ? translation : {},
				check: sectionTranslation || {},
			});
			sections[section] = true;
			if (missingValues) {
				missing[lang][section] = filterEmptyObjectValues(missingValues);
			}

			const processedTranslation = objectOverlay({
				base: translation?.hasOwnProperty ? translation : {},
				overlay: sectionTranslation || {},
			});
			fs.outputFileSync(
				sectionFile,
				`
export default ${JSON.stringify(processedTranslation)}
`,
				'utf8'
			);
		});
	});
	return {
		languages: Object.keys(languages),
		sections: Object.keys(sections),
		missing: filterEmptyObjectValues(missing),
	};
};
