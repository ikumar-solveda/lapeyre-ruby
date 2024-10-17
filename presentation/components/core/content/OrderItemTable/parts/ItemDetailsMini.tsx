/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellProductImage } from '@/components/blocks/ProductImage';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { OrderItemQuantity } from '@/components/content/OrderItemTable/parts/Quantity';
import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { OrderItemUnitPrice } from '@/components/content/OrderItemTable/parts/UnitPrice';
import { orderItemTableItemDetailsImageMiniSX } from '@/components/content/OrderItemTable/styles/orderItemTableItemDetailsImageMini';
import { orderItemTableItemDetailsMiniSX } from '@/components/content/OrderItemTable/styles/orderItemTableItemDetailsMini';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const OrderItemItemDetailsMini: FC = () => {
	const { details, freeGift } = useContext(ContentContext) as OrderItemTableRowData &
		ReturnType<typeof useOrderItemTableRow>;
	const { name, color, thumbnail, href, prices, loading } = details;
	const labels = useLocalization('OrderItemTable').Labels;
	const freeGiftDescription = useLocalization('FreeGift').Label.t();
	const router = useNextRouter();
	const checkoutRoute = useLocalization('Routes').CheckOut.route.t();
	const pathname = router.asPath.split('?').at(0);
	const check = new RegExp(`\\b${checkoutRoute}$`);
	const inCheckout = !!pathname?.match(check);
	const nameShort = name.length > 20 ? name.substring(0, 20) + '...' : name;
	if (loading) {
		return <ProgressIndicator />;
	}
	return (
		<Stack direction="row" alignItems="flex-start" spacing={2}>
			{thumbnail ? (
				// TODO Fix potential accessibility issue with img alt name being the same as adjacent link name
				<Linkable href={href} id={href} data-testid={href}>
					<TableCellProductImage
						{...{
							src: thumbnail,
							alt: labels.ProductThumbnail.t(),
							isThumbnail: true,
							sx: orderItemTableItemDetailsImageMiniSX,
						}}
					/>
				</Linkable>
			) : null}
			<Stack direction="column" alignItems="flex-start" sx={orderItemTableItemDetailsMiniSX}>
				<Linkable href={href} id={href} data-testid={href}>
					<Typography variant="h6" data-testid="orderItem-name" id="orderItem-name">
						{
							// TODO make translatable for left-to-right languages
							color ? `${nameShort}, ${color}` : nameShort
						}
					</Typography>
				</Linkable>
				{prices ? <OrderItemUnitPrice /> : null}
				<OrderItemQuantity mini={true} readOnly={inCheckout || freeGift} />
				{freeGift ? <Typography variant="body1">{freeGiftDescription}</Typography> : null}
			</Stack>
		</Stack>
	);
};
