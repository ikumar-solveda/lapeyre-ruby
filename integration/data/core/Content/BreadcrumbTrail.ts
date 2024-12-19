/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getBreadcrumbTrail } from '@/data/Content/BreadcrumbTrail-Server';
import { dataMapV2, fetcher, responseDataMap } from '@/data/Content/_BreadcrumbTrail';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { usePageDataFromId } from '@/data/_PageDataFromId';
import { COOKIES } from '@/data/constants/cookie';
import { DATA_KEY_BREADCRUMB } from '@/data/constants/dataKey';
import { CookiesSingletonContext } from '@/data/cookie/cookiesSingletonProvider';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { useContext, useMemo } from 'react';
import useSWR from 'swr';
export { getBreadcrumbTrail };

export const useBreadcrumbTrail = () => {
	const router = useNextRouter();
	const { getCookie } = useContext(CookiesSingletonContext);
	const trail = useMemo(() => getCookie(COOKIES.breadcrumb), [getCookie]);
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
		async ([props]) => responseDataMap(await fetcher(true)(expand(props), params))
	);

	// trail will only change on navigate -- we avoid unnecessary mutation by excluding it from deps
	const breadcrumb = useMemo(() => dataMapV2(data, trail as string[]), [data]); // eslint-disable-line react-hooks/exhaustive-deps

	return { breadcrumb, uniqueId: tokenValue, error };
};
