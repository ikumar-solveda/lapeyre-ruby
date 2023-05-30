/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ThemeOptions } from '@mui/material/styles';

export const fonts = (basePath: string): ThemeOptions => ({
	fonts: [
		{
			family: 'Roboto',
			style: 'normal',
			display: 'swap',
			weight: 300,
			src: `url(${basePath}/fonts/Roboto-Light.ttf) format("truetype")`,
			unicodeRange: 'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
		},
		{
			family: 'Roboto',
			style: 'normal',
			display: 'swap',
			weight: 400,
			src: `url(${basePath}/fonts/Roboto-Regular.ttf) format("truetype")`,
			unicodeRange: 'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
		},
		{
			family: 'Roboto',
			style: 'normal',
			display: 'swap',
			weight: 500,
			src: `url(${basePath}/fonts/Roboto-Medium.ttf) format("truetype")`,
			unicodeRange: 'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
		},
		{
			family: 'Roboto',
			style: 'normal',
			display: 'swap',
			weight: 700,
			src: `url(${basePath}/fonts/Roboto-Bold.ttf) format("truetype")`,
			unicodeRange: 'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
		},
	],
});
