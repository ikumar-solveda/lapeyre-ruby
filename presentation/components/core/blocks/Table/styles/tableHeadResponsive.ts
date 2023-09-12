/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const tableHeadResponsiveSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
});
