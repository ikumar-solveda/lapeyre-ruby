/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { inProgressOrderDetailsTableQuantityCellInputSX } from '@/components/content/InProgressOrderDetails/styles/Table/quantityCellInput';
import { AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE } from '@/data/constants/inProgressOrders';
import { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { OrderItem } from '@/data/types/Order';
import { dFix } from '@/utils/floatingPoint';
import type { CellContext } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { useContext, useMemo, type FC } from 'react';

export const InProgressOrderDetailsTableQuantityCell: FC<CellContext<OrderItem, unknown>> = ({
	row,
}) => {
	const inProgressOrdersTableNLS = useLocalization('InProgressOrderDetails');
	const { onOrderItemQuantityChange } = useContext(ContentContext) as ReturnType<
		typeof useInProgressOrderDetails
	>;
	const { orderItemId, quantity } = row.original;
	const debouncedQuantityChange = useMemo(
		() =>
			debounce((value) => {
				if (value !== null && value > 0 && value !== dFix(quantity)) {
					onOrderItemQuantityChange(orderItemId, `${value}`);
				}
			}, 500),
		[onOrderItemQuantityChange, orderItemId, quantity]
	);

	return (
		<TableCellResponsiveContent label={inProgressOrdersTableNLS.Table.quantity.t()}>
			<NumberInput
				id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-${row.id}-quantity`}
				data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-${row.id}-quantity`}
				onChange={debouncedQuantityChange}
				value={quantity}
				min={1}
				showControls
				disallowEmptyOnBlur={true}
				disabled={!row.getCanSelect()}
				isControlled={true}
				sx={inProgressOrderDetailsTableQuantityCellInputSX(`${quantity}`.length)}
			/>
		</TableCellResponsiveContent>
	);
};
