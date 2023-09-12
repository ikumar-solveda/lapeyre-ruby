/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';
import { Widget, WidgetProperties } from '@/data/types/Slot';

export type ContentItem = {
	name: string;
	id: ID;
	properties?: WidgetProperties;
	widgetRaw?: Widget;
};

export type LayoutAllSlots = {
	header?: ContentItem[];
	first?: ContentItem[];
	second?: ContentItem[];
	third?: ContentItem[];
	fourth?: ContentItem[];
	fifth?: ContentItem[];
	aside?: ContentItem[];
	footer?: ContentItem[];
};
