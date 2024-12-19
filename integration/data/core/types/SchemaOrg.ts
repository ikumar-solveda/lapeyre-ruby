/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IncomingContent } from '@/data/types/IncomingContent';
import { Widget } from '@/data/types/Slot';

export type DataProps = {
	data: IncomingContent | undefined;
};

export type WidgetProps = {
	widget: Widget;
};

export type ESpotProps = {
	emsName: string;
};

export type ProductDataProps = {
	partNumber?: string;
};

export type CategoryDataProps = {
	id?: string;
	parentCategoryId?: string;
};
