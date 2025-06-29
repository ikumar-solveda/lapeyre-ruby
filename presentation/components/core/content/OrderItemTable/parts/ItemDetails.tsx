/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellProductImage } from '@/components/blocks/ProductImage';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { OrderItemAttributeDrawer } from '@/components/content/OrderItemTable/parts/AttributeDrawer';
import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { OrderItemUnitPrice } from '@/components/content/OrderItemTable/parts/UnitPrice';
import { orderItemTableItemDetailsImageSX } from '@/components/content/OrderItemTable/styles/orderItemTableItemDetailsImage';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const OrderItemItemDetails: FC = () => {
	const { details, freeGift } = useContext(ContentContext) as OrderItemTableRowData &
		ReturnType<typeof useOrderItemTableRow>;
	const { partNumber, name, color, thumbnail, href, prices, attributes, loading } = details;
	const labels = useLocalization('OrderItemTable').Labels;
	const freeGiftDescription = useLocalization('FreeGift').Label.t();
	if (loading) {
		return <ProgressIndicator />;
	}
	const nameShort = name.length > 20 ? name.substring(0, 20) + '...' : name;
	const partNumberShort = partNumber.length > 20 ? partNumber.substring(0, 20) + '...' : partNumber;
	return (
		<Stack direction="row" alignItems="flex-start" spacing={2}>
			{thumbnail ? (
				<Linkable href={href} id={href} data-testid={href}>
					<TableCellProductImage
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
				<Typography variant="h6" data-testid="orderItem-name" id="orderItem-name">
					<Linkable href={href} id={href} data-testid={href}>
						{color ? `${nameShort}, ${color}` : nameShort}
					</Linkable>
				</Typography>
				<Typography id="orderItem-partNumber" data-testid="orderItem-partNumber">
					{partNumberShort}
				</Typography>
				{prices ? <OrderItemUnitPrice /> : null}
				{attributes?.length ? <OrderItemAttributeDrawer attributes={attributes} /> : null}
				{freeGift ? <Typography variant="body1">{freeGiftDescription}</Typography> : null}
			</Stack>
		</Stack>
	);
};
