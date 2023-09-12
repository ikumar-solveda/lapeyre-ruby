/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { getSettings } from '@/data/Settings';
import { getNavigation } from '@/data/Navigation';
import { getContentRecommendation } from '@/data/Content/ContentRecommendation';
import { getChildContentItems } from '@/data/utils/getChildContentItems';
import { useMemo } from 'react';
import { getCart } from '@/data/Content/Cart';
import { getLocalization } from '@/data/Localization';

export const getHeader = async ({ cache, id, context, properties }: ContentProps) => {
	await getSettings(cache, context);
	await Promise.all([
		getNavigation(cache, context),
		getCart({ cache, id: 'cart', context }),
		getLocalization(cache, context.locale || 'en-US', 'Header'),
		getLocalization(cache, context.locale || 'en-US', 'SignInPage'),
		getLocalization(cache, context.locale || 'en-US', 'MiniCart'),
		getLocalization(cache, context.locale || 'en-US', 'StoreLocator'),
		getLocalization(cache, context.locale || 'en-US', 'SearchBar'),
		getLocalization(cache, context.locale || 'en-US', 'SessionError'),
		getLocalization(cache, context.locale || 'en-US', 'Routes'),
		getLocalization(cache, context.locale || 'en-US', 'Language'),
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

export const useHeader = (id: ID) => ({
	contentItems: useMemo(() => getChildContentItems(id), [id]),
});
