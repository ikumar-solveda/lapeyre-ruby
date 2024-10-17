/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ContainerLayout } from '@/data/types/ContainerLayout';

export type IncomingContent = {
	layout?: ContainerLayout;
	isProductSKU?: string;
	page: {
		imageAlternateDescription?: string;
		name?: string;
		redirect?: string;
		permanent?: boolean; // redirect attribute
		type: string;
		title: string;
		metaDescription: string;
		metaKeyword: string;
	};
	identifier: string;
	tokenExternalValue: string;
	tokenName: string;
	tokenValue: string;
	language?: string;
};
