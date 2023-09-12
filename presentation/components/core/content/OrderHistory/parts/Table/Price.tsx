/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Typography } from '@mui/material';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { ContentContext } from '@/data/context/content';
import { dFix } from '@/utils/floatingPoint';
import { OrderOrderSummaryItem } from '@/data/Content/OrderHistory';
import { OrderHistoryContextValues } from '@/components/content/OrderHistory/parts/Table';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';

export const OrderHistoryTablePrice: FC = () => {
	const labels = useLocalization('Order');
	const { order } = useContext(ContentContext) as OrderHistoryContextValues & {
		order: OrderOrderSummaryItem;
	};
	return (
		<TableCellResponsiveContent
			label={<Typography variant="overline">{labels.TotalPrice.t()}</Typography>}
		>
			<Typography data-testid="order-grand-total" id="order-grand-total">
				<PriceDisplay currency={order?.grandTotalCurrency} min={dFix(`${order?.grandTotal}`)} />
			</Typography>
		</TableCellResponsiveContent>
	);
};
