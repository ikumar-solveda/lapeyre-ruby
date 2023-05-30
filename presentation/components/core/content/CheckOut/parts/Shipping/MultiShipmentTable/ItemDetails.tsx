/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { ProductImage } from '@/components/blocks/ProductImage';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { shippingMultiShipmentTableColumnTitleSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/columnTitle';
import { shippingMultiShipmentItemDetailsSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/itemDetails';
import { OrderItemAttributeDrawer } from '@/components/content/OrderItemTable/parts/AttributeDrawer';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { useLocalization } from '@/data/Localization';
import { Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const ShippingMultiShipmentTableItemDetails: FC<{ value: { partNumber: string } }> = ({
	value: { partNumber },
}) => {
	const { details } = useOrderItemTableRow(partNumber);
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	const { name, color, thumbnail, href, attributes, loading } = details;
	const labels = useLocalization('OrderItemTable').Labels;
	if (loading) {
		return <ProgressIndicator />;
	}
	return (
		<Grid container>
			<Grid item xs={6} sx={shippingMultiShipmentTableColumnTitleSX}>
				<Typography variant="overline">
					{multipleShipmentTableNLS.Labels.ItemDetails.t()}
				</Typography>
			</Grid>
			<Grid item xs={6} md={12}>
				<Stack direction={{ xs: 'column', md: 'row' }} alignItems="flex-start" spacing={2}>
					{thumbnail ? (
						<Linkable href={href}>
							<ProductImage
								{...{
									src: thumbnail,
									alt: labels.ProductThumbnail.t(),
									isThumbnail: true,
									sx: shippingMultiShipmentItemDetailsSX,
								}}
							/>
						</Linkable>
					) : null}
					<Stack direction="column" alignItems="flex-start">
						<Linkable href={href}>
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
			</Grid>
		</Grid>
	);
};
