/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductCarousel } from '@/components/content/ProductDetails/parts/Carousel';
import { productDetailsImageSX } from '@/components/content/ProductDetails/styles/image';
import { ProductImage } from '@/components/blocks/ProductImage';
import { Slide } from '@/data/types/Slide';
import { Grid } from '@mui/material';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { ContentContext } from '@/data/context/content';

export const ProductDetailsGallery: FC = () => {
	const {
		selection: { sku },
		product,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const { name } = getProductDisplayInfo(sku, product);
	const [index, setIndex] = useState<number>(0);
	const showCarousel = useMemo(() => (sku?.images?.length ?? 0) > 1, [sku]);
	const slides: Slide[] = useMemo(() => sku?.images ?? [], [sku]);
	const [src, setSrc] = useState<string>(showCarousel ? slides[0].fullImage : sku?.fullImage ?? '');

	const choose = (i: number) => {
		setSrc(slides[i].fullImage);
		setIndex(i);
	};

	useEffect(() => {
		setIndex(0);
		setSrc(showCarousel ? slides[0].fullImage : sku?.fullImage ?? '');
	}, [showCarousel, sku, slides]);

	return showCarousel ? (
		<ProductCarousel {...{ slides, choose, index, src, alt: name }} />
	) : (
		<Grid item xs={12} md={6} sx={productDetailsImageSX}>
			<ProductImage {...{ src, alt: name }} />
		</Grid>
	);
};
