/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Img } from '@/components/blocks/MaterialImage';
import { productImageBaseSX } from '@/components/blocks/ProductImage/styles/base';
import { productImageSelectedSX } from '@/components/blocks/ProductImage/styles/selected';
import { productImageThumbnailSX } from '@/components/blocks/ProductImage/styles/thumbnail';
import { combineSX } from '@/utils/combineSX';
import { SxProps, Theme } from '@mui/material';
import React from 'react';

type Props = {
	src: string;
	alt: string;
	isThumbnail?: boolean;
	isSelected?: boolean;
	sx?: SxProps<Theme>;
};

export const ProductImage: React.FC<Props> = ({ src, alt, isSelected, isThumbnail, sx }) =>
	src ? (
		<Img
			sx={combineSX([
				productImageBaseSX,
				isThumbnail && productImageThumbnailSX,
				isSelected && productImageSelectedSX,
				sx,
			])}
			src={src}
			alt={alt}
		/>
	) : null;
