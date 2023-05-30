/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { previewWidgetStyleManifest } from '@/components/preview/styles/widgets/manifest';
import { combineSX } from '@/utils/combineSX';
import { SxProps, Theme } from '@mui/material';

const _previewWidgetFrameParent: SxProps<Theme> = (theme) => ({
	position: 'relative',
	minHeight: theme.spacing(6),
});

export const previewWidgetFrameParentSX = (widgetName: string): SxProps<Theme> =>
	combineSX([
		_previewWidgetFrameParent,
		previewWidgetStyleManifest[widgetName]?.previewWidgetFrameParentSX,
	]);
