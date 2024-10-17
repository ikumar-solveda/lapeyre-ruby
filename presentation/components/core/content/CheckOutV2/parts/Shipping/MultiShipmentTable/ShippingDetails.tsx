/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { checkOutV2ShippingMultiShipmentShippingDetailsSX } from '@/components/content/CheckOutV2/styles/Shipping/multiShipmentTable/shippingDetails';
import { checkOutV2ShippingMultiShipmentTableTypographySX } from '@/components/content/CheckOutV2/styles/Shipping/multiShipmentTable/typography';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { useShipping } from '@/data/Content/Shipping';
import { useLocalization } from '@/data/Localization';
import { MULTIPLE_SHIPMENT_ID_PREFIX, ShippingTableData } from '@/data/constants/shipping';
import { ContentContext } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { ShippingTablePrintableAttrs, makePrintable } from '@/utils/address';
import { Edit } from '@mui/icons-material';
import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useCallback, useContext, useMemo } from 'react';

export const CheckOutV2ShippingMultiShipmentTableItemShippingDetails: FC<
	CellContext<ShippingTableData, { item: OrderItem }>
> = ({ getValue }) => {
	const { item } = getValue();
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	const { isSelectedShippingValid, setSelectedItems } = useContext(ContentContext) as ReturnType<
		typeof useCheckOutV2
	> &
		ReturnType<typeof useShipping>;
	const addressData = useMemo(() => makePrintable(item), [item]);
	const onClick = useCallback(() => setSelectedItems([item]), [item, setSelectedItems]);
	const valid = useMemo(() => isSelectedShippingValid(item), [isSelectedShippingValid, item]);
	const { availability } = useInventoryV2({ partNumber: item?.partNumber });
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
			<Stack direction="row" sx={checkOutV2ShippingMultiShipmentShippingDetailsSX} spacing={1}>
				{valid ? (
					<>
						<Stack>
							<Typography gutterBottom>{item.shipModeDescription}</Typography>
							{ShippingTablePrintableAttrs.map((attr) => (addressData as any)[attr])
								.filter(Boolean)
								.map((line: string | string[], index: number) => (
									<Typography sx={checkOutV2ShippingMultiShipmentTableTypographySX} key={index}>
										{[line].flat(1).join(' ')}
									</Typography>
								))}
						</Stack>
						<Stack>
							<Tooltip title={multipleShipmentTableNLS.Labels.ChangeSelection.t()}>
								<IconButton
									id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-change-address-method-${item.orderItemId}`}
									data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-change-address-method-${item.orderItemId}`}
									aria-label={multipleShipmentTableNLS.Labels.ChangeSelection.t()}
									onClick={onClick}
									color="primary"
								>
									<Edit />
								</IconButton>
							</Tooltip>
						</Stack>
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
