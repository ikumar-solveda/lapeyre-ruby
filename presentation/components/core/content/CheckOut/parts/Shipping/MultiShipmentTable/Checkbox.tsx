/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { shippingMultiShipmentTableCheckboxSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/checkbox';
import { shippingMultiShipmentTableColumnTitleSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/columnTitle';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { useLocalization } from '@/data/Localization';
import { MULTIPLE_SHIPMENT_ID_PREFIX } from '@/data/constants/shipping';
import { ContentContext } from '@/data/context/content';
import { Checkbox, Grid, Typography } from '@mui/material';
import { Dispatch, FC, SetStateAction, useCallback, useContext } from 'react';

export const ShippingMultiShipmentTableCheckbox: FC<{ value: { orderItemId: string } }> = ({
	value: { orderItemId },
}) => {
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
		<Grid container>
			<Grid item xs={6} sx={shippingMultiShipmentTableColumnTitleSX}>
				<Typography variant="overline">{multipleShipmentTableNLS.Labels.Select.t()}</Typography>
			</Grid>
			<Grid item xs={6} md={12}>
				<Checkbox
					id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-select-item-${orderItemId}`}
					data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-select-item-${orderItemId}`}
					aria-label={orderItemId}
					checked={selectedItemIds.includes(orderItemId)}
					onChange={onCheckboxChange}
					value={orderItemId}
					sx={shippingMultiShipmentTableCheckboxSX}
				/>
			</Grid>
		</Grid>
	);
};
