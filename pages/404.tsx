/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useEventTracker } from '@/data/EventTracker';
import { useLocalization } from '@/data/Localization';
import { DEFAULT_PAGE_DATA } from '@/data/config/DEFAULTS';
import ErrorPage from 'next/error';
import { FC } from 'react';

const DefaultError404: FC = () => {
	const Error404Route = useLocalization('Routes').Error404;
	const meta = {
		title: Error404Route.title?.t() ? Error404Route.title?.t() : DEFAULT_PAGE_DATA.page.title,
		description: Error404Route.description?.t()
			? Error404Route.description?.t()
			: DEFAULT_PAGE_DATA.page.metaDescription,
		keywords: Error404Route.keywords?.t()
			? Error404Route.keywords?.t()
			: DEFAULT_PAGE_DATA.page.metaKeyword,
	};
	useEventTracker();

	/**
	 * To use a custom static page with layouts, uncomment the block below
	 */
	/*
	const layout = getError404Page();
	const { theme, additives } = useStyleTheme();
	return <StaticPageBlock meta={meta} layout={layout} theme={theme} additives={additives} />;
	*/

	// just use built-in error page with 404 error code and our internal title
	return <ErrorPage statusCode={404} title={meta.title} />;
};

export default DefaultError404;
