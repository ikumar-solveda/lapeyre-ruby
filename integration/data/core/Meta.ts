/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DEFAULT_META } from '@/data/config/DEFAULTS';
import { ParsedUrlQuery } from 'querystring';
import { getPageDataFromId, usePageDataFromId } from '@/data/_PageDataFromId';
import { GetServerSidePropsContext } from 'next';
import { Cache } from '@/data/types/Cache';

export type Meta = {
	title: string;
	description: string;
	keywords: string;
};

const dataMap = (contents: any): Meta =>
	[contents].reduce(
		(meta, item) => ({
			...meta,
			title: item?.page?.title || meta.title,
			description: item?.page?.metaDescription || meta.description,
			keywords: item?.page?.metaKeyword || meta.keywords,
		}),
		DEFAULT_META
	);

/**
 * No new data is needed, so just pass through data in case no other method has
 * loaded it yet in the server cache.
 */
export const getMeta = async (
	cache: Cache,
	path: ParsedUrlQuery['path'],
	context: GetServerSidePropsContext
) => await getPageDataFromId(cache, path, context);

export const useMeta = () => {
	const { data, error, loading } = usePageDataFromId();
	return {
		meta: data ? dataMap(data) : DEFAULT_META,
		loading,
		error,
	};
};
