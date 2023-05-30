/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { shippingMultiShipmentTableHeaderCheckboxSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/headerCheckbox';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { useLocalization } from '@/data/Localization';
import { MULTIPLE_SHIPMENT_ID_PREFIX } from '@/data/constants/shipping';
import { ContentContext } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { Checkbox } from '@mui/material';
import { Dispatch, FC, SetStateAction, useCallback, useContext, useMemo } from 'react';

export const ShippingMultiShipmentTableHeaderCheckbox: FC = () => {
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	const { orderItems, setSelectedItemIds, selectedItemIds } = useContext(
		ContentContext
	) as ReturnType<typeof useCheckOut> &
		ReturnType<typeof useShipping> & {
			selectedItemIds: string[];
			setSelectedItemIds: Dispatch<SetStateAction<string[]>>;
		};
	const itemIds = useMemo(
		() => (orderItems ?? ([] as OrderItem[])).map(({ orderItemId }) => orderItemId),
		[orderItems]
	);
	const onHeaderCheckboxChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const checked = event.target.checked;
			setSelectedItemIds(checked ? [...itemIds] : []);
		},
		[itemIds, setSelectedItemIds]
	);
	return (
		<Checkbox
			id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-select-all`}
			data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-select-all`}
			aria-label={multipleShipmentTableNLS.Labels.SelectAll.t()}
			onChange={onHeaderCheckboxChange}
			checked={selectedItemIds.length === itemIds.length}
			indeterminate={selectedItemIds.length < itemIds.length ? selectedItemIds.length > 0 : false}
			value="select-all"
			sx={shippingMultiShipmentTableHeaderCheckboxSX}
		/>
	);
};
