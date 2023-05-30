/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import fs from 'fs-extra';
import { TranslationInput } from './types';
import path from 'path';
import { objectOverlay } from './objectOverlay';

export const addTranslation = ({
	translations,
	directory,
	supportedLocales,
}: TranslationInput) =>
	objectOverlay({
		base: translations,
		overlay: fs.readdirSync(directory).reduce((translations, lang) => {
			if (!supportedLocales.locales.includes(lang)) return translations;
			const langDirectory = path.resolve(directory, `./${lang}`);
			return {
				...translations,
				[lang]: fs.readdirSync(langDirectory).reduce((translation, file) => {
					if (!file.endsWith('.json')) {
						return translation;
					}
					const newTranslation = JSON.parse(
						fs.readFileSync(path.resolve(langDirectory, file), 'utf-8')
					);
					return objectOverlay({ base: translation, overlay: newTranslation });
				}, {}),
			};
		}, {}),
	});
