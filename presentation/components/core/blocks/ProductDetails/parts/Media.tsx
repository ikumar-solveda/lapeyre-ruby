/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { ProductDetailsVideo } from '@/components/blocks/ProductDetails/parts/Video';
import { ProductImage } from '@/components/blocks/ProductImage';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { isVideoPath } from '@/utils/isVideoPath';
import { type FC, useMemo } from 'react';

type ProductDetailsMediaProps = {
	src: string;
	alt: string;
	isThumbnail?: boolean;
	isSelected?: boolean;
	posterImage?: string;
	isCarouselThumbnail?: boolean;
};

export const ProductDetailsMedia: FC<ProductDetailsMediaProps> = ({
	src,
	alt,
	isThumbnail = false,
	isSelected = false,
	posterImage = EMPTY_STRING,
	isCarouselThumbnail = false,
}) => {
	const isVideo = useMemo(() => isVideoPath(src), [src]);
	return isVideo ? (
		isThumbnail ? (
			<ProductImage
				src={posterImage ?? EMPTY_STRING}
				alt={alt}
				isThumbnail={isThumbnail}
				isSelected={isSelected}
			/>
		) : (
			<ProductDetailsVideo videoUrl={src} posterImage={posterImage} name={alt} />
		)
	) : (
		<ProductImage
			src={isCarouselThumbnail ? posterImage : src}
			alt={alt}
			isThumbnail={isThumbnail}
			isSelected={isSelected}
		/>
	);
};
