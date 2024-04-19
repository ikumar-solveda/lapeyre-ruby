/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	addExtraHeaders,
	commerceAIModelResultsFetcher,
	dataMap,
	externalParamMap,
} from '@/data/Content/_CommerceAI';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useSettings } from '@/data/Settings';
import { usePageDataFromId } from '@/data/_PageDataFromId';
import {
	COMMERCE_AI_HEADER_SUBSCRIPTION_KEY,
	COMMERCE_AI_PROJECT_KEY,
	COMMERCE_AI_REGION_URL_KEY,
	COMMERCE_AI_SUBSCRIPTION_KEY,
} from '@/data/constants/commerceAI';
import { DATA_KEY_COMMERCE_AI } from '@/data/constants/dataKey';
import { WidgetProperties } from '@/data/types/Slot';
import { expand, shrink } from '@/data/utils/keyUtil';
import { useMemo } from 'react';
import useSWR from 'swr';

export const useCommerceAI = (
	modelInterfaceExtKey: string | undefined,
	properties?: WidgetProperties
) => {
	const { settings } = useSettings();
	const regionURL = settings.userData[COMMERCE_AI_REGION_URL_KEY];
	const projectExtKey = settings.userData[COMMERCE_AI_PROJECT_KEY];
	const subscriptionKey = settings.userData[COMMERCE_AI_SUBSCRIPTION_KEY];
	const { data: pageData } = usePageDataFromId();
	const query = useMemo(
		() => externalParamMap(properties?.publicEndpointParams, pageData),
		[pageData, properties?.publicEndpointParams]
	);
	const _params = useExtraRequestParameters();
	const params = useMemo(
		() => addExtraHeaders(_params, { [COMMERCE_AI_HEADER_SUBSCRIPTION_KEY]: subscriptionKey }),
		[_params, subscriptionKey]
	);
	const { data, error, isLoading } = useSWR(
		modelInterfaceExtKey && projectExtKey && regionURL
			? [shrink({ modelInterfaceExtKey, projectExtKey, regionURL, query }), DATA_KEY_COMMERCE_AI]
			: null,
		async ([props]) => {
			const { modelInterfaceExtKey, projectExtKey, regionURL, query } =
				expand<Record<string, any>>(props);
			return commerceAIModelResultsFetcher(true)({
				modelInterfaceExtKey,
				params,
				regionURL,
				query,
				projectExtKey,
			});
		}
	);
	const aiModelResults = useMemo(() => dataMap(data), [data]);

	return {
		aiModelResults,
		error,
		isLoading,
	};
};
