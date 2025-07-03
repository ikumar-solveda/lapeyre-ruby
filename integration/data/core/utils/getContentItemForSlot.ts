/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SLOT_MAP } from '@/data/constants/layout';
import { IncomingContent } from '@/data/types/IncomingContent';
import { LayoutAllSlots } from '@/data/types/LayoutAllSlots';
import { Widget } from '@/data/types/Slot';
import { getContentNameFromWidgetName } from '@/data/utils/getContentNameFromWidgetName';
import { getWidgetId } from '@/data/utils/getWidgetId';
export const getContentItemForSlot = (props: IncomingContent, slot: keyof LayoutAllSlots) => {
	const { layout } = props;
	return (
		layout?.slots
			?.find(({ id }) => id === SLOT_MAP[slot])
			?.widgets.map((widget: Widget) => {
				const { widgetName } = widget;
				return {
					name: getContentNameFromWidgetName(widgetName),
					id: getWidgetId(props),
					widgetRaw: { ...widget },
					properties: widget.properties,
				};
			}) || []
	);
};
