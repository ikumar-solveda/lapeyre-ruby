/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

type StringsArray = string[];
type Tree = {
	[key: string]: string | Tree;
};
type SupportedLocales = {
	defaultLocale: string;
	locales: StringsArray;
};
export type Missing = {
	[lang: string]: {
		[section: string]: Record<string, any>;
	};
};

export type TranslationInput = {
	translations: Record<string, any>;
	directory: string;
	supportedLocales: SupportedLocales;
};

export type GenerateInput = {
	localesDirectory: string;
	generatedDirectory: string;
	supportedLocales: SupportedLocales;
	checkHash?: boolean;
};

export type WriteTranslationInput = {
	translation: Record<string, any>;
	output: string;
	defaultLocale: string;
};

export type AvailabilityTable = {
	[key: string]: boolean;
};

export type MissingLogInput = {
	missing: Missing;
	path: StringsArray;
};

export type WriteImporterInput = WriteTranslationInput & {
	missing: Missing;
	languages: StringsArray;
	sections: StringsArray;
};

export type DrawInterfaceTypesInput = {
	missing: Missing;
	path?: StringsArray;
	tree: Tree;
};
