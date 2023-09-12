/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { B2B } from '@/components/blocks/B2B';
import { ProductDetailsAddToWishList } from '@/components/content/ProductDetails/parts/AddToWishList';
import { TYPES } from '@/data/constants/product';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { productIsA } from '@/utils/productIsA';
import { Button, Stack } from '@mui/material';
import { FC, useContext } from 'react';

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const ProductDetailsAddToCart: FC = () => {
	const { AddToCart, addToCurrentOrder, SignIn } = useLocalization('productDetail');
	const { selection, hasInventory, addToCart, product, loginStatus } = useContext(
		ContentContext
	) as ReturnType<typeof useProductDetails>;
	const isBundle = productIsA(product, TYPES.bundle);
	const sku = !isBundle ? selection?.sku : product;
	const buyable = !isBundle ? selection?.buyable : true;
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
				<B2B>{loginStatus ? addToCurrentOrder.t() : SignIn.t()}</B2B>
				<B2B is={false}>{AddToCart.t()}</B2B>
			</Button>
		</Stack>
	);
};
