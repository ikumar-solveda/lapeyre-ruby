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
import { ID } from '@/data/types/Basic';
import { useSettings } from '@/data/Settings';
import useSWR from 'swr';
import { useLocalization } from '@/data/Localization';
import { useMemo } from 'react';
import { ContentProps } from '@/data/types/ContentProps';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useUser } from '@/data/User';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';

export const getChildCategoryGrid = async ({ cache, id, context }: ContentProps) => {
	await getCategory(cache, id, context);
	await getCategoryExtended(cache, { parentCategoryId: id }, context);
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
			? [{ ...getCategoryFetchPayload({ id }, settings, user?.context), langId }, DATA_KEY]
			: null,
		async ([props]) => await fetcher(true)(props as any, params)
	);
	const { data: categories, error: childCatsError } = useSWR(
		storeId
			? [
					{ ...getCategoryFetchPayload({ parentCategoryId: id }, settings, user?.context), langId },
					DATA_KEY,
			  ]
			: null,
		async ([childCatsProps]) => await fetcher(true)(childCatsProps as any, params)
	);
	const name = useMemo(() => data?.at(0)?.name ?? '', [data]);

	return {
		categories,
		categoryTitle: ChildPimCategories.title.t({ name }),
		loading: !error && !data && !childCatsError && !categories,
		error: error || childCatsError,
	};
};
