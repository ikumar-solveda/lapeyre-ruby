/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const footerSocialLinkSX: SxProps<Theme> = {
	backgroundColor: 'button.primary',
	color: 'white',
	height: (theme) => theme.spacing(5),
	width: (theme) => theme.spacing(5),
	transition: (theme) => theme.transitions.create(['opacity']),
	position: 'relative',
	'&.MuiButtonBase-root': {
		borderRadius: '50%',
	},
	'&:hover': {
		backgroundColor: 'button.primaryHover',
		color: 'white',
	},
	svg: {
		fontSize: 'button.fontSize',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translateX(-50%) translateY(-50%)',
	},
};
