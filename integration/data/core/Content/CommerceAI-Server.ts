/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import {
	addExtraHeaders,
	commerceAIModelResultsFetcher,
	dataMap,
	externalParamMap,
} from '@/data/Content/_CommerceAI';
import { getLocalization } from '@/data/Localization-Server';
import { getContractIdParamFromContext, getSettings, isB2BStore } from '@/data/Settings';
import { getUser } from '@/data/User-Server';
import { getPageDataFromId } from '@/data/_PageDataFromId-Server';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import {
	COMMERCE_AI_HEADER_SUBSCRIPTION_KEY,
	COMMERCE_AI_PROJECT_KEY,
	COMMERCE_AI_REGION_URL_KEY,
	COMMERCE_AI_SUBSCRIPTION_KEY,
} from '@/data/constants/commerceAI';
import { DATA_KEY_COMMERCE_AI } from '@/data/constants/dataKey';
import { ContentProps } from '@/data/types/ContentProps';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { shrink } from '@/data/utils/keyUtil';
import { unstable_serialize as unstableSerialize } from 'swr';

export const getCommerceAI = async (props: ContentProps): Promise<string[] | undefined> => {
	const { cache, context, id, properties } = props;
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const routes = await getLocalization(cache, locale, 'Routes');
	const pageData = await getPageDataFromId(cache, context.query.path, context);
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const useCategory = pageData?.tokenName === 'CategoryToken' && properties?.useCategory === 'true';
	const query = {
		...externalParamMap(properties?.publicEndpointParams, pageData),
		...(useCategory && { categoryId: pageData.tokenExternalValue }),
		userId: user?.personalizationId,
		...(isB2BStore(settings) && getContractIdParamFromContext(user?.context)),
	};
	const regionURL = settings.userData[COMMERCE_AI_REGION_URL_KEY];
	const projectExtKey = settings.userData[COMMERCE_AI_PROJECT_KEY];
	const subscriptionKey = settings.userData[COMMERCE_AI_SUBSCRIPTION_KEY];
	const cacheScope = getServerCacheScope(context);
	const params = addExtraHeaders(
		constructRequestParamsWithPreviewToken({ context, settings, routes }),
		{ [COMMERCE_AI_HEADER_SUBSCRIPTION_KEY]: subscriptionKey }
	);
	const keyComps = { modelInterfaceExtKey: id as string, projectExtKey, regionURL, query };
	const key = unstableSerialize([shrink(keyComps), DATA_KEY_COMMERCE_AI]);
	const value =
		cache.get(key, cacheScope) ||
		commerceAIModelResultsFetcher(false, context)({ ...keyComps, params });
	cache.set(key, value, cacheScope);
	return dataMap(await value);
};
