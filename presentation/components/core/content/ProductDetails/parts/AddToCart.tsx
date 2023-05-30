/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductDetailsAddToWishList } from '@/components/content/ProductDetails/parts/AddToWishList';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { Button, Stack } from '@mui/material';
import { FC, useContext } from 'react';

export const ProductDetailsAddToCart: FC = () => {
	const localization = useLocalization('productDetail');
	const {
		selection: { sku, buyable },
		hasInventory,
		addToCart,
		product,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const { prices } = getProductDisplayInfo(sku, product);
	return (
		<Stack direction="row" spacing={1}>
			<ProductDetailsAddToWishList />
			<Button
				data-testid="product-add-to-cart"
				id="product-add-to-cart"
				onClick={addToCart}
				variant="contained"
				disabled={!hasInventory || !buyable || !prices?.offer}
			>
				{localization.AddToCart.t()}
			</Button>
		</Stack>
	);
};
