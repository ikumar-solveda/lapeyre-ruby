/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { getProductListQueryParameters } from '@/data/utils/getProductListQueryParameters';
import { useEffect, useMemo, useState } from 'react';
import { useLocalization } from '@/data/Localization';
import useSWR from 'swr';
import { querySiteContentResource } from 'integration/generated/query';
import { SiteContentResource } from 'integration/generated/query/SiteContentResource';
import { CommonSuggestions } from 'integration/generated/query/data-contracts';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { debounce } from 'lodash';
import { TYPE_AHEAD_DELAY } from '@/data/config/TYPE_AHEAD_DELAY';
import { laggyMiddleWare } from '@/data/utils/laggyMiddleWare';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';

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
	(pub: boolean) =>
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
			console.log(error);
		}
	};

const EMPTY_SUGGESTIONS = {};
export const useSearchNavigation = () => {
	const { settings } = useSettings();
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
							suggestType: ['Keyword', 'Category', 'Brand', 'Seller'],
							term: searchValue,
						},
						params: {},
					},
			  ]
			: null,
		async ([props]) => fetcher(true)({ ...props, params }),
		{ use: [laggyMiddleWare] }
	);
	const suggest = useMemo(() => dataMap(data), [data]);

	const onSubmit = ({ label, href }: EntryView) => {
		if (label.trim() === '') {
			return;
		}
		router.push(
			href
				? { pathname: href }
				: {
						pathname: `/${SearchLocalization.route.t()}`,
						query: { searchTerm: encodeURIComponent(label) },
				  },
			undefined,
			{
				shallow: true,
			}
		);
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
