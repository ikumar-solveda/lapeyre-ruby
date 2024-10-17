/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OrderPriceDisplay } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { orderItemTableV2PriceCellSX } from '@/components/content/OrderItemTableV2/styles/priceCell';
import { orderItemTableV2TableCellResponsiveContentSX } from '@/components/content/OrderItemTableV2/styles/tableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { OrderTableData, OrderTableMeta } from '@/data/types/OrderItemTableV2';
import { combineSX } from '@/utils/combineSX';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const OrderItemTableV2PriceCell: FC<
	CellContext<OrderTableData, OrderTableData['price']>
> = ({ getValue, table }) => {
	const { orderItemPrice = null, currency = '' } = getValue();
	const priceDisplayNLS = useLocalization('PriceDisplay');
	const localization = useLocalization('OrderItemTable');
	const { meta } = table.options;
	const { orderStatus } = (meta ?? {}) as OrderTableMeta;

	const price = Number(orderItemPrice);
	return (
		<TableCellResponsiveContent
			label={localization.Labels.Price.t()}
			sx={combineSX([orderItemTableV2TableCellResponsiveContentSX, orderItemTableV2PriceCellSX])}
		>
			<Typography data-testid="offer-price" id="offer-price">
				{orderItemPrice ? (
					<OrderPriceDisplay status={orderStatus as string} currency={currency} min={price} />
				) : (
					priceDisplayNLS.Labels.Pending.t()
				)}
			</Typography>
		</TableCellResponsiveContent>
	);
};
