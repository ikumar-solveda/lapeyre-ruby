/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2025.
 */

import { ProductDetailsThumbnailCarousel } from '@/components/blocks/ProductDetails/ThumbnailCarousel';
import { ProductDetailsMedia } from '@/components/blocks/ProductDetails/parts/Media';
import { productDetailsCarouselBinaryElementSX } from '@/components/blocks/ProductDetails/styles/carouselBinaryElement';
import { productDetailsCarouselMainImageSX } from '@/components/blocks/ProductDetails/styles/carouselMainImage';
import { INDEX_ZERO } from '@/data/constants/product';
import { Slide } from '@/data/types/Slide';
import { Grid } from '@mui/material';
import { Children, FC, PropsWithChildren } from 'react';

export type CarouselProps = {
	slides: Slide[];
	choose: (idx: number) => void;
	index?: number;
};

type Props = PropsWithChildren<CarouselProps & { src: string; alt: string }>;

export const ProductDetailsCarousel: FC<Props> = ({
	slides,
	choose,
	index = INDEX_ZERO,
	src,
	alt,
	children,
}) => (
	<Grid container sx={productDetailsCarouselBinaryElementSX} spacing={1}>
		<Grid item xs={12} md={2}>
			<ProductDetailsThumbnailCarousel {...{ slides, choose, index }} />
		</Grid>
		<Grid item xs={5} md sx={productDetailsCarouselMainImageSX}>
			<ProductDetailsMedia src={src} alt={alt} posterImage={slides[index]?.thumbnail} />
		</Grid>
		{Children.map(children, (child) => child)}
	</Grid>
);
