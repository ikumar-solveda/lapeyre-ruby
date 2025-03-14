/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { getCart } from '@/data/Content/Cart';
import { getContentRecommendation } from '@/data/Content/ContentRecommendation';
import { getCurrencyFormat } from '@/data/Content/CurrencyFormat-Server';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { getLocalization } from '@/data/Localization';
import { getNavigation } from '@/data/Navigation';
import { getSettings } from '@/data/Settings';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { getChildContentItems } from '@/data/utils/getChildContentItems';
import { useMemo } from 'react';

export const getHeader = async ({ cache, id, context, properties }: ContentProps) => {
	await getSettings(cache, context);
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await Promise.all([
		getCurrencyFormat(cache, context),
		getNavigation(cache, context),
		getCart({ cache, id: 'cart', context }),
		getLocalization(cache, locale, 'Header'),
		getLocalization(cache, locale, 'SignInPage'),
		getLocalization(cache, locale, 'MiniCart'),
		getLocalization(cache, locale, 'StoreLocator'),
		getLocalization(cache, locale, 'SearchBar'),
		getLocalization(cache, locale, 'SessionError'),
		getLocalization(cache, locale, 'Routes'),
		getLocalization(cache, locale, 'LanguageAndCurrency'),
		getLocalization(cache, locale, 'QuickOrder'),
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
