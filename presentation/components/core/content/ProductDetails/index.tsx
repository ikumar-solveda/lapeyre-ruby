/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { NotAvailable } from '@/components/blocks/NotAvailable';
import { ProductDetailsAddToCart } from '@/components/blocks/ProductDetails/AddToCart';
import { ProductDetailsAvailability } from '@/components/blocks/ProductDetails/Availability';
import { ProductDetailsDisplay } from '@/components/blocks/ProductDetails/Display';
import { ProductDetailsGallery } from '@/components/blocks/ProductDetails/Gallery';
import { ProductDetailsPrice } from '@/components/blocks/ProductDetails/Price';
import { ProductDetailsPromos } from '@/components/blocks/ProductDetails/Promos';
import { ProductDetailsQuantity } from '@/components/blocks/ProductDetails/Quantity';
import { ProductDetailsRibbonChips } from '@/components/blocks/ProductDetails/RibbonChips';
import { ProductDetailsSeller } from '@/components/blocks/ProductDetails/Seller';
import { ProductDetailsTabs } from '@/components/blocks/ProductDetails/Tabs';
import { productDetailsBinaryElementSX } from '@/components/blocks/ProductDetails/styles/binaryElement';
import { productDetailsContainerSX } from '@/components/blocks/ProductDetails/styles/container';
import { ProductDetailsAttributes } from '@/components/content/ProductDetails/parts/Attributes';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useLocalization } from '@/data/Localization';
import { UNINITIALIZED_STORE } from '@/data/constants/inventory';
import { ContentProvider } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ID } from '@/data/types/Basic';
import { StoreDetails } from '@/data/types/Store';
import { Paper, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';

export const ProductDetails: FC<{
	id: ID;
}> = ({ id }) => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const { storeLocator } = useStoreLocatorState();
	const [physicalStore, setPhysicalStore] = useState<StoreDetails>(UNINITIALIZED_STORE);
	const productDetails = useProductDetails({
		partNumber: id.toString(),
		physicalStoreName: physicalStore?.physicalStoreName ?? '',
		physicalStore,
	});
	const { product, selection } = productDetails;
	const { detailsNotAvailable } = useLocalization('productDetail');

	useEffect(() => {
		setPhysicalStore(storeLocator.selectedStore);
	}, [storeLocator.selectedStore]);

	return selection && product?.partNumber ? (
		<ContentProvider value={productDetails}>
			<Paper sx={productDetailsContainerSX}>
				<Stack spacing={contentSpacing}>
					<Stack
						direction={{
							md: 'row',
						}}
						spacing={contentSpacing}
						justifyContent="space-around"
					>
						<ProductDetailsGallery />
						<Stack spacing={2} sx={productDetailsBinaryElementSX}>
							<ProductDetailsDisplay />
							<ProductDetailsPromos />
							<ProductDetailsRibbonChips />
							{product.type === 'bundle' ? null : (
								<Stack spacing={3}>
									<ProductDetailsPrice />
									<ProductDetailsAttributes />
									<ProductDetailsQuantity />
									<ProductDetailsAvailability />
									<ProductDetailsSeller />
									<ProductDetailsAddToCart />
								</Stack>
							)}
						</Stack>
					</Stack>
					<ProductDetailsTabs />
				</Stack>
			</Paper>
		</ContentProvider>
	) : (
		<NotAvailable message={detailsNotAvailable.t()} />
	);
};
