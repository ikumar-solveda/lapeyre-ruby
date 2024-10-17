/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getSettings, useSettings } from '@/data/Settings';
import { getPageDataFromId, usePageDataFromId } from '@/data/_PageDataFromId';
import { DEFAULT_LAYOUT } from '@/data/config/DEFAULTS';
import { EventsContext } from '@/data/context/events';
import { Cache } from '@/data/types/Cache';
import { ContainerLayout } from '@/data/types/ContainerLayout';
import { Layout } from '@/data/types/Layout';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { encodeRedirectPath } from '@/data/utils/encodeRedirectPath';
import { getNormalizedLayout } from '@/data/utils/getNormalizedLayout';
import { getServerSideRedirectPrefix } from '@/data/utils/getServerSideRedirectPrefix';
import { postPreviewMessage } from '@/data/utils/postPreviewMessage';
import { isEqual } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useContext, useEffect, useMemo, useRef } from 'react';

type ProcessedLayout = {
	value?: PageDataFromId;
	processed: Layout;
	redirect?: string;
	permanent?: boolean;
};
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
	const redirectPrefix = getServerSideRedirectPrefix({
		contextLocale: context.locale,
		storeUrlKeyword: urlKeywordName,
	});
	const redirect = encodeRedirectPath(page?.page?.redirect ?? '');
	return redirect
		? {
				redirect: `${redirectPrefix}/${redirect}`,
				value: undefined,
				processed: DEFAULT_LAYOUT,
				permanent: page?.page?.permanent ?? false,
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

	const layout = useMemo(() => dataMap(data), [data]);

	return {
		layout,
		loading,
		error,
	};
};
