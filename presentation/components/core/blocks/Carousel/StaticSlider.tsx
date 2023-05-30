/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { staticSliderSX } from '@/components/blocks/Carousel/styles/staticSlider';
import { BoxProps, Stack } from '@mui/material';

export const StaticSlider = (props: BoxProps) => (
	<Stack
		direction="row"
		spacing={3}
		justifyContent="center"
		alignItems="stretch"
		flexWrap="wrap"
		sx={staticSliderSX}
		{...props}
	/>
);
