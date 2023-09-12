/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useEventTracker } from '@/data/EventTracker';
import { useLocalization } from '@/data/Localization';
import { DEFAULT_ERROR_META } from '@/data/config/DEFAULTS';
import ErrorPage from 'next/error';
import { FC } from 'react';

const DefaultError500: FC = () => {
	const Error500Route = useLocalization('Routes').Error500;
	const meta = {
		title: Error500Route.title?.t() ? Error500Route.title?.t() : DEFAULT_ERROR_META.title,
		description: Error500Route.description?.t()
			? Error500Route.description?.t()
			: DEFAULT_ERROR_META.description,
		keywords: Error500Route.keywords?.t()
			? Error500Route.keywords?.t()
			: DEFAULT_ERROR_META.keywords,
	};
	useEventTracker();

	/**
	 * To use a custom static page with layouts, uncomment the block below
	 */
	/*
	const layout = getError500Page();
	const { theme, additives } = useStyleTheme();
	return <StaticPageBlock meta={meta} layout={layout} theme={theme} additives={additives} />;
	*/

	// just use built-in error page with 500 error code and our internal title
	return <ErrorPage statusCode={500} title={meta.title} />;
};

export default DefaultError500;
