/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { IncomingContent } from '@/data/types/IncomingContent';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { getDefaultContainerLayout } from '@/data/utils/getDefaultContainerLayout';

export const setDefaultLayoutIfNeeded = (pageFromId: PageDataFromId) => {
	if (pageFromId && !pageFromId.layout?.id) {
		return {
			...pageFromId,
			layout: pageFromId.layout
				? Object.assign(pageFromId.layout, getDefaultContainerLayout(pageFromId as IncomingContent))
				: getDefaultContainerLayout(pageFromId as IncomingContent),
		};
	} else {
		return pageFromId;
	}
};
