/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';

export type Slot = {
	id: string;
	widgets: Widget[];
	[key: string]: any;
};

export type Widget = {
	widgetName: string;
	name: string;
	id?: ID;
	properties?: WidgetProperties;
	[key: string]: any;
};

export type WidgetProperties = {
	emsName?: string;
	[key: string]: any;
};

export type ContentItemProperties = WidgetProperties & {
	emsName: string;
};
