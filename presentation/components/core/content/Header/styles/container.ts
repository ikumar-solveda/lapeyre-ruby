/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { headerBreak } from '@/components/content/Header/styles/break';
import { SxProps, Theme } from '@mui/material';

export const headerContainerSX: SxProps<Theme> = (theme: Theme) => ({
	backgroundColor: 'background.paper',
	boxShadow: 2,
	borderRadius: 0,
	top: 0,
	position: headerBreak({ mobile: 'sticky', desktop: 'relative' }),
	// lower zIndex because store locator autocomplete zIndex is 1000
	zIndex: headerBreak({ mobile: `${theme.zIndex.mobileStepper}`, desktop: 'unset' }),
	img: {
		mt: 0.5,
		height: { md: 32, xs: 24 },
	},
	overflow: 'unset',
});
