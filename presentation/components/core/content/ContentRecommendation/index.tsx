/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useContentRecommendation } from '@/data/Content/ContentRecommendation';
import { useContentEvents } from '@/data/Content/_ContentEvents';
import { ID } from '@/data/types/Basic';
import { WidgetProperties } from '@/data/types/Slot';
import { renderContent } from '@/utils/renderContent';
import { FC } from 'react';

const emptyProperties = {} as WidgetProperties;

export const ContentRecommendation: FC<{ id: ID; properties?: WidgetProperties }> = ({
	id: _id,
	properties = emptyProperties,
}) => {
	const { emsName = '' } = properties;
	const { data, loading } = useContentRecommendation(emsName);
	const { onContentClick } = useContentEvents();

	return loading ? (
		<ProgressIndicator />
	) : (
		<>{data?.map((content) => renderContent(content, onContentClick(content)))}</>
	);
};
