/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { shippingMultiShipmentShippingDetailsSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/shippingDetails';
import { shippingMultiShipmentTableTypographySX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/typography';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { useInventory } from '@/data/Content/_Inventory';
import { useLocalization } from '@/data/Localization';
import { MULTIPLE_SHIPMENT_ID_PREFIX, ShippingTableData } from '@/data/constants/shipping';
import { ContentContext } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { ShippingTablePrintableAttrs, makePrintable } from '@/utils/address';
import { Edit } from '@mui/icons-material';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useCallback, useContext, useMemo } from 'react';

export const ShippingMultiShipmentTableItemShippingDetails: FC<
	CellContext<ShippingTableData, { item: OrderItem }>
> = ({ getValue }) => {
	const { item } = getValue();
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	const { isSelectedShippingValid, setSelectedItems } = useContext(ContentContext) as ReturnType<
		typeof useCheckOut
	> &
		ReturnType<typeof useShipping>;
	const addressData = useMemo(() => makePrintable(item), [item]);
	const onClick = useCallback(() => setSelectedItems([item]), [item, setSelectedItems]);
	const valid = useMemo(() => isSelectedShippingValid(item), [isSelectedShippingValid, item]);
	const { availability } = useInventory(item?.partNumber);
	const onlineAvailability = availability?.find((a) => a.status);
	const isAvailable = onlineAvailability?.status;

	return (
		<TableCellResponsiveContent
			label={
				<Typography variant="overline">
					{multipleShipmentTableNLS.Labels.ShippingDetails.t()}
				</Typography>
			}
		>
			<Stack direction="row" sx={shippingMultiShipmentShippingDetailsSX}>
				{valid ? (
					<>
						<Stack>
							<Typography gutterBottom>{item.shipModeDescription}</Typography>
							{ShippingTablePrintableAttrs.map((attr) => (addressData as any)[attr])
								.filter(Boolean)
								.map((line: string | string[], index: number) => (
									<Typography sx={shippingMultiShipmentTableTypographySX} key={index}>
										{[line].flat(1).join(' ')}
									</Typography>
								))}
						</Stack>
						<Tooltip title={multipleShipmentTableNLS.Labels.ChangeSelection.t()}>
							<Button
								id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-change-address-method-${item.orderItemId}`}
								data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-change-address-method-${item.orderItemId}`}
								aria-label={multipleShipmentTableNLS.Labels.ChangeSelection.t()}
								variant="text"
								onClick={onClick}
								startIcon={<Edit />}
							></Button>
						</Tooltip>
					</>
				) : (
					<Stack>
						<Button
							id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-select-address-method-${item.orderItemId}`}
							data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-select-address-method-${item.orderItemId}`}
							aria-label={multipleShipmentTableNLS.Labels.SelectShippingAddressAndMethod.t()}
							variant="text"
							onClick={onClick}
							startIcon={<Edit />}
							disabled={!isAvailable}
						>
							{multipleShipmentTableNLS.Labels.SelectShippingAddressAndMethod.t()}
						</Button>
						{!isAvailable ? (
							<Typography variant="overline">
								{multipleShipmentTableNLS.Labels.OutOfStock.t()}
							</Typography>
						) : null}
					</Stack>
				)}
			</Stack>
		</TableCellResponsiveContent>
	);
};
