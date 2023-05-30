/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const buttonVariantsStyles: Record<string, SxProps> = {
	inline: {
		color: 'primary.main',
		'&:hover': {
			color: 'primary.dark',
		},
	},
};
