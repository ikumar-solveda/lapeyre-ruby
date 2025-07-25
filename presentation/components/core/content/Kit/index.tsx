/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { NotAvailable } from '@/components/blocks/NotAvailable';
import { ProductDetailsAddToCart } from '@/components/blocks/ProductDetails/AddToCart';
import { ProductDetailsDisplay } from '@/components/blocks/ProductDetails/Display';
import { ProductDetailsGallery } from '@/components/blocks/ProductDetails/Gallery';
import { ProductDetailsPickupDeliveryOption } from '@/components/blocks/ProductDetails/PickupDeliveryOption';
import { ProductDetailsPrice } from '@/components/blocks/ProductDetails/Price';
import { ProductDetailsPromos } from '@/components/blocks/ProductDetails/Promos';
import { ProductDetailsQuantity } from '@/components/blocks/ProductDetails/Quantity';
import { ProductDetailsRibbonChips } from '@/components/blocks/ProductDetails/RibbonChips';
import { ProductDetailsScheduleForLater } from '@/components/blocks/ProductDetails/ScheduleForLater';
import { ProductDetailsSeller } from '@/components/blocks/ProductDetails/Seller';
import { ProductDetailsTabs } from '@/components/blocks/ProductDetails/Tabs';
import { ProductDetailsVolumePrice } from '@/components/blocks/ProductDetails/parts/VolumePrice';
import { productDetailsContainerSX } from '@/components/blocks/ProductDetails/styles/container';
import { KitTable } from '@/components/content/Kit/parts/Table';
import { kitBinaryElementSX } from '@/components/content/Kit/styles/binaryElement';
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

export const Kit: FC<{
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
			<Stack spacing={2}>
				<Paper sx={productDetailsContainerSX}>
					<Stack spacing={contentSpacing}>
						<Stack
							direction={{ md: 'row', xs: 'column-reverse' }}
							spacing={contentSpacing}
							justifyContent="space-around"
						>
							<Stack spacing={2} sx={kitBinaryElementSX}>
								<ProductDetailsDisplay />
								<ProductDetailsPromos />
								<ProductDetailsRibbonChips />
								<Stack spacing={3}>
									<ProductDetailsPrice />
									<ProductDetailsVolumePrice />
									<ProductDetailsScheduleForLater />
									<ProductDetailsQuantity />
									<ProductDetailsPickupDeliveryOption />
									<ProductDetailsSeller />
									<ProductDetailsAddToCart />
								</Stack>
								<ProductDetailsTabs />
							</Stack>
							<ProductDetailsGallery />
						</Stack>
					</Stack>
				</Paper>
				<Paper sx={productDetailsContainerSX}>
					<KitTable />
				</Paper>
				<Stack alignItems="flex-end">
					<ProductDetailsAddToCart />
				</Stack>
			</Stack>
		</ContentProvider>
	) : (
		<NotAvailable message={detailsNotAvailable.t()} />
	);
};
