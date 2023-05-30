/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useEffect, useState } from 'react';
import { Paper, Stack, useTheme } from '@mui/material';
import { ProductDetailsAttributes } from '@/components/content/ProductDetails/parts/Attributes';
import { ProductDetailsTabs } from '@/components/content/ProductDetails/parts/Tabs';
import { ProductDetailsAvailability } from '@/components/content/ProductDetails/parts/Availability';
import { ProductDetailsQuantity } from '@/components/content/ProductDetails/parts/Quantity';
import { productDetailsContainerSX } from '@/components/content/ProductDetails/styles/container';
import { ProductDetailsPrice } from '@/components/content/ProductDetails/parts/Price';
import { ProductDetailsGallery } from '@/components/content/ProductDetails/parts/Gallery';
import { ProductDetailsRibbonChips } from '@/components/content/ProductDetails/parts/RibbonChips';
import { ProductDetailsDisplay } from '@/components/content/ProductDetails/parts/Display';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { ProductDetailsPromos } from '@/components/content/ProductDetails/parts/Promos';
import { ProductDetailsSeller } from '@/components/content/ProductDetails/parts/Seller';
import { ProductDetailsAddToCart } from '@/components/content/ProductDetails/parts/AddToCart';
import { ID } from '@/data/types/Basic';
import { ContentProvider } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';

export const ProductDetails: FC<{
	id: ID;
}> = ({ id }) => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const { storeLocator } = useStoreLocatorState();
	const [physicalStoreName, setPhysicalStoreName] = useState<string>('');
	const productDetails = useProductDetails({ partNumber: id.toString(), physicalStoreName });
	const { product, selection } = productDetails;

	useEffect(() => {
		setPhysicalStoreName(storeLocator.selectedStore?.physicalStoreName ?? '');
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
						<Stack spacing={2}>
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
	) : null;
};
