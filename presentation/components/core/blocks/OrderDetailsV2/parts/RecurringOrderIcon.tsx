/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { orderDetailsV2RecurringOrderIconSvgParentSX } from '@/components/blocks/OrderDetailsV2/styles/recurringOrderIconSvgParent';
import { orderDetailsV2RecurringOrderIconTextSX } from '@/components/blocks/OrderDetailsV2/styles/recurringOrderIconText';
import { useLocalization } from '@/data/Localization';
import { Repeat } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<Record<string, any>>;

export const OrderDetailsV2RecurringOrderIcon: FC<Props> = () => {
	const labels = useLocalization('Order');

	return (
		<Grid display="flex" flex="wrap" alignItems="center" py={2}>
			<Box sx={orderDetailsV2RecurringOrderIconSvgParentSX}>
				<Repeat />
			</Box>
			<Box sx={orderDetailsV2RecurringOrderIconTextSX}>
				<Typography variant="h6">{labels.RecurringOrder.t()}</Typography>
			</Box>
		</Grid>
	);
};
