/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DEFAULT_LAYOUT } from '@/data/config/DEFAULTS';
import { ParsedUrlQuery } from 'querystring';
import { Layout } from '@/data/types/Layout';
import { getNormalizedLayout } from '@/data/utils/getNormalizedLayout';
import { getPageDataFromId, usePageDataFromId } from '@/data/_PageDataFromId';
import { GetServerSidePropsContext } from 'next';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { Cache } from '@/data/types/Cache';
import { useContext, useEffect, useRef } from 'react';
import { EventsContext } from '@/data/context/events';
import { ContainerLayout } from '@/data/types/ContainerLayout';
import { isEqual } from 'lodash';
import { getSettings, useSettings } from '@/data/Settings';
import { postPreviewMessage } from '@/data/utils/postPreviewMessage';

type ProcessedLayout = { value?: PageDataFromId; processed: Layout; redirect?: string };
type GetLayoutReturn = Promise<ProcessedLayout>;

const dataMap = (contents: any): Layout =>
	(contents ? [contents] : []).reduce(
		(layout, item) => ({
			...layout,
			...getNormalizedLayout(item),
		}),
		DEFAULT_LAYOUT
	);

export const getLayout = async (
	cache: Cache,
	path: ParsedUrlQuery['path'],
	context: GetServerSidePropsContext
): GetLayoutReturn => {
	const page = await getPageDataFromId(cache, path, context);
	const { storeToken: { urlKeywordName } = {} } = await getSettings(cache, context);
	const redirect = page?.page?.redirect;
	return redirect
		? {
				redirect: urlKeywordName ? `/${urlKeywordName}${redirect}` : redirect,
				value: undefined,
				processed: DEFAULT_LAYOUT,
		  }
		: {
				value: page,
				processed: dataMap(page),
		  };
};

export const useLayout = () => {
	const { settings } = useSettings();
	const { data, error, loading } = usePageDataFromId();
	const { onPageView } = useContext(EventsContext);
	const layoutRef = useRef<ContainerLayout>();
	const { inPreview } = settings;
	useEffect(() => {
		if (inPreview && data?.layout && !isEqual(layoutRef.current, data)) {
			postPreviewMessage({
				message: {
					data: { ...data },
					action: 'PREVIEW_LAYOUT_INITIALIZED',
				},
			});
			layoutRef.current = data;
		}
	}, [data, inPreview]);

	useEffect(() => data && onPageView(data.page), [onPageView, data]);

	return {
		layout: dataMap(data),
		loading,
		error,
	};
};
