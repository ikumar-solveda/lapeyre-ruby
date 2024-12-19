/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import {
	DATA_KEY,
	fetcher,
	getCategory,
	getCategoryExtended,
	getCategoryFetchPayload,
} from '@/data/Content/_Category';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getLocalization, useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { useMemo } from 'react';
import useSWR from 'swr';

export const getChildCategoryGrid = async ({ cache, id, context }: ContentProps) => {
	await getCategory(cache, id, context);
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const cats = await getCategoryExtended(cache, { parentCategoryId: id }, context);
	const catPromise = cats?.map(({ uniqueID }) => getCategory(cache, uniqueID, context)) ?? [];
	await Promise.all([
		...catPromise,
		getLocalization(cache, locale, 'ChildPimCategories'),
		getLocalization(cache, locale, 'Common'),
	]);
};

export const useChildCategoryGrid = (id: ID) => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId } = getClientSideCommon(settings, router);
	const { user } = useUser();
	const params = useExtraRequestParameters();
	const ChildPimCategories = useLocalization('ChildPimCategories');
	const { data, error } = useSWR(
		storeId && id
			? [
					shrink(
						getCategoryFetchPayload({ id }, settings, user?.context, { nextLocale: router.locale })
					),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => await fetcher(true)(expand(props), params)
	);
	const { data: categories, error: childCatsError } = useSWR(
		storeId && id
			? [
					shrink(
						getCategoryFetchPayload({ parentCategoryId: id }, settings, user?.context, {
							nextLocale: router.locale,
						})
					),
					DATA_KEY,
			  ]
			: null,
		async ([childCatsProps]) => await fetcher(true)(expand(childCatsProps) as any, params)
	);
	const name = useMemo(() => data?.at(0)?.name ?? '', [data]);

	return {
		root: data?.at(0),
		categories,
		categoryTitle: ChildPimCategories.title.t({ name }),
		loading: !error && !data && !childCatsError && !categories,
		error: error || childCatsError,
		settings,
		params,
	};
};
