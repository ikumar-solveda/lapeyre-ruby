/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { usePreviewWidget } from '@/components/preview/PreviewWidgetFrame';
import { useBreadcrumbTrail } from '@/data/Content/BreadcrumbTrail';
import { fetcher, getESpotDataFromName } from '@/data/Content/_ESpotDataFromName-Server';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useMarketingCookieContentTarget } from '@/data/Content/_MarketingCookieContentTarget';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { usePageDataFromId } from '@/data/_PageDataFromId';
import { COOKIES } from '@/data/constants/cookie';
import { DATA_KEY_E_SPOT_DATA_FROM_NAME } from '@/data/constants/dataKey';
import { EMSTYPE_LOCAL, MARKETING_SPOT_DATA_TYPE } from '@/data/constants/marketing';
import { EventsContext } from '@/data/context/events';
import { CookiesSingletonContext } from '@/data/cookie/cookiesSingletonProvider';
import { ID } from '@/data/types/Basic';
import { ESpotActivityContainer } from '@/data/types/Marketing';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getDMSubstitutions } from '@/data/utils/getDMSubstitutions';
import { getESpotBaseData } from '@/data/utils/getESpotBaseData';
import { getESpotParams } from '@/data/utils/getESpotQueryParams';
import { expand, shrink } from '@/data/utils/keyUtil';
import { laggyMiddleWare } from '@/data/utils/laggyMiddleWare';
import { marketingSpotMiddleWare } from '@/data/utils/swr/marketingContentMiddleWare';
import { useContext, useEffect, useMemo } from 'react';
import useSWR from 'swr';

export type { ESpotContainerType } from '@/data/types/ESpot';
export { getESpotDataFromName };

export const useESpotDataFromName = (emsName: ID, trackEvents = true) => {
	const { onPromotionView } = useContext(EventsContext);
	const router = useNextRouter();
	const { settings } = useSettings();
	const { breadcrumb } = useBreadcrumbTrail();
	const { storeId, langId, defaultCatalogId: catalogId } = getClientSideCommon(settings, router);
	const { setESpotData } = usePreviewWidget();
	const { query } = router;
	const params = useExtraRequestParameters();
	const { data: pageData } = usePageDataFromId();
	const DM_Substitution = useMemo(
		() => getDMSubstitutions(emsName, { pageData, settings, langId }),
		[emsName, langId, pageData, settings]
	);
	const { getCookie } = useContext(CookiesSingletonContext);
	const referrer = useMemo(() => getCookie<number>(COOKIES.referrer), [getCookie]);
	const cookieTargets = useMarketingCookieContentTarget();
	const queryBase = useMemo(
		() => ({
			...(referrer && { DM_RefUrl: referrer }),
			...cookieTargets,
			catalogId,
			DM_ReturnCatalogGroupId: true,
			DM_FilterResults: false,
			langId,
			DM_Substitution,
		}),
		[catalogId, langId, DM_Substitution, referrer, cookieTargets]
	);
	const { data, error, isLoading } = useSWR(
		storeId
			? [
					shrink({
						storeId,
						...getESpotParams({ pageData, query, emsName, queryBase, breadcrumb }),
					}),
					DATA_KEY_E_SPOT_DATA_FROM_NAME,
			  ]
			: null,
		async ([props]) => {
			const expanded = expand<Record<string, any>>(props);
			return fetcher(true)(expanded.storeId, expanded.emsName, expanded.query, params);
		},
		{ use: [laggyMiddleWare, marketingSpotMiddleWare] }
	);

	useEffect(() => {
		setESpotData && setESpotData(data?.MarketingSpotData);
	}, [data, setESpotData]);

	useEffect(() => {
		if (trackEvents) {
			const all = getESpotBaseData(data);
			all?.forEach((spot) => {
				if (MARKETING_SPOT_DATA_TYPE.CONTENT === spot?.baseMarketingSpotDataType) {
					const activity = spot as Required<ESpotActivityContainer>;
					onPromotionView({ gtm: { activity, settings } });
				}
			});
		}
	}, [data]); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		data,
		loading: isLoading,
		error,
	};
};

/**
 * @deprecated to be removed
 */
export const getEMarketingSpotName = (properties: any, tokenExternalValue?: ID) => {
	if (properties?.emsName) {
		return properties?.emsType === EMSTYPE_LOCAL && tokenExternalValue
			? tokenExternalValue + properties?.emsName
			: properties?.emsName;
	} else {
		return tokenExternalValue;
	}
};
