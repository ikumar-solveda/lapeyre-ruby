/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { partNumberSuggestionFetcher } from '@/data/Content/_SiteContentSuggestions';
import { useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ProductSuggestionEntry } from '@/data/types/SiteContentSuggestion';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { processError } from '@/data/utils/processError';
import { useCallback } from 'react';

const EMPTY_ARRAY = [] as ProductSuggestionEntry[];

export const useSiteContentSuggestions = () => {
	const { notifyError } = useNotifications();
	const { settings } = useSettings();
	const { storeId } = settings;
	const router = useNextRouter();
	const { defaultCatalogId: catalogId, langId } = getClientSideCommon(settings, router);

	const fetchPartNumberSuggestion = useCallback(
		async ({ searchTerm }: { searchTerm: string }) => {
			try {
				const { suggestionView } = await partNumberSuggestionFetcher(true)(storeId, searchTerm, {
					catalogId,
					langId,
				});
				return suggestionView?.at(0)?.entry ?? EMPTY_ARRAY;
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
				return undefined;
			}
		},
		[catalogId, langId, notifyError, storeId]
	);

	return { fetchPartNumberSuggestion };
};
