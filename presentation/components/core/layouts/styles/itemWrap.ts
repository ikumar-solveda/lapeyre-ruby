/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const layoutItemWrapSX: SxProps<Theme> = {
	'&:empty': {
		display: 'none',
	},
};
