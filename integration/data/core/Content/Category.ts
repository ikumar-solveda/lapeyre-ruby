/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DATA_KEY, fetcher, getCategoryFetchPayload } from '@/data/Content/_Category';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { ID } from '@/data/types/Basic';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import useSWR from 'swr';

export const useCategory = (id: ID | ID[], contractId?: string) => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId } = getClientSideCommon(settings, router);
	const { user } = useUser();
	const params = useExtraRequestParameters();
	const contract = contractId ? { contractId } : {};
	const { data, error, isLoading } = useSWR(
		id && storeId
			? [
					shrink({
						...getCategoryFetchPayload({ id }, settings, user?.context, {
							nextLocale: router.locale,
						}),
						...contract,
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => fetcher(true)(expand(props), params)
	);

	return {
		rawData: data,
		category: data?.at(0),
		loading: !error && isLoading,
		error,
	};
};
