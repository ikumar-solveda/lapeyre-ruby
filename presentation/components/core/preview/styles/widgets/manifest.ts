/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { facetNavigationWidgetSX } from '@/components/preview/styles/widgets/facetNavigationWidgetSX';
import { previewWidgetStylesManifestCustom } from '@/components/preview/styles/widgets/manifestCustom';
import { SxProps, Theme } from '@mui/material';

export const previewWidgetStyleManifest: {
	[key: string]: {
		previewWidgetFrameSX: SxProps<Theme>;
		previewWidgetFrameParentSX: SxProps<Theme>;
	};
} = {
	'facet-navigation-widget': facetNavigationWidgetSX,
	...previewWidgetStylesManifestCustom,
};
