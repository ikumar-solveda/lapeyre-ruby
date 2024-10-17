/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { MuiCardMedia } from '@/components/blocks/MuiCardMedia';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { ProductCardAddToCartWithInventory } from '@/components/blocks/ProductCard/parts/AddToCartWithInventory';
import { ProductCardChooseOptions } from '@/components/blocks/ProductCard/parts/ChooseOptions';
import { ProductCardCompareBox } from '@/components/blocks/ProductCard/parts/CompareBox';
import { productCardSX } from '@/components/blocks/ProductCard/styles/card';
import { productCardContentSX } from '@/components/blocks/ProductCard/styles/cardContent';
import { productCardMediaSX } from '@/components/blocks/ProductCard/styles/cardMedia';
import { productCardDetailsSX } from '@/components/blocks/ProductCard/styles/details';
import { productCardNameSX } from '@/components/blocks/ProductCard/styles/name';
import { Swatch } from '@/components/blocks/Swatch';
import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { useProductCard } from '@/data/Content/_ProductCard';
import { useProductEvents } from '@/data/Content/_ProductEvents';
import { useLocalization } from '@/data/Localization';
import { BC_COOKIE, HC_PREFIX } from '@/data/constants/cookie';
import { TYPES } from '@/data/constants/product';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { useCookieState } from '@/data/cookie/useCookieState';
import { HCLBreadcrumb } from '@/data/types/Breadcrumb';
import { ProductType } from '@/data/types/Product';
import { ProductCardContextValue } from '@/data/types/ProductCard';
import { getHref_Product } from '@/utils/getHref_Product';
import { productIsA } from '@/utils/productIsA';
import { Box, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const ProductCard: FC<{
	product: ProductType;
	parentCrumb?: HCLBreadcrumb[];
	clickAction?: () => void;
	showInventory?: boolean;
}> = ({ product, clickAction, parentCrumb, showInventory }) => {
	const parentCtxValue = useContext(ContentContext) as ReturnType<typeof useCatalogEntryList>;
	const [trail] = useCookieState(BC_COOKIE, true, HC_PREFIX);
	const eventProps = useMemo(() => ({ product }), [product]);
	const priceDisplayNLS = useLocalization('PriceDisplay');
	const productCardValue = useProductCard(product);
	const { onSwatch, sku } = productCardValue;
	const { onClick } = useProductEvents(eventProps);
	const routeUrl = useMemo(
		() => getHref_Product(product, parentCrumb, trail as string[]),
		[parentCrumb, product, trail]
	);
	const contextValue: ProductCardContextValue = useMemo(
		() => ({ ...parentCtxValue, ...productCardValue, product, routeUrl }),
		[parentCtxValue, product, productCardValue, routeUrl]
	);
	const shouldShowInventory =
		product.items || productIsA(product, TYPES.kit) || productIsA(product, TYPES.sku);
	return (
		<Card
			onClick={onClick(clickAction)}
			sx={productCardSX}
			id={product.partNumber}
			data-testid={product.partNumber}
		>
			<CardActions>
				<ProductCardCompareBox product={product} />
			</CardActions>
			<Box sx={productCardDetailsSX}>
				<Linkable href={routeUrl} color="textPrimary">
					<MuiCardMedia
						sx={productCardMediaSX}
						component="div"
						image={(sku ?? product).thumbnail}
						title={product.name}
					></MuiCardMedia>
				</Linkable>
				<Stack direction="row" justifyContent="center" spacing={1}>
					{product.colorSwatches.map((colorSwatch) => (
						<Swatch
							key={colorSwatch.identifier}
							title={colorSwatch.identifier}
							size="medium"
							image={colorSwatch.image1path}
							data-testid={`product-${colorSwatch.identifier.toLowerCase()}-swatch`}
							id={`product-${colorSwatch.identifier.toLowerCase()}-swatch`}
							onClick={(event) => onSwatch(event, colorSwatch)}
						/>
					))}
				</Stack>
			</Box>
			<CardContent sx={productCardContentSX}>
				<Stack spacing={1}>
					<Typography
						variant="body2AsH2"
						align="center"
						id={`${product.partNumber}-name`}
						data-testid={`${product.partNumber}-name`}
						sx={productCardNameSX}
					>
						<Linkable href={routeUrl} color="textPrimary">
							{product.name}
						</Linkable>
					</Typography>
					{product.productPrice.min ? (
						<Typography variant="body1" align="center">
							<PriceDisplay
								currency={product.productPrice.currency}
								min={product.productPrice.min}
								{...(product.productPrice.max ? { max: product.productPrice.max } : {})}
							></PriceDisplay>
						</Typography>
					) : (
						<Typography variant="body1" align="center">
							{priceDisplayNLS.Labels.Pending.t()}
						</Typography>
					)}
				</Stack>
			</CardContent>
			{showInventory ? (
				<ContentProvider value={contextValue}>
					{shouldShowInventory ? (
						<ProductCardAddToCartWithInventory />
					) : (
						<ProductCardChooseOptions />
					)}
				</ContentProvider>
			) : null}
		</Card>
	);
};
