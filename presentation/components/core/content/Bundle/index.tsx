/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { NotAvailable } from '@/components/blocks/NotAvailable';
import { ProductDetailsAddToCart } from '@/components/blocks/ProductDetails/AddToCart';
import { ProductDetailsDisplay } from '@/components/blocks/ProductDetails/Display';
import { ProductDetailsGallery } from '@/components/blocks/ProductDetails/Gallery';
import { ProductDetailsPrice } from '@/components/blocks/ProductDetails/Price';
import { ProductDetailsPromos } from '@/components/blocks/ProductDetails/Promos';
import { ProductDetailsRibbonChips } from '@/components/blocks/ProductDetails/RibbonChips';
import { ProductDetailsSeller } from '@/components/blocks/ProductDetails/Seller';
import { ProductDetailsTabs } from '@/components/blocks/ProductDetails/Tabs';
import { productDetailsContainerSX } from '@/components/blocks/ProductDetails/styles/container';
import { BundleTable } from '@/components/content/Bundle/parts/Table';
import { bundleBinaryElementSX } from '@/components/content/Bundle/styles/binaryElement';
import { useBundleDetailsTable } from '@/data/Content/BundleDetailsTable';
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

export const Bundle: FC<{
	id: ID;
}> = ({ id }) => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const { storeLocator } = useStoreLocatorState();
	const [physicalStore, setPhysicalStore] = useState<StoreDetails>(UNINITIALIZED_STORE);
	const bundleDetails = useProductDetails({ partNumber: id.toString() });
	const { product } = bundleDetails;
	const bundleTableData = useBundleDetailsTable({
		pdp: bundleDetails,
		physicalStoreName: physicalStore?.physicalStoreName ?? '',
		physicalStore,
	});
	const { detailsNotAvailable } = useLocalization('productDetail');

	useEffect(() => {
		setPhysicalStore(storeLocator.selectedStore);
	}, [storeLocator.selectedStore]);

	return product?.partNumber ? (
		<ContentProvider value={{ ...bundleDetails, ...bundleTableData }}>
			<Stack spacing={2}>
				<Paper sx={productDetailsContainerSX}>
					<Stack spacing={contentSpacing}>
						<Stack
							direction={{ md: 'row', xs: 'column-reverse' }}
							spacing={contentSpacing}
							justifyContent="space-around"
						>
							<Stack spacing={2} sx={bundleBinaryElementSX}>
								<ProductDetailsDisplay />
								<ProductDetailsPromos />
								<ProductDetailsRibbonChips />
								<Stack spacing={3}>
									<ProductDetailsPrice />
									<ProductDetailsSeller />
									<ProductDetailsAddToCart />
								</Stack>
								<ProductDetailsTabs />
							</Stack>
							<ProductDetailsGallery />
						</Stack>
					</Stack>
				</Paper>
				<Paper>
					<BundleTable />
				</Paper>
				<Stack alignItems="flex-end">
					<ProductDetailsAddToCart standalone />
				</Stack>
			</Stack>
		</ContentProvider>
	) : (
		<NotAvailable message={detailsNotAvailable.t()} />
	);
};
