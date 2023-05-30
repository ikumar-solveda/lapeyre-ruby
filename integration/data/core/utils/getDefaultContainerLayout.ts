/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { defaultContainerLayoutManifest } from '@/data/containers/default/manifest';
import { ContainerLayout } from '@/data/types/ContainerLayout';
import { IncomingContent } from '@/data/types/IncomingContent';

export const getDefaultContainerLayout = (props: IncomingContent): ContainerLayout => {
	const {
		tokenExternalValue,
		page: { type },
	} = props;

	// default container could be indexed by page-type _OR_ for some managed pages, by
	//   tokenExternalValue (only if type is ContentPage)
	const lookup = 'ContentPage' === type ? tokenExternalValue : type;

	// get default container -- mostly we just need the slots
	return defaultContainerLayoutManifest[lookup];
};
