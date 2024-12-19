/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { useNextRouter } from '@/data/Content/_NextRouter';
import { getSettings, useSettings } from '@/data/Settings';
import { Cache } from '@/data/types/Cache';
import { Country, CountryStates } from '@/data/types/CountryState';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import transactionsCountry from 'integration/generated/transactions/transactionsCountry';
import { GetServerSidePropsContext } from 'next';
import useSWR, { unstable_serialize } from 'swr';

export const DATA_KEY = 'Country';

const dataMap = (countryStates: CountryStates) => countryStates.countries ?? [];

export const fetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string;
		} = {}
	) =>
		dataMap(await transactionsCountry(pub).countryFindCountryStateList(storeId, query));

export const getCountry = async (
	cache: Cache,
	context: GetServerSidePropsContext
): Promise<Country[]> => {
	const settings = await getSettings(cache, context);
	const { storeId, langId } = getServerSideCommon(settings, context);
	const props = { storeId, query: { langId } };
	const key = unstable_serialize([shrink(props), DATA_KEY]);
	const cacheScope = { requestScope: false };
	const value = cache.get(key, cacheScope) ?? fetcher(false)(props.storeId, props.query);
	cache.set(key, value, cacheScope);
	return await value;
};

const EMPTY_LIST: Country[] = [];
export const useCountry = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { data = EMPTY_LIST, error } = useSWR(
		storeId ? [shrink({ storeId, query: { langId } }), DATA_KEY] : null,
		async ([props]) => {
			const expanded = expand<Record<string, any>>(props);
			const { storeId, query } = expanded;
			return fetcher(true)(storeId, query);
		}
	);
	return {
		countries: data,
		loading: !error && !data,
		error,
	};
};
