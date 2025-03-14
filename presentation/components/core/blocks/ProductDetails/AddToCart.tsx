/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { FlowIfDisabled, FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { OneClick } from '@/components/blocks/OneClick';
import { ProductDetailsAddToQuote } from '@/components/blocks/ProductDetails/AddToQuote';
import { ProductDetailsAddToRequisitionList } from '@/components/blocks/ProductDetails/AddToRequisitionList';
import { ProductDetailsAddToWishList } from '@/components/blocks/ProductDetails/AddToWishList';
import { productDetailsAddToCartErrorSX } from '@/components/blocks/ProductDetails/styles/addToCartError';
import { productDetailsAddToCartStack } from '@/components/blocks/ProductDetails/styles/addToCartStack';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import type { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
import type { useProductDetails } from '@/data/Content/ProductDetails';
import type { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { isKitOrBundleType } from '@/utils/productIsA';
import { Stack, Typography } from '@mui/material';
import { type FC, useContext, useMemo } from 'react';

type Props = {
	standalone?: boolean;
};
export const ProductDetailsAddToCart: FC<Props> = ({ standalone = false }) => {
	const { AddToCart, addToCurrentOrder, SignIn } = useLocalization('productDetail');
	const { settings } = useSettings();
	const isB2B = isB2BStore(settings);
	const addToCartText = isB2B ? addToCurrentOrder.t() : AddToCart.t();
	const {
		selection,
		addToCart,
		product,
		loginStatus,
		error = {},
		isSkuListTableDisplayed,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails> &
		ReturnType<typeof useBundleDetailsTable> &
		ReturnType<typeof useSkuListTable>;
	const isKitOrBundle = isKitOrBundleType[product?.type as string];
	const sku = !isKitOrBundle ? selection?.sku : product;
	const buyable = !isKitOrBundle ? selection?.buyable : true;
	const { prices } = getProductDisplayInfo(sku, product);
	const otherDisabled = !buyable || !prices?.offer;
	const disabledButton = isSkuListTableDisplayed ? product?.items?.length === 0 : otherDisabled;
	const dtId = useMemo(() => `product-add-to-cart${standalone ? '-standalone' : ''}`, [standalone]);

	return (
		<Stack spacing={2}>
			<Stack {...productDetailsAddToCartStack(standalone)}>
				<ProductDetailsAddToQuote standalone={standalone} />
				<ProductDetailsAddToWishList standalone={standalone} />
				<ProductDetailsAddToRequisitionList standalone={standalone} />
				<OneClick
					data-testid={dtId}
					id={dtId}
					onClick={addToCart}
					variant="contained"
					disabled={disabledButton}
				>
					<FlowIfEnabled feature={EMS_STORE_FEATURE.GUEST_SHOPPING}>{addToCartText}</FlowIfEnabled>
					<FlowIfDisabled feature={EMS_STORE_FEATURE.GUEST_SHOPPING}>
						{loginStatus ? addToCartText : SignIn.t()}
					</FlowIfDisabled>
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
