/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type SelectedLanguage = {
	locale: string;
	sessionId: string;
	rejectedLocale: Record<string, boolean>;
};
