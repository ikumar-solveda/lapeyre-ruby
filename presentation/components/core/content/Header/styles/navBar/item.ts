/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const headerNavBarItemSX: SxProps = {
	'&.MuiButton-text': {
		p: 2,
		backgroundColor: 'transparent',
		color: 'text.expandedMenu',
		'&:hover': {
			backgroundColor: 'primary.main',
		},
		fontSize: 16,
		borderRadius: 0,
		'&:first-of-type': {
			ml: -2,
		},
		'&:is(a):not([href])': {
			cursor: 'default',
		},
	},
};
