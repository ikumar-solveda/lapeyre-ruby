/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { shippingMultiShipmentTableCheckboxSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/checkbox';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { useLocalization } from '@/data/Localization';
import { MULTIPLE_SHIPMENT_ID_PREFIX, ShippingTableData } from '@/data/constants/shipping';
import { ContentContext } from '@/data/context/content';
import { Checkbox, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { Dispatch, FC, SetStateAction, useCallback, useContext } from 'react';

export const ShippingMultiShipmentTableCheckbox: FC<CellContext<ShippingTableData, any>> = ({
	row,
}) => {
	const { orderItemId } = row.original;
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	const { setSelectedItemIds, selectedItemIds } = useContext(ContentContext) as ReturnType<
		typeof useCheckOut
	> &
		ReturnType<typeof useShipping> & {
			selectedItemIds: string[];
			setSelectedItemIds: Dispatch<SetStateAction<string[]>>;
		};
	const onCheckboxChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const itemId = event.target.value;
			const checked = event.target.checked;
			setSelectedItemIds((pre) => (checked ? [...pre, itemId] : pre.filter((i) => i !== itemId)));
		},
		[setSelectedItemIds]
	);

	return (
		<TableCellResponsiveContent
			label={
				<Typography variant="overline">{multipleShipmentTableNLS.Labels.Select.t()}</Typography>
			}
		>
			<Checkbox
				id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-select-item-${orderItemId}`}
				data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-select-item-${orderItemId}`}
				aria-label={orderItemId}
				checked={selectedItemIds.includes(orderItemId)}
				onChange={onCheckboxChange}
				value={orderItemId}
				sx={shippingMultiShipmentTableCheckboxSX}
			/>
		</TableCellResponsiveContent>
	);
};
