/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { headerBreak } from '@/components/content/Header/styles/break';
import { SxProps } from '@mui/material';

export const productCarouselMainImageSX: SxProps = {
	display: headerBreak({ mobile: 'none', desktop: 'block' }),
};
