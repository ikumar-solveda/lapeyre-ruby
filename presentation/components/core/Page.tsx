/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PageBlock } from '@/components/blocks/Page';
import { useEventTracker } from '@/data/EventTracker';
import { useLayout } from '@/data/Layout';
import { useMeta } from '@/data/Meta';
import { useStyleTheme } from '@/styles/theme';
import { FC } from 'react';

export const Page: FC = () => {
	const { meta } = useMeta();
	const { layout } = useLayout();
	const { theme, additives } = useStyleTheme();
	useEventTracker();

	return <PageBlock meta={meta} layout={layout} theme={theme} additives={additives} />;
};
