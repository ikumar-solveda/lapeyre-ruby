/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IncomingContent } from '@/data/types/IncomingContent';
import { getContentNameFromWidgetName } from '@/data/utils/getContentNameFromWidgetName';

export const findSlotWithWidget = (data: IncomingContent | undefined, name: string) =>
	data?.layout?.slots?.find((slot) =>
		slot.widgets?.find(({ widgetName }) => getContentNameFromWidgetName(widgetName ?? '') === name)
	);
