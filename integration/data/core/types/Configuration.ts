/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

export enum CONFIGURATION_IDS {
	SUPPORTED_LANGUAGES = 'com.ibm.commerce.foundation.supportedLanguages',
	DEFAULT_CURRENCY = 'com.ibm.commerce.foundation.defaultCurrency',
	DEFAULT_LANGUAGE = 'com.ibm.commerce.foundation.defaultLanguage',
	SUPPORTED_CURRENCIES = 'com.ibm.commerce.foundation.supportedCurrencies',
}

export type LanguageConfiguration = {
	languageDescription: string;
	languageId: string;
	localeName: string;
	language: string;
	country: string;
	variant: string | undefined;
	encoding: string;
	mimeCharSet: string;
};

export type CurrencyConfiguration = {
	currencyCode: string;
	currencyDescription: string;
};
