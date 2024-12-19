/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { orderItemTableV2QuantityCellSX } from '@/components/content/OrderItemTableV2/styles/quantityCell';
import { orderItemTableV2QuantityCellInputSX } from '@/components/content/OrderItemTableV2/styles/quantityCellInput';
import { orderItemTableV2TableCellResponsiveContentSX } from '@/components/content/OrderItemTableV2/styles/tableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { OrderTableData, OrderTableMeta } from '@/data/types/OrderItemTableV2';
import { combineSX } from '@/utils/combineSX';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { FC, useMemo } from 'react';

export const OrderItemTableV2QuantityCell: FC<
	CellContext<OrderTableData, OrderTableData['quantity']>
> = ({ getValue, row, table }) => {
	const { meta } = table.options;
	const { freeGift } = row.original;
	const { readonly = false } = (meta ?? {}) as OrderTableMeta;
	const { quantity, onChange, min = 1, isControlled = false } = getValue();
	const localization = useLocalization('OrderItemTable');

	const debouncedQuantityChange = useMemo(
		() =>
			debounce((updatedQuantity) => {
				if (
					updatedQuantity !== null &&
					updatedQuantity > 0 &&
					updatedQuantity !== Number(quantity)
				) {
					onChange(updatedQuantity);
				}
			}, 500),
		[onChange, quantity]
	);
	return (
		<TableCellResponsiveContent
			label={localization.Labels.Quantity.t()}
			sx={combineSX([orderItemTableV2TableCellResponsiveContentSX, orderItemTableV2QuantityCellSX])}
		>
			{readonly || freeGift ? (
				<Typography>{quantity}</Typography>
			) : (
				<NumberInput
					id={`${row.id}-quantity`}
					data-testid={`${row.id}-quantity`}
					onChange={debouncedQuantityChange}
					value={quantity}
					min={min}
					showControls
					disallowEmptyOnBlur={true}
					disabled={readonly}
					isControlled={isControlled}
					sx={orderItemTableV2QuantityCellInputSX(`${quantity}`.length)}
				/>
			)}
		</TableCellResponsiveContent>
	);
};
