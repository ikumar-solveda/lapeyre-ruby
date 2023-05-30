/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getSettings } from '@/data/Settings';
import { getContentRecommendation } from '@/data/Content/ContentRecommendation';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { getChildContentItems } from '@/data/utils/getChildContentItems';
import { useMemo } from 'react';
import { getLocalization } from '@/data/Localization';

export const getFooter = async ({ cache, id, context, properties }: ContentProps) => {
	await getSettings(cache, context);
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'Footer'),
		...getChildContentItems(id).map((contentProperties) =>
			getContentRecommendation({
				cache,
				id,
				context,
				properties: { ...properties, ...contentProperties },
			})
		),
	]);
};

export const useFooter = (id: ID) => ({
	contentItems: useMemo(() => getChildContentItems(id), [id]),
});
