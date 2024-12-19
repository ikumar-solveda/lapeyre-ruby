/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Card } from '@/components/blocks/Card';
import { MuiCardMedia } from '@/components/blocks/MuiCardMedia';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { wishListDetailsProductCardSX } from '@/components/content/WishLists/styles/details/productCard';
import { useWishListDetails } from '@/data/Content/_WishListDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import { CheckCircle } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

/** @deprecated use `WishListDetails` */
export const WishListDetailsProductCard: FC<{ product: ProductType }> = ({ product }) => {
	const localization = useLocalization('WishList');
	const priceDisplayNLS = useLocalization('PriceDisplay');
	const { selection, toggle, getCardActions } = useContext(ContentContext) as ReturnType<
		typeof useWishListDetails
	>;
	const { productPrice: price } = product;

	const cardMain = (
		<>
			{selection.selected[product.partNumber] ? (
				<Box sx={{ position: 'absolute' }}>
					<CheckCircle color="primary" />
				</Box>
			) : null}
			<Stack alignItems="center">
				<MuiCardMedia
					image={product.thumbnail}
					sx={{ width: '120px', height: '120px' }}
					role="presentation"
				/>
				<Typography align="center">{product.name}</Typography>
				<Typography align="center" color="primary">
					{price?.min ? (
						<PriceDisplay min={price?.min ?? 0} currency={price.currency} />
					) : (
						priceDisplayNLS.Labels.Pending.t()
					)}
				</Typography>
			</Stack>
		</>
	);

	return (
		<Card
			testId={`wishlist-${product.partNumber}`}
			extraSX={[wishListDetailsProductCardSX(selection.selected[product.partNumber])]}
			onCardArea={toggle(product)}
			cardMain={cardMain}
			actions={getCardActions(product)}
			confirmLabel={localization.Confirm.t()}
			cancelLabel={localization.Cancel.t()}
		/>
	);
};
