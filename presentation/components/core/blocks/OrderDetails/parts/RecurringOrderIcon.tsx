/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { recurringOrderIconSvgParentSX } from '@/components/blocks/OrderDetails/styles/recurringOrderIconSvgParent';
import { recurringOrderIconTextSX } from '@/components/blocks/OrderDetails/styles/recurringOrderIconText';
import { useLocalization } from '@/data/Localization';
import { Repeat } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<Record<string, any>>;

/** @deprecated  see `OrderDetailsV2` */
export const OrderDetailsRecurringOrderIcon: FC<Props> = () => {
	const labels = useLocalization('Order');

	return (
		<Grid display="flex" flex="wrap" alignItems="center" py={2}>
			<Box sx={recurringOrderIconSvgParentSX}>
				<Repeat />
			</Box>
			<Box sx={recurringOrderIconTextSX}>
				<Typography variant="h6">{labels.RecurringOrder.t()}</Typography>
			</Box>
		</Grid>
	);
};
