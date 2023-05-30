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
import { OrderItemAvailability } from '@/components/content/OrderItemTable/parts/Availability';
import { OrderItemQuantity } from '@/components/content/OrderItemTable/parts/Quantity';
import { OrderItemPrice } from '@/components/content/OrderItemTable/parts/Price';
import { ContentContext } from '@/data/context/content';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { useLocalization } from '@/data/Localization';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';

export const OrderItemItemDetailsCompact: FC<{
	readOnly?: boolean;
}> = ({ readOnly = false }) => {
	const orderItemTableNLS = useLocalization('OrderItemTable');
	const { details, price } = useContext(ContentContext) as OrderItemTableRowData &
		ReturnType<typeof useOrderItemTableRow>;
	const { partNumber, name, color, thumbnail, href, prices, attributes, loading } = details;

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
							alt: orderItemTableNLS.Labels.ProductThumbnail.t(),
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
				<Typography data-testid="orderItem-partNumber" id="orderItem-partNumber">
					{partNumber}
				</Typography>
				{prices ? <OrderItemUnitPrice /> : null}
				{attributes?.length ? <OrderItemAttributeDrawer attributes={attributes} /> : null}

				<Stack spacing={0.25}>
					<Stack direction="row" spacing={0.5} alignItems="top">
						<Typography
							variant="body2"
							data-testid="orderItem-availability"
							id="orderItem-availability"
						>
							{`${orderItemTableNLS.Labels.Availability.t()}:`}
						</Typography>
						<OrderItemAvailability />
					</Stack>
					{readOnly ? (
						<Stack direction="row" spacing={0.5} alignItems="center">
							<Typography
								variant="body2"
								component="span"
								data-testid="orderItem-quantity"
								id="orderItem-quantity"
							>
								{`${orderItemTableNLS.Labels.Quantity.t()}:`}
							</Typography>
							<OrderItemQuantity readOnly={readOnly} />
						</Stack>
					) : (
						<OrderItemQuantity />
					)}
					{price ? (
						<Stack direction="row" spacing={0.5} alignItems="center">
							<Typography variant="body2" data-testid="orderItem-price" id="orderItem-price">
								{`${orderItemTableNLS.Labels.Price.t()}:`}
							</Typography>
							<OrderItemPrice />
						</Stack>
					) : null}
				</Stack>
			</Stack>
		</Stack>
	);
};
