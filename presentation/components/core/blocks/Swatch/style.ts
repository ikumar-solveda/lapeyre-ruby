/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material/styles';

export const swatchSX = ({
	selected = false,
	clickable = false,
	image,
}: {
	selected: boolean;
	clickable: boolean;
	image: string;
}): SxProps<Theme> => ({
	border: '2px solid white',
	overflow: 'hidden',
	boxShadow: 3,
	backgroundRepeat: 'repeat',
	backgroundImage: `url("${image}")`,
	transition: 'border-color 300ms ease-in',
	cursor: clickable ? 'pointer' : 'inherit',
	// swatch size large
	'&.MuiIconButton-sizeLarge': {
		padding: '14px',
	},
	// swatch size medium
	'&.MuiIconButton-sizeMedium': {
		padding: '10px',
	},
	...(selected && {
		borderColor: 'text.main',
		boxShadow: 4,
		svg: {
			color: 'text.main',
			fill: 'text.main',
			position: 'absolute',
		},
	}),
});
