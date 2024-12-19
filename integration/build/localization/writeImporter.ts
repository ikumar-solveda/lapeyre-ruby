/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import path from 'path';
import { drawInterfaceTypes } from './drawInterfaceTypes';
import { WriteImporterInput } from './types';
const makeStringTypes = (strings: string[]) => strings.map((x) => `'${x}'`).join(' | ');
const drawSection = (key: string) => (/^(?!\d)[a-zA-Z0-9_]+$/.test(key) ? key : `'${key}'`);

/**
 * Generates importer code for requesting translations
 * requestTranslation sanitizes the output translation
 * object so it can safely be cached.
 */
export const writeImporter = ({
	output,
	languages,
	sections,
	translation,
	defaultLocale,
	missing,
}: WriteImporterInput) => {
	const fileOutput = path.resolve(output, `index.ts`);
	const typeBaseTree = translation[defaultLocale];
	fs.outputFileSync(
		fileOutput,
		`
type Languages = ${makeStringTypes(languages)};
type Sections = ${makeStringTypes(sections)};
export type Translation = Record<string, string | MixedObj>;
interface MixedObj extends Translation {}
type ArgTypes = string | number;
type TemplateArgs = Record<string, ArgTypes>;

const manifest: Record<
	Languages | string,
	Record<Sections | string, () => Promise<Translation>>
> = {${Object.entries(translation)
			.map(
				([lang, sections]) => `
	'${lang}': {${Object.keys(sections)
					.map(
						(section) => `
		${drawSection(section)}: () => import('./${lang}/${section}'),`
					)
					.join('')}
	},`
			)
			.join('')}
};

export interface TranslationTable {\n${drawInterfaceTypes({
			tree: typeBaseTree,
			missing,
		})}
}

export const requestTranslation = async ({
	locale,
	section,
}: {
	locale: Languages | string;
	section: Sections | string;
}) => {
	if (!manifest[locale] || typeof manifest[locale][section] !== 'function') {
		return {};
	}
	const loaded = await manifest[locale][section]();
	return loaded.default as Translation;
};
`,
		'utf8'
	);
};
