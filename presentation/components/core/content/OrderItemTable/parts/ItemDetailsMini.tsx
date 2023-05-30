/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import { ProductImage } from '@/components/blocks/ProductImage';
import { Linkable } from '@/components/blocks/Linkable';
import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { orderItemTableItemDetailsImageSX } from '@/components/content/OrderItemTable/styles/orderItemTableItemDetailsImage';
import { OrderItemUnitPrice } from '@/components/content/OrderItemTable/parts/UnitPrice';
import { ContentContext } from '@/data/context/content';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { OrderItemQuantity } from '@/components/content/OrderItemTable/parts/Quantity';
import { useLocalization } from '@/data/Localization';
import { orderItemTableItemDetailsMiniSX } from '@/components/content/OrderItemTable/styles/orderItemTableItemDetailsMini';

export const OrderItemItemDetailsMini: FC = () => {
	const { details } = useContext(ContentContext) as OrderItemTableRowData &
		ReturnType<typeof useOrderItemTableRow>;
	const { name, color, thumbnail, href, prices, loading } = details;
	const labels = useLocalization('OrderItemTable').Labels;

	if (loading) {
		return <ProgressIndicator />;
	}
	return (
		<Stack direction="row" alignItems="flex-start" spacing={2}>
			{thumbnail ? (
				// TODO Fix potential accessibility issue with img alt name being the same as adjacent link name
				<Linkable href={href}>
					<ProductImage
						{...{
							src: thumbnail,
							alt: labels.ProductThumbnail.t(),
							isThumbnail: true,
							sx: orderItemTableItemDetailsImageSX,
						}}
					/>
				</Linkable>
			) : null}
			<Stack direction="column" alignItems="flex-start" sx={orderItemTableItemDetailsMiniSX}>
				<Linkable href={href}>
					<Typography variant="h6" data-testid="orderItem-name" id="orderItem-name">
						{
							// TODO make translatable for left-to-right languages
							color ? `${name}, ${color}` : name
						}
					</Typography>
				</Linkable>
				{prices ? <OrderItemUnitPrice /> : null}
				<OrderItemQuantity />
			</Stack>
		</Stack>
	);
};
