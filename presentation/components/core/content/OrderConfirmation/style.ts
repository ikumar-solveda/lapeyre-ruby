/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

type Props = {
	size: number;
	bgColor?: string;
	iconColor?: string;
};

export const iconSX = ({ size, iconColor }: Props): SxProps => ({
	position: 'relative',
	display: 'inline-block',
	height: size,
	width: size,
	borderRadius: '50%',
	color: iconColor ?? 'primary.dark',
	opacity: '0.9',

	'&:hover': {
		opacity: 1,
	},

	'.MuiSvgIcon-root': {
		fontSize: size,
	},
});
