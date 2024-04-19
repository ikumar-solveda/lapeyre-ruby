/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getBreadcrumbTrail } from '@/data/Content/BreadcrumbTrail-Server';
import { dataMap, fetcher } from '@/data/Content/_BreadcrumbTrail';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { usePageDataFromId } from '@/data/_PageDataFromId';
import { DATA_KEY_BREADCRUMB } from '@/data/constants/dataKey';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import useSWR from 'swr';
export { getBreadcrumbTrail };

export const useBreadcrumbTrail = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { user } = useUser();
	const { storeId, langId, defaultCatalogId: catalogId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { data: pageData } = usePageDataFromId();
	const { tokenName = '', tokenValue = '', tokenExternalValue = '' } = pageData ?? {};
	const { data, error } = useSWR(
		tokenName && storeId
			? [
					shrink({
						tokenName,
						tokenValue,
						tokenExternalValue,
						storeId,
						catalogId,
						langId,
						...getContractIdParamFromContext(user?.context),
					}),
					DATA_KEY_BREADCRUMB,
			  ]
			: null,
		async ([props]) => dataMap(await fetcher(true)(expand(props), params))
	);
	return { breadcrumb: data, uniqueId: tokenValue, error };
};
