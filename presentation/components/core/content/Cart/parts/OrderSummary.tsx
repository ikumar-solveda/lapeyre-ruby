/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OrderPromotionsSummary } from '@/components/blocks/OrderPromotionsSummary';
import { OrderTotalSummary } from '@/components/blocks/OrderTotalSummary';
import { CartProfileSelection } from '@/components/content/Cart/parts/ProfileSelection';
import { summaryPaperSX } from '@/components/content/Cart/style';
import { Paper, Stack } from '@mui/material';
import { FC } from 'react';

export const CartOrderSummary: FC = () => (
	<Stack gap={3}>
		<Paper sx={summaryPaperSX}>
			<OrderTotalSummary />
		</Paper>
		<Paper sx={summaryPaperSX}>
			<CartProfileSelection />
		</Paper>
		<Paper sx={summaryPaperSX}>
			<OrderPromotionsSummary />
		</Paper>
	</Stack>
);
