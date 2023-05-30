/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const numberInputControlsSX: SxProps<Theme> = {
	alignItems: 'center',
	alignSelf: 'stretch',
	color: 'text.secondary',
	'&.MuiButtonBase-root': {
		padding: 1,
	},
	'&:first-of-type': {
		ml: -1.8,
		borderRight: '1px solid',
		borderRightColor: 'text.disabled',
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},
	'&:last-of-type': {
		mr: -1.8,
		borderLeft: '1px solid',
		borderLeftColor: 'text.disabled',
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
	},
};
