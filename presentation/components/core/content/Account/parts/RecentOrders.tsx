/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { accountPersonalSX } from '@/components/content/Account/styles/personal';
import { accountStack } from '@/components/content/Account/styles/stack';
import { OrderHistory } from '@/components/content/OrderHistory';
import { useLocalization } from '@/data/Localization';
import { Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
				<Stack {...accountStack}>
					<Typography variant="h4" component="h3">
						{AccountLabels.RecentOrders.t()}
					</Typography>
					<Stack direction="row" spacing={1}>
						<Linkable
							type="button"
							href={`/${RouteLocal.OrderHistory.route.t()}`}
							variant="outlined"
							data-testid="button-my-account-view-orders"
							id="button-my-account-view-orders"
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
