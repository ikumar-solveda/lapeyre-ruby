/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { OrderHistory } from '@/components/content/OrderHistory';
import { accountPersonalSX } from '@/components/content/Account/styles/personal';
import { useLocalization } from '@/data/Localization';
import { Paper, Stack, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

export const AccountRecentOrders: FC = () => {
	const AccountLabels = useLocalization('MyAccount');
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const RouteLocal = useLocalization('Routes');
	return (
		<Paper sx={accountPersonalSX}>
			<Stack spacing={contentSpacing}>
				<Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
					<Typography variant="h4" component="h3">
						{AccountLabels.RecentOrders.t()}
					</Typography>
					<Stack direction="row" spacing={1}>
						<Linkable
							type="button"
							href={`/${RouteLocal.OrderHistory.route.t()}`}
							variant="outlined"
						>
							{AccountLabels.ViewOrders.t()}
						</Linkable>
					</Stack>
				</Stack>
				<OrderHistory id="recentOrders" showTableOnly={true} showLimit={3} />
			</Stack>
		</Paper>
	);
};
