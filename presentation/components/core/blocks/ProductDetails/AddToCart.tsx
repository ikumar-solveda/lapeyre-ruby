/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { B2B } from '@/components/blocks/B2B';
import { OneClick } from '@/components/blocks/OneClick';
import { ProductDetailsAddToRequisitionList } from '@/components/blocks/ProductDetails/AddToRequisitionList';
import { ProductDetailsAddToWishList } from '@/components/blocks/ProductDetails/AddToWishList';
import { productDetailsAddToCartErrorSX } from '@/components/blocks/ProductDetails/styles/addToCartError';
import { productDetailsAddToCartStack } from '@/components/blocks/ProductDetails/styles/addToCartStack';
import { TYPES } from '@/data/constants/product';
import { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { isKitOrBundleType, productIsA } from '@/utils/productIsA';
import { Stack, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

type Props = {
	standalone?: boolean;
};
export const ProductDetailsAddToCart: FC<Props> = ({ standalone = false }) => {
	const { AddToCart, addToCurrentOrder, SignIn } = useLocalization('productDetail');
	const {
		selection,
		hasInventory,
		addToCart,
		product,
		loginStatus,
		error = {},
		isSkuListTableDisplayed,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails> &
		ReturnType<typeof useBundleDetailsTable> &
		ReturnType<typeof useSkuListTable>;
	const isKitOrBundle = isKitOrBundleType[product?.type as string];
	const isBundle = productIsA(product, TYPES.bundle);
	const sku = !isKitOrBundle ? selection?.sku : product;
	const buyable = !isKitOrBundle ? selection?.buyable : true;
	const { prices } = getProductDisplayInfo(sku, product);
	const otherDisabled = (!isBundle && !hasInventory) || !buyable || !prices?.offer;
	const disabledButton = isSkuListTableDisplayed ? product?.items?.length === 0 : otherDisabled;
	const dtId = useMemo(() => `product-add-to-cart${standalone ? '-standalone' : ''}`, [standalone]);

	return (
		<Stack spacing={2}>
			<Stack {...productDetailsAddToCartStack(standalone)}>
				<ProductDetailsAddToWishList standalone={standalone} />
				<ProductDetailsAddToRequisitionList standalone={standalone} />
				<OneClick
					data-testid={dtId}
					id={dtId}
					onClick={addToCart}
					variant="contained"
					disabled={disabledButton}
				>
					<B2B>{loginStatus ? addToCurrentOrder.t() : SignIn.t()}</B2B>
					<B2B is={false}>{AddToCart.t()}</B2B>
				</OneClick>
			</Stack>
			{error.message ? (
				<Typography variant="body2" sx={productDetailsAddToCartErrorSX}>
					{error.message}
				</Typography>
			) : null}
		</Stack>
	);
};
