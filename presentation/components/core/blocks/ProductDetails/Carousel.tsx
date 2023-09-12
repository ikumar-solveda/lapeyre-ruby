/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductDetailsThumbnailCarousel } from '@/components/blocks/ProductDetails/ThumbnailCarousel';
import { productDetailsBinaryElementSX } from '@/components/blocks/ProductDetails/styles/binaryElement';
import { productDetailsCarouselMainImageSX } from '@/components/blocks/ProductDetails/styles/carouselMainImage';
import { ProductImage } from '@/components/blocks/ProductImage';
import { Slide } from '@/data/types/Slide';
import { Grid } from '@mui/material';
import { FC } from 'react';

export type CarouselProps = {
	slides: Slide[];
	choose: (idx: number) => void;
	index?: number;
};

type Props = CarouselProps & { src: string; alt: string };

export const ProductDetailsCarousel: FC<Props> = ({ slides, choose, index, src, alt }) => (
	<Grid container sx={productDetailsBinaryElementSX}>
		<Grid item xs={12} md={2}>
			<ProductDetailsThumbnailCarousel {...{ slides, choose, index }} />
		</Grid>
		<Grid item xs={5} md sx={productDetailsCarouselMainImageSX}>
			<ProductImage {...{ src, alt }} />
		</Grid>
	</Grid>
);
