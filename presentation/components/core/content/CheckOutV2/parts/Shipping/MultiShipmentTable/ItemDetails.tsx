/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellProductImage } from '@/components/blocks/ProductImage';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { checkOutV2ShippingMultiShipmentItemDetailsSX } from '@/components/content/CheckOutV2/styles/Shipping/multiShipmentTable/itemDetails';
import { OrderItemAttributeDrawer } from '@/components/content/OrderItemTable/parts/AttributeDrawer';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTableRow';
import { useLocalization } from '@/data/Localization';
import { ShippingTableData } from '@/data/constants/shipping';
import { Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const CheckOutV2ShippingMultiShipmentTableItemDetails: FC<
	CellContext<ShippingTableData, { partNumber: string; contractId?: string }>
> = ({ getValue }) => {
	const { partNumber, contractId } = getValue();
	const { details } = useOrderItemTableRow(partNumber, contractId);
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	const { name, color, thumbnail, href, attributes, loading } = details;
	const labels = useLocalization('OrderItemTable').Labels;
	if (loading) {
		return <ProgressIndicator />;
	}
	return (
		<TableCellResponsiveContent
			label={
				<Typography variant="overline">
					{multipleShipmentTableNLS.Labels.ItemDetails.t()}
				</Typography>
			}
		>
			<Stack direction={{ xs: 'column', md: 'row' }} alignItems="flex-start" spacing={2}>
				{thumbnail ? (
					<Linkable href={href} id={href} data-testid={href}>
						<TableCellProductImage
							{...{
								src: thumbnail,
								alt: labels.ProductThumbnail.t(),
								isThumbnail: true,
								sx: checkOutV2ShippingMultiShipmentItemDetailsSX,
							}}
						/>
					</Linkable>
				) : null}
				<Stack direction="column" alignItems="flex-start">
					<Linkable href={href} id={href} data-testid={href}>
						<Typography variant="h6" data-testid="orderItem-name" id="orderItem-name">
							{color ? `${name}, ${color}` : name}
						</Typography>
					</Linkable>
					<Typography id="orderItem-partNumber" data-testid="orderItem-partNumber">
						{partNumber}
					</Typography>
					{attributes?.length ? <OrderItemAttributeDrawer attributes={attributes} /> : null}
				</Stack>
			</Stack>
		</TableCellResponsiveContent>
	);
};
