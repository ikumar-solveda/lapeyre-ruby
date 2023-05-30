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
import { OrderItemAttributeDrawer } from '@/components/content/OrderItemTable/parts/AttributeDrawer';
import { ContentContext } from '@/data/context/content';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useLocalization } from '@/data/Localization';

export const OrderItemItemDetails: FC = () => {
	const { details } = useContext(ContentContext) as OrderItemTableRowData &
		ReturnType<typeof useOrderItemTableRow>;
	const { partNumber, name, color, thumbnail, href, prices, attributes, loading } = details;
	const labels = useLocalization('OrderItemTable').Labels;
	if (loading) {
		return <ProgressIndicator />;
	}
	return (
		<Stack direction="row" alignItems="flex-start" spacing={2}>
			{thumbnail ? (
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
			<Stack direction="column" alignItems="flex-start">
				<Linkable href={href}>
					<Typography variant="h6" data-testid="orderItem-name" id="orderItem-name">
						{color ? `${name}, ${color}` : name}
					</Typography>
				</Linkable>
				<Typography id="orderItem-partNumber" data-testid="orderItem-partNumber">
					{partNumber}
				</Typography>
				{prices ? <OrderItemUnitPrice /> : null}
				{attributes?.length ? <OrderItemAttributeDrawer attributes={attributes} /> : null}
			</Stack>
		</Stack>
	);
};
