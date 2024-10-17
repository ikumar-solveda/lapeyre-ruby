/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PriceDisplayBase } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { OrderHistoryContextValues } from '@/components/content/OrderHistory/parts/Table';
import { OrderOrderSummaryItem } from '@/data/Content/OrderHistory';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/utils/floatingPoint';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const OrderHistoryTablePrice: FC = () => {
	const labels = useLocalization('Order');
	const { order } = useContext(ContentContext) as OrderHistoryContextValues & {
		order: OrderOrderSummaryItem;
	};
	return (
		<TableCellResponsiveContent label={labels.TotalPrice.t()}>
			<Typography data-testid="order-grand-total" id="order-grand-total">
				{order ? (
					<PriceDisplayBase
						currency={order.grandTotalCurrency as string}
						min={dFix(`${order.grandTotal}`)}
					/>
				) : null}
			</Typography>
		</TableCellResponsiveContent>
	);
};
