/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { previewWidgetStyleManifest } from '@/components/preview/styles/widgets/manifest';
import { combineSX } from '@/utils/combineSX';
import { SxProps, Theme } from '@mui/material';

const _previewWidgetFrameSX =
	(showInfo: boolean): SxProps<Theme> =>
	(theme) => ({
		position: 'absolute',
		border: '2px dashed',
		borderRadius: '4px',
		borderColor: 'info.light',
		height: '100%',
		width: '100%',
		top: 0,
		left: 0,
		zIndex: 5,
		pointerEvents: 'none',
		'&:hover': {
			backgroundColor: `${theme.palette.info.dark}55`,
		},
		...(!showInfo && { display: 'none' }),
	});

export const previewWidgetFrameSX = (showInfo: boolean, widgetName: string): SxProps<Theme> =>
	combineSX([
		_previewWidgetFrameSX(showInfo),
		previewWidgetStyleManifest[widgetName]?.previewWidgetFrameSX,
	]);
