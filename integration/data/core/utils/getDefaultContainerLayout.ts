/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PAGE_TYPES } from '@/data/constants/layout';
import { defaultContainerLayoutManifest } from '@/data/containers/default/manifest';
import { ContainerLayout } from '@/data/types/ContainerLayout';
import { IncomingContent } from '@/data/types/IncomingContent';

const B2BLayouts = {
	VariantPage: true,
	ProductPage: true,
	ItemPage: true,
};

export const getDefaultContainerLayout = (
	props: IncomingContent,
	isB2B?: boolean
): ContainerLayout => {
	const {
		tokenExternalValue,
		page: { type },
	} = props;

	// default container could be indexed by page-type _OR_ for some managed pages, by
	//   tokenExternalValue (only if type is ContentPage)
	const lookup =
		PAGE_TYPES.ContentPage === type
			? tokenExternalValue
			: isB2B && B2BLayouts[type as keyof typeof B2BLayouts]
			? PAGE_TYPES.B2BProductPage
			: type;

	// get default container -- mostly we just need the slots
	return defaultContainerLayoutManifest[lookup];
};
