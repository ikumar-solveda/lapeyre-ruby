/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

export type StoreLocale = {
	localeName: string;
	languageId: string;
	language?: string;
	country?: string;
	variant?: string | undefined;
	encoding?: string;
	mimeCharSet?: string;
};
