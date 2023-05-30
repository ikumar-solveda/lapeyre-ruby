/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { useMeta } from '@/data/Meta';
import { useLayout } from '@/data/Layout';
import { useStyleTheme } from '@/styles/theme';
import { useEventTracker } from '@/data/EventTracker';
import { PageBlock } from '@/components/blocks/Page';

export const Page: FC = () => {
	const { meta } = useMeta();
	const { layout } = useLayout();
	const { theme, additives } = useStyleTheme();
	useEventTracker();

	return <PageBlock meta={meta} layout={layout} theme={theme} additives={additives} />;
};
