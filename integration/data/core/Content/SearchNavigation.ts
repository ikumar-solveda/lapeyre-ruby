/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { getContractIdParamFromContext, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { TYPE_AHEAD_DELAY } from '@/data/config/TYPE_AHEAD_DELAY';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getProductListQueryParameters } from '@/data/utils/getProductListQueryParameters';
import { laggyMiddleWare } from '@/data/utils/laggyMiddleWare';
import { error as logError } from '@/data/utils/loggerUtil';
import { querySiteContentResource } from 'integration/generated/query';
import { SiteContentResource } from 'integration/generated/query/SiteContentResource';
import { CommonSuggestions } from 'integration/generated/query/data-contracts';
import { transactionsSearchDisplay } from 'integration/generated/transactions';
import { ComIbmCommerceCatalogCommandsSearchDisplayCmd } from 'integration/generated/transactions/data-contracts';
import { debounce } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

type Props = Parameters<SiteContentResource['findSuggestions']>;
type Query = Omit<Props[1], 'suggestType'> & {
	suggestType?: string[]; // Spec wrongly requires string, when it should be an array of strings, requiring this override
};

type SuggestionView = {
	identifier?: string;
	entry: EntryView[];
};
type EntryView = {
	label: string;
	href?: string;
};

type SearchDisplayResponse = ComIbmCommerceCatalogCommandsSearchDisplayCmd & {
	redirecturl?: string;
};

const dataMap = (data?: CommonSuggestions): SuggestionView[] =>
	data?.suggestionView
		?.map(({ identifier, entry }) => ({
			identifier,
			entry:
				entry?.map(({ fullPath, term, name, seo }: any) => ({
					label: fullPath || term || name,
					...(seo ? seo : {}),
				})) || [],
		}))
		.filter(({ entry }) => entry.length > 0) || [];

const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		query,
		params = {},
	}: {
		storeId: Props[0];
		query: Query;
		params: Props[2];
	}): Promise<ReturnType<SiteContentResource['findSuggestions']> | void> => {
		try {
			const data = await querySiteContentResource(pub).findSuggestions(
				storeId,
				query as Props[1],
				params
			);
			return data;
		} catch (error) {
			logError(context?.req, 'SearchNavigation: fetcher: error: %o', error);
		}
	};

const searchTermAssociationFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		searchTerm,
		params = {},
	}: {
		storeId: Props[0];
		searchTerm: string;
		params: Props[2];
	}): Promise<SearchDisplayResponse | undefined> => {
		try {
			const data = await transactionsSearchDisplay(pub).searchdisplayBySearchTermDetail(
				storeId,
				{ searchTerm },
				params
			);
			return data;
		} catch (error) {
			logError(context?.req, 'SearchNavigation: searchDisplayFetcher: error: %o', error);
		}
	};

const EMPTY_SUGGESTIONS = {};
export const useSearchNavigation = () => {
	const { settings } = useSettings();
	const { user } = useUser();
	const SearchLocalization = useLocalization('Routes').Search;
	const router = useNextRouter();
	const { query } = router;
	const params = useExtraRequestParameters();
	const filteredParams = useMemo(() => getProductListQueryParameters(query), [query]);
	const [searchValue, setSearchValue] = useState<string>(
		() => filteredParams.searchTerm?.toString().trim() || ''
	);
	const { storeId, langId } = getClientSideCommon(settings, router);

	const { data = EMPTY_SUGGESTIONS } = useSWR(
		storeId && searchValue !== ''
			? [
					{
						storeId,
						query: {
							langId,
							suggestType: ['Keyword', 'Category', 'Product', 'Brand', 'Seller'],
							term: searchValue,
							...getContractIdParamFromContext(user?.context),
						},
						params: {},
					},
			  ]
			: null,
		async ([props]) => fetcher(true)({ ...props, params }),
		{ use: [laggyMiddleWare] }
	);
	const suggest = useMemo(() => dataMap(data), [data]);

	const onSubmit = async ({ label, href }: EntryView) => {
		if (label.trim() === '') {
			return;
		}
		const data = await searchTermAssociationFetcher(true)({ storeId, searchTerm: label, params });
		const urlParts = data?.redirecturl?.split('?');
		if (urlParts?.at(0)) {
			router.push({ pathname: urlParts[0], query: urlParts[1] }, undefined, { shallow: false });
		} else {
			router.push(
				href
					? { pathname: href }
					: {
							pathname: `/${SearchLocalization.route.t()}`,
							query: { searchTerm: encodeURIComponent(label) },
					  },
				undefined,
				{
					shallow: false,
				}
			);
		}
	};

	/**
	 * @deprecated use onInputChange instead.
	 */
	const onChange = (newValue: string) => setSearchValue(newValue);

	const onInputChange = debounce((_, value) => setSearchValue(value), TYPE_AHEAD_DELAY);

	useEffect(() => {
		setSearchValue(filteredParams.searchTerm?.toString().trim() || '');
	}, [filteredParams.searchTerm]);

	return {
		suggest,
		searchValue,
		/** @deprecated use onInputChange instead. */
		onChange,
		onInputChange,
		onSubmit,
	};
};
