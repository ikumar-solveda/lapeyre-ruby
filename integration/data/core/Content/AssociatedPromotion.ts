/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getPromo, usePromo } from '@/data/Content/_Promos';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { getLocalization } from '@/data/Localization-Server';
import { ContentProps } from '@/data/types/ContentProps';

export const getAssociatedPromotion = async ({ cache, id: _id, context }: ContentProps) => {
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await Promise.all([getPromo(cache, '', context), getLocalization(cache, locale, 'Coupons')]);
};

export const useAssociatedPromotion = () => {
	const { isInvalidAssociatedPromotions, longDescription, shortDescription, hasNoDescription } =
		usePromo();
	return {
		isInvalidAssociatedPromotions,
		longDescription,
		shortDescription,
		hasNoDescription,
	};
};
