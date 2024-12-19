/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Card } from '@/components/blocks/Card';
import { MuiCardMedia } from '@/components/blocks/MuiCardMedia';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { wishListDetailsProductCardSX } from '@/components/content/WishListDetails/styles/productCard';
import { wishListDetailsProductCardPositionSX } from '@/components/content/WishListDetails/styles/productCardPosition';
import { wishListDetailsProductCardSizeSX } from '@/components/content/WishListDetails/styles/productCardSize';
import { useWishListDetailsV2, WishListProductSelection } from '@/data/Content/WishListDetailsV2';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import { CheckCircle } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

type ProductCardMainProps = {
	selection: WishListProductSelection;
	product: ProductType;
};
const ProductCardMain: FC<ProductCardMainProps> = ({ selection, product }) => {
	const { productPrice: price } = product;
	const priceDisplayNLS = useLocalization('PriceDisplay');

	return (
		<>
			{selection.selected[product.partNumber] ? (
				<Box sx={wishListDetailsProductCardPositionSX}>
					<CheckCircle color="primary" />
				</Box>
			) : null}
			<Stack alignItems="center">
				<MuiCardMedia
					image={product.thumbnail}
					sx={wishListDetailsProductCardSizeSX}
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
};

export const WishListDetailsProductCard: FC<{ product: ProductType }> = ({ product }) => {
	const localization = useLocalization('WishList');
	const { selection, toggle, getCardActions } = useContext(ContentContext) as ReturnType<
		typeof useWishListDetailsV2
	>;

	return (
		<Card
			testId={`wish-list-details-${product.partNumber}`}
			extraSX={[wishListDetailsProductCardSX(selection.selected[product.partNumber])]}
			onCardArea={toggle(product)}
			cardMain={<ProductCardMain selection={selection} product={product} />}
			actions={getCardActions(product)}
			confirmLabel={localization.Confirm.t()}
			cancelLabel={localization.Cancel.t()}
		/>
	);
};
