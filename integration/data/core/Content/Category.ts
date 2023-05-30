/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import useSWR from 'swr';
import { useSettings } from '@/data/Settings';
import { ID } from '@/data/types/Basic';
import { DATA_KEY, fetcher, getCategoryFetchPayload } from '@/data/Content/_Category';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useUser } from '@/data/User';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';

export const useCategory = (id: ID) => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { user } = useUser();
	const params = useExtraRequestParameters();
	const { data, error, isLoading } = useSWR(
		storeId
			? [{ ...getCategoryFetchPayload({ id }, settings, user?.context), langId }, DATA_KEY]
			: null,
		async ([props]) => fetcher(true)(props, params)
	);

	return {
		category: data?.at(0),
		loading: !error && isLoading,
		error,
	};
};
