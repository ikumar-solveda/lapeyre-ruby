/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getContentNameFromWidgetName } from '@/data/utils/getContentNameFromWidgetName';
import { Layout } from '@/data/types/Layout';
import { getLayoutForContainer } from '@/data/containers';
import { IncomingContent } from '@/data/types/IncomingContent';

export const getNormalizedLayout = (props: IncomingContent): Layout | undefined => {
	const { layout } = props;
	return layout?.containerName
		? getLayoutForContainer(getContentNameFromWidgetName(layout.containerName), {
				...props,
				layout,
		  })
		: layout?.name
		? getLayoutForContainer(layout.name, {
				...props,
				layout,
		  })
		: undefined;
};
