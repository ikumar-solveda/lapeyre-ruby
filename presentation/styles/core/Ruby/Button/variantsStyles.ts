/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const buttonVariantsStyles: Record<string, SxProps<Theme>> = {
	inline: {
		color: 'primary.main',
		'&:hover': {
			color: 'primary.dark',
		},
	},
};
