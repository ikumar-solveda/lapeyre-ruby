/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Typography } from '@mui/material';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { OrderHistoryTableRowValueType } from '@/components/content/OrderHistory/parts/Table';

export const OrderHistoryTableStatus: FC = () => {
	const labels = useLocalization('Order');
	const { order } = useContext(ContentContext) as OrderHistoryTableRowValueType;
	const statusText = `Status_${order?.orderStatus}` as keyof typeof labels;
	return (
		<Typography id="order-status" data-testid="order-status">
			{labels[statusText].t(undefined as any)}
		</Typography>
	);
};
