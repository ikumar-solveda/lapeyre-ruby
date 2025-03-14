/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2025.
 */

import { ProductDetailsCarousel } from '@/components/blocks/ProductDetails/Carousel';
import { ProductDetailsMedia } from '@/components/blocks/ProductDetails/parts/Media';
import { ProductDetailsWebShare } from '@/components/blocks/ProductDetails/parts/WebShare';
import { productDetailsBinaryElementSX } from '@/components/blocks/ProductDetails/styles/binaryElement';
import { productDetailsImageSX } from '@/components/blocks/ProductDetails/styles/image';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext } from '@/data/context/content';
import { isB2BStore, useSettings } from '@/data/Settings';
import { Slide } from '@/data/types/Slide';
import { getProductDisplayInfo } from '@/utils/getProductDisplayInfo';
import { isKitOrBundleType } from '@/utils/productIsA';
import { Grid } from '@mui/material';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

export const ProductDetailsGallery: FC = () => {
	const { settings } = useSettings();
	const isB2B = isB2BStore(settings);
	const { selection, product } = useContext(ContentContext) as ReturnType<
		typeof useProductDetails
	> &
		ReturnType<typeof useSkuListTable>;
	const isKitOrBundle = isKitOrBundleType[product?.type ?? 'unknown'];
	const sku = !isKitOrBundle ? selection?.sku : product;
	const { name } = getProductDisplayInfo(sku, product);
	const [index, setIndex] = useState<number>(0);
	const showCarousel = useMemo(() => (sku?.images?.length ?? 0) > 1, [sku]);
	const slides: Slide[] = useMemo(() => sku?.images ?? [], [sku]);
	const slidesImage = useMemo(
		() => (isB2B ? slides[0]?.thumbnail : slides[0]?.fullImage),
		[isB2B, slides]
	);
	const skuImage = useMemo(() => (isB2B ? sku?.thumbnail : sku?.fullImage) ?? '', [isB2B, sku]);
	const [src, setSrc] = useState<string>(showCarousel ? slidesImage : skuImage);

	const choose = (i: number) => {
		setSrc(slides[i].fullImage);
		setIndex(i);
	};

	useEffect(() => {
		setIndex(0);
		setSrc(showCarousel ? slidesImage : skuImage);
	}, [showCarousel, slidesImage, skuImage]);

	return showCarousel ? (
		<ProductDetailsCarousel {...{ slides, choose, index, src, alt: name }}>
			{sku ? <ProductDetailsWebShare sku={sku} /> : null}
		</ProductDetailsCarousel>
	) : (
		<Grid container sx={productDetailsBinaryElementSX}>
			<Grid item xs={12} sx={productDetailsImageSX}>
				<ProductDetailsMedia src={src} posterImage={sku?.thumbnail} alt={name} />
				{sku ? <ProductDetailsWebShare sku={sku} /> : null}
			</Grid>
		</Grid>
	);
};
