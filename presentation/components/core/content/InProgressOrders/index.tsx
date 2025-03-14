/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { InProgressOrdersCreateNewOrder } from '@/components/content/InProgressOrders/parts/CreateNewOrder';
import { InProgressOrdersDialog } from '@/components/content/InProgressOrders/parts/Dialog';
import { InProgressOrdersTable } from '@/components/content/InProgressOrders/parts/Table';
import { InProgressOrdersTableSearch } from '@/components/content/InProgressOrders/parts/Table/Search';
import { InProgressOrdersTitle } from '@/components/content/InProgressOrders/parts/Title';
import { inProgressOrdersPaperStack } from '@/components/content/InProgressOrders/styles/paperStack';
import { inProgressOrdersSearchAndCreateNewOrderStack } from '@/components/content/InProgressOrders/styles/searchAndCreateNewOrderStack';
import { useCart } from '@/data/Content/Cart';
import { useInProgressOrders } from '@/data/Content/InProgressOrders';
import { ContentProvider } from '@/data/context/content';
import type { ID } from '@/data/types/Basic';
import type { InProgressOrdersContextValues } from '@/data/types/InProgressOrders';
import { Paper, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type FC, useMemo } from 'react';

type InProgressOrderProps = {
	id: ID;
	variant?: 'full' | 'compact' | 'auto';
};

export const InProgressOrders: FC<InProgressOrderProps> = ({ variant = 'auto' }) => {
	const inProgressOrdersData = useInProgressOrders();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const view = variant === 'auto' ? (isMobile ? 'compact' : 'full') : variant;
	const cartData = useCart();
	const contextValue: InProgressOrdersContextValues = useMemo(
		() => ({ view, cartData, ...inProgressOrdersData }),
		[view, cartData, inProgressOrdersData]
	);

	return (
		<ContentProvider value={contextValue}>
			<InProgressOrdersTitle />
			<Paper>
				<Stack {...inProgressOrdersSearchAndCreateNewOrderStack}>
					<InProgressOrdersTableSearch />
					{isMobile ? null : <InProgressOrdersCreateNewOrder />}
				</Stack>
				<Stack {...inProgressOrdersPaperStack}>
					<InProgressOrdersTable />
				</Stack>
			</Paper>
			<InProgressOrdersDialog />
		</ContentProvider>
	);
};
