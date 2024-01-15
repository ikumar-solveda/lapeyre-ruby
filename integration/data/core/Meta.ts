/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getStoreURLKeyword } from '@/data/StoreURLKeyword-Server';
import { getPageDataFromId, usePageDataFromId } from '@/data/_PageDataFromId';
import { Cache } from '@/data/types/Cache';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

export type Meta = {
	title: string;
	description: string;
	keywords: string;
	canonical?: string;
};
/**
 * No new data is needed, so just pass through data in case no other method has
 * loaded it yet in the server cache.
 */
export const getMeta = async (
	cache: Cache,
	path: ParsedUrlQuery['path'],
	context: GetServerSidePropsContext
) => {
	await getPageDataFromId(cache, path, context);
	await getStoreURLKeyword(cache, context);
};
export const useMeta = () => {
	const { meta, error, loading } = usePageDataFromId();
	return {
		meta,
		loading,
		error,
	};
};
