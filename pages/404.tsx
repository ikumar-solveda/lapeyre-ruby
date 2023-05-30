/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { DEFAULT_PAGE_DATA } from '@/data/config/DEFAULTS';
import { getError404Page } from '@/data/containers/Error404Page';
import { useLocalization } from '@/data/Localization';
import { useEventTracker } from '@/data/EventTracker';
import { useStyleTheme } from '@/styles/theme';
import { StaticPageBlock } from '@/components/blocks/Page';

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
	const layout = getError404Page();
	const { theme, additives } = useStyleTheme();

	useEventTracker();

	return <StaticPageBlock meta={meta} layout={layout} theme={theme} additives={additives} />;
};

export default DefaultError404;
