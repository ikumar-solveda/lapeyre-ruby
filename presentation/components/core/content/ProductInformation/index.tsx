/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */
import { NotAvailable } from '@/components/blocks/NotAvailable';
import { ProductDetailsBackorderMessage } from '@/components/blocks/ProductDetails/BackorderMessage';
import { ProductDetailsDisplay } from '@/components/blocks/ProductDetails/Display';
import { ProductDetailsGallery } from '@/components/blocks/ProductDetails/Gallery';
import { ProductDetailsPrice } from '@/components/blocks/ProductDetails/Price';
import { ProductDetailsPromos } from '@/components/blocks/ProductDetails/Promos';
import { ProductDetailsRibbonChips } from '@/components/blocks/ProductDetails/RibbonChips';
import { ProductDetailsSeller } from '@/components/blocks/ProductDetails/Seller';
import { ProductDetailsTabs } from '@/components/blocks/ProductDetails/Tabs';
import { productInformationBinaryElementSX } from '@/components/content/ProductInformation/styles/binaryElement';
import { productInformationContainerSX } from '@/components/content/ProductInformation/styles/container';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { TYPES } from '@/data/constants/product';
import { ContentProvider } from '@/data/context/content';
import { EventsContext } from '@/data/context/events';
import { ID } from '@/data/types/Basic';
import { Paper, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useContext, useEffect } from 'react';

export const ProductInformation: FC<{ id: ID }> = ({ id }) => {
	const { onProductView } = useContext(EventsContext);
	const productDetails = useSkuListTable({ partNumber: id.toString() });
	const { product, params } = productDetails;
	const { detailsNotAvailable } = useLocalization('productDetail');
	const { settings } = useSettings();
	const {
		dimensions: { contentSpacing },
	} = useTheme();

	useEffect(() => {
		product &&
			(product.type !== TYPES.sku || !product.parentCatalogEntryID) &&
			onProductView({
				gtm: { product, storeName: settings.storeName, settings },
				marketing: {
					productId: product.id,
					settings,
					params,
				},
			});
	}, [product]); // eslint-disable-line react-hooks/exhaustive-deps

	return product?.partNumber ? (
		<ContentProvider value={productDetails}>
			<Paper sx={productInformationContainerSX}>
				<Stack
					direction={{
						md: 'row',
						xs: 'column-reverse',
					}}
					spacing={contentSpacing}
					justifyContent="space-around"
				>
					<Stack spacing={2} sx={productInformationBinaryElementSX}>
						<ProductDetailsDisplay />
						<ProductDetailsSeller />
						<ProductDetailsPromos />
						<ProductDetailsRibbonChips />
						{product?.type !== TYPES.bundle ? <ProductDetailsPrice /> : null}
						<ProductDetailsBackorderMessage />
						<ProductDetailsTabs />
					</Stack>
					<ProductDetailsGallery />
				</Stack>
			</Paper>
		</ContentProvider>
	) : (
		<NotAvailable message={detailsNotAvailable.t()} />
	);
};
