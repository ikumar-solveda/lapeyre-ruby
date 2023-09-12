/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductThumbnailCarousel } from '@/components/content/ProductDetails/parts/ThumbnailCarousel';
import { ProductImage } from '@/components/blocks/ProductImage';
import { Slide } from '@/data/types/Slide';
import { Grid } from '@mui/material';
import { FC } from 'react';
import { productCarouselMainImageSX } from '@/components/content/ProductDetails/styles/carouselMainImage';

export type CarouselProps = {
	slides: Slide[];
	choose: (idx: number) => void;
	index?: number;
};

type Props = CarouselProps & { src: string; alt: string };

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const ProductCarousel: FC<Props> = ({ slides, choose, index, src, alt }) => (
	<>
		<Grid item xs={12} md={1}>
			<ProductThumbnailCarousel {...{ slides, choose, index }} />
		</Grid>
		<Grid item xs={5} sx={productCarouselMainImageSX}>
			<ProductImage {...{ src, alt }} />
		</Grid>
	</>
);
