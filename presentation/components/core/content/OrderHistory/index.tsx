/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';
import { Paper, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import { FC } from 'react';
import { useLocalization } from '@/data/Localization';
import { OrderHistoryTable } from '@/components/content/OrderHistory/parts/Table';
import { ContentProvider } from '@/data/context/content';
import { useOrderHistory } from '@/data/Content/OrderHistory';
import { OrderHistoryOrderSearch } from '@/components/content/OrderHistory/parts/OrderSearch';
import { OrderHistoryFilter } from '@/components/content/OrderHistory/parts/Filter';

type OrderHistoryProps = {
	id: ID;
	showTableOnly?: boolean;
	showLimit?: number;
	variant?: 'full' | 'compact' | 'auto';
};

export const OrderHistory: FC<OrderHistoryProps> = ({
	showTableOnly = false,
	showLimit,
	variant = 'auto',
}) => {
	const orderHistoryValues = useOrderHistory();
	const localization = useLocalization('Order');

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = variant === 'auto' ? (isMobile ? 'compact' : 'full') : variant;

	return showTableOnly ? (
		<ContentProvider value={{ view, ...orderHistoryValues }}>
			<OrderHistoryTable showLimit={showLimit} />
		</ContentProvider>
	) : (
		<Stack spacing={2}>
			<Typography variant="h3">{localization.OrderHistory.t()}</Typography>
			<Paper>
				<Stack padding={2}>
					<ContentProvider value={{ view, ...orderHistoryValues }}>
						<Stack
							direction={{ xs: 'column', sm: 'row' }}
							justifyContent="space-between"
							spacing={2}
						>
							<OrderHistoryFilter />
							<OrderHistoryOrderSearch />
						</Stack>
						<OrderHistoryTable showLimit={showLimit} />
					</ContentProvider>
				</Stack>
			</Paper>
		</Stack>
	);
};
