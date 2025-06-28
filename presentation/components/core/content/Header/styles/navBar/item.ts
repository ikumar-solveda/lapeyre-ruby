/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const headerNavBarItemSX: SxProps = {
	'&.MuiButton-text': {
		pt: 2,
		pb: 2,
		pl: 1,
		pr: 1,
		backgroundColor: 'transparent',
		color: 'primary.redExtraDark',
		'&:hover': {
			backgroundColor: 'secondary.blueExtraLight',
			'&::after': {
				position: 'absolute',
				bottom: '0px',
				left: '0px',
				content: `' '`,
				width: '100%',
				height: '4px',
				backgroundColor: '#eb002d',
				transition: 'transform 0.3s',
				transform: 'scaleX(1)',
				transformOrigin: 'left center',
			},
		},
		fontSize: 12,
		borderRadius: 0,
		fontWeight: 400,
		'&:first-of-type': {
			ml: -2,
		},
		'&:is(a):not([href])': {
			cursor: 'default',
		},
	},
};
