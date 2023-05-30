/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const headerNavBarDropMenuItemSX = ({ isParent }: { isParent: boolean }): SxProps => ({
	fontSize: isParent ? 16 : 14,
	fontWeight: isParent ? 600 : '',
	mt: isParent ? 1 : '',
	p: 0.75,
	color: 'text.primary',
	'@media (hover: hover)': {
		'&:hover': {
			color: 'primary.main',
			backgroundColor: 'transparent',
		},
	},
	'@media (hover: none)': {
		'&:focus': {
			color: 'inherit',
			backgroundColor: 'inherit',
		},
	},
});
