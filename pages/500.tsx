/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { DEFAULT_ERROR_META } from '@/data/config/DEFAULTS';
import { getError500Page } from '@/data/containers/Error500Page';
import { useLocalization } from '@/data/Localization';
import { useEventTracker } from '@/data/EventTracker';
import { useStyleTheme } from '@/styles/theme';
import { StaticPageBlock } from '@/components/blocks/Page';

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
	const layout = getError500Page();
	const { theme, additives } = useStyleTheme();

	useEventTracker();

	return <StaticPageBlock meta={meta} layout={layout} theme={theme} additives={additives} />;
};

export default DefaultError500;
