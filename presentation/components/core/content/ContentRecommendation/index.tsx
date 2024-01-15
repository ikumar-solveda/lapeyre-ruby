/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { RenderContent } from '@/components/blocks/RenderContent';
import { useContentRecommendation } from '@/data/Content/ContentRecommendation';
import { useContentEvents } from '@/data/Content/_ContentEvents';
import { ID } from '@/data/types/Basic';
import { WidgetProperties } from '@/data/types/Slot';
import { Box } from '@mui/material';
import { FC } from 'react';

const emptyProperties = {} as WidgetProperties;

export const ContentRecommendation: FC<{ id: ID; properties?: WidgetProperties }> = ({
	id: _id,
	properties = emptyProperties,
}) => {
	const { emsName = '' } = properties;
	const { data, loading, title } = useContentRecommendation(emsName);
	const { onContentClick } = useContentEvents();

	return loading ? (
		<ProgressIndicator />
	) : (
		<Box>
			{title?.map((content) => (
				<RenderContent
					key={`${content.id}${content.contentId}`}
					content={content}
					onClick={onContentClick(content)}
				/>
			))}
			{data?.map((content) => (
				<RenderContent
					key={`${content.id}${content.contentId}`}
					content={content}
					onClick={onContentClick(content)}
				/>
			))}
		</Box>
	);
};
