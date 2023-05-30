/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ESpotContainerType } from '@/data/Content/_ESpotDataFromName';
import { Widget } from '@/data/types/Slot';

export type WidgetData = {
	widget: Widget;
	marketingSpotData?: ESpotContainerType['MarketingSpotData'];
};
export type PreviewMessage = {
	data: any | WidgetData;
	action: PreviewAction;
};

export type PreviewAction =
	| 'PREVIEW_SHOW_PAGE_INFORMATION'
	| 'PREVIEW_HIDE_PAGE_INFORMATION'
	| 'PREVIEW_LAYOUT_INITIALIZED'
	| 'PREVIEW_SHOW_WIDGET_INFO'
	| 'PREVIEW_NO_OP';
