/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

const previewWidgetFrameSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		position: 'fixed',
		top: 'auto',
		bottom: 0,
		height: theme.spacing(6),
		lineHeight: theme.spacing(6),
		padding: `0 ${theme.spacing(2)}`,
		zIndex: theme.zIndex.appBar + 1,
	},
});

const previewWidgetFrameParentSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		minHeight: 'unset',
	},
});

export const facetNavigationWidgetSX = {
	previewWidgetFrameSX,
	previewWidgetFrameParentSX,
};
