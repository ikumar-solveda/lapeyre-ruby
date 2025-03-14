/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */
import { RecurringOrdersTable } from '@/components/content/RecurringOrders/parts/Table';
import { useRecurringOrders } from '@/data/Content/RecurringOrders';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';

type RecurringOrdersProps = {
	id: ID;
	showTableOnly?: boolean;
	showLimit?: number;
	variant?: 'full' | 'compact' | 'auto';
};

export const RecurringOrders: FC<RecurringOrdersProps> = ({ showLimit, variant = 'auto' }) => {
	const { user } = useUser();
	const RecurringOrdersValues = useRecurringOrders(user?.userId as string);
	const localization = useLocalization('Order');

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = variant === 'auto' ? (isMobile ? 'compact' : 'full') : variant;

	return (
		<Stack spacing={2}>
			<Typography title={localization.RecurringOrders.t()} variant="pageTitle">
				{localization.RecurringOrders.t()}
			</Typography>
			<Paper>
				<Stack padding={2}>
					<ContentProvider value={{ view, ...RecurringOrdersValues }}>
						<Stack
							direction={{ xs: 'column', sm: 'row' }}
							justifyContent="space-between"
							spacing={2}
						></Stack>
						<RecurringOrdersTable showLimit={showLimit} />
					</ContentProvider>
				</Stack>
			</Paper>
		</Stack>
	);
};
