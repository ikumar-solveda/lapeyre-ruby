/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

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
	await getCategoryExtended(cache, { parentCategoryId: id }, context);
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'ChildPimCategories'),
		getLocalization(cache, context.locale || 'en-US', 'Common'),
	]);
};

export const useChildCategoryGrid = (id: ID) => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { user } = useUser();
	const params = useExtraRequestParameters();
	const ChildPimCategories = useLocalization('ChildPimCategories');
	const { data, error } = useSWR(
		storeId
			? [shrink({ ...getCategoryFetchPayload({ id }, settings, user?.context), langId }), DATA_KEY]
			: null,
		async ([props]) => await fetcher(true)(expand(props), params)
	);
	const { data: categories, error: childCatsError } = useSWR(
		storeId
			? [
					shrink({
						...getCategoryFetchPayload({ parentCategoryId: id }, settings, user?.context),
						langId,
					}),
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
	};
};
