/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { Swatch } from '@/components/blocks/Swatch';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useProduct } from '@/data/Content/Product';
import { useLocalization } from '@/data/Localization';
import { Paper, Grid, Typography, Button, Box, Stack } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
import { LinkWrap } from '@/components/blocks/Linkable';
import { Img } from '@/components/blocks/MaterialImage';
import { useProductCard } from '@/data/Content/_ProductCard';
import { ProductType } from '@/data/types/Product';

export const FeaturedProduct: FC<{
	id: string;
	clickAction?: () => void;
}> = ({ id: partNumber, clickAction }) => {
	const { product, loading } = useProduct({ id: partNumber });
	const { onSwatch, sku } = useProductCard({ partNumber } as ProductType);
	const priceDisplayNLS = useLocalization('PriceDisplay');
	return (
		<Paper id={`featureCard_${product?.id}`} data-testid={`featureCard_${product?.id}`}>
			{loading ? (
				<ProgressIndicator />
			) : !product ? null : (
				<Grid container alignItems="center" spacing={3} px={2} py={4}>
					<Grid item xs={12} sm={6} lg={5} id={`featureCard_imageContainer_${product?.id}`}>
						<LinkWrap
							href={product?.seo?.href || ''}
							data-testid={`featureCard_imageRouter_${product?.id}`}
						>
							<a onClick={clickAction}>
								<Img
									width="100%"
									id={`featureCard_fullImage_${product?.id}`}
									src={(sku ?? product)?.fullImage}
									alt={product?.name}
								/>
							</a>
						</LinkWrap>
					</Grid>
					<Grid item xs={12} sm={6} md={5} lg={6} id={`featureCard_grid_${product?.id}`}>
						<Stack spacing={2}>
							<Box component="header">
								{product?.manufacturer ? (
									<Typography variant="overline">{product?.manufacturer}</Typography>
								) : null}
								<Typography variant="h2" id={`featureCard_describer_${product?.id}`}>
									{product?.name}
								</Typography>
							</Box>
							<Stack direction="row" spacing={1}>
								{product?.colorSwatches
									? product.colorSwatches.map((colorSwatch) => (
											<Swatch
												title={colorSwatch.identifier}
												key={colorSwatch.identifier}
												image={colorSwatch.image1path}
												id={`feature-product-${colorSwatch.identifier.toLowerCase()}-swatch`}
												data-testid={`feature-product-${colorSwatch.identifier.toLowerCase()}-swatch`}
												onClick={(event) => onSwatch(event, colorSwatch)}
											/>
									  ))
									: null}
							</Stack>
							<Typography variant="subtitle2" id={`featureCard_description_${product?.id}`}>
								{product?.shortDescription}
							</Typography>
							<Box>
								<Typography
									variant="h4"
									id={`featureCard_price_${product?.id}`}
									data-testid={`featureCard_price_${product?.id}`}
								>
									{product?.productPrice?.min ? (
										// TODO: Retrieve currency and locale from server. price pending translation

										<PriceDisplay
											currency={product.productPrice.currency}
											min={product.productPrice.min}
											{...(product.productPrice.max ? { max: product.productPrice.max } : {})}
										></PriceDisplay>
									) : (
										priceDisplayNLS.Labels.Pending.t()
									)}
								</Typography>
							</Box>
							<Box>
								<Link
									href={product?.seo?.href || ''}
									id={`featureCard_textRouter_${product?.id}`}
									data-testid={`featureCard_textRouter_${product?.id}`}
									passHref={true}
								>
									<Button
										component="a"
										variant="contained"
										data-testid={`featureCard_textRouter_${product?.id}_shop_now`}
										id={`featureCard_textRouter_${product?.id}_shop_now`}
										color="secondary"
										onClick={clickAction}
									>
										{'Shop Now'}
									</Button>
								</Link>
							</Box>
						</Stack>
					</Grid>
				</Grid>
			)}
		</Paper>
	);
};
