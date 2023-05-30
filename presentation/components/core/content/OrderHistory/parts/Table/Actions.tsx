/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Linkable } from '@/components/blocks/Linkable';
import { ArrowForwardIos } from '@mui/icons-material';
import { useLocalization } from '@/data/Localization';
import { Box, Tooltip } from '@mui/material';
import { OrderHistoryTableRowValueType } from '@/components/content/OrderHistory/parts/Table';
import { ContentContext } from '@/data/context/content';

export const OrderHistoryTableOrderActions: FC = () => {
	const labels = useLocalization('Order');
	const routes = useLocalization('Routes');
	const { order } = useContext(ContentContext) as OrderHistoryTableRowValueType;
	return (
		<Linkable
			href={{ pathname: routes.OrderDetails.route.t(), query: { orderId: order?.orderId } }}
		>
			<Tooltip title={labels.OrderDetails.t()}>
				<Box>
					<ArrowForwardIos color="primary" />
				</Box>
			</Tooltip>
		</Linkable>
	);
};
