/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PageBlock } from '@/components/blocks/Page';
import { useEventTracker } from '@/data/EventTracker';
import { useLayout } from '@/data/Layout';
import { useLocalization } from '@/data/Localization';
import { useMeta } from '@/data/Meta';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { useStyleTheme } from '@/styles/theme';
import { Typography } from '@mui/material';
import { FC, useEffect } from 'react';

export const Page: FC = () => {
	const { settings } = useSettings();
	const { meta } = useMeta();
	const { layout } = useLayout();
	const { theme, additives } = useStyleTheme();
	useEventTracker();
	const message = useLocalization('Header').StoreClosed;
	const { user } = useUser();
	const personalizationId = user?.context?.audit?.personalizationId ?? '';

	useEffect(() => {
		(window as any).HCLPersonalizationId = personalizationId;
	}, [personalizationId]);

	return settings.state === 'open' ? (
		<PageBlock meta={meta} layout={layout} theme={theme} additives={additives} />
	) : settings.state === 'closed' ? (
		<Typography variant="h4">{message.Msg.t({ store: settings?.storeName })}</Typography>
	) : null;
};
