/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { MuiCardMedia } from '@/components/blocks/MuiCardMedia';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { ProductCardCompareBox } from '@/components/blocks/ProductCard/parts/CompareBox';
import { productCardSX } from '@/components/blocks/ProductCard/styles/card';
import { productCardContentSX } from '@/components/blocks/ProductCard/styles/cardContent';
import { productCardMediaSX } from '@/components/blocks/ProductCard/styles/cardMedia';
import { Swatch } from '@/components/blocks/Swatch';
import { useProductCard } from '@/data/Content/_ProductCard';
import { useProductEvents } from '@/data/Content/_ProductEvents';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import { Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const ProductCard: FC<{
	product: ProductType;
	clickAction?: () => void;
}> = ({ product, clickAction }) => {
	const priceDisplayNLS = useLocalization('PriceDisplay');
	const { onSwatch, sku } = useProductCard(product);
	const { onClick } = useProductEvents({ product });

	return (
		<Card onClick={onClick(clickAction)} sx={productCardSX}>
			<Linkable href={product.seo?.href} color="textPrimary">
				<MuiCardMedia
					sx={productCardMediaSX}
					component="div"
					image={(sku ?? product).thumbnail}
					title={product.name}
				></MuiCardMedia>
			</Linkable>
			<CardContent sx={productCardContentSX}>
				<Stack spacing={1}>
					<Linkable href={product.seo?.href} color="textPrimary">
						<Typography
							variant="body2"
							align="center"
							id={product.partNumber}
							data-testid={product.partNumber}
						>
							{product.name}
						</Typography>
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
			<CardActions>
				<ProductCardCompareBox product={product} />
			</CardActions>
		</Card>
	);
};
