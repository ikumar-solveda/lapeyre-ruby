/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ContentRecommendationEach } from '@/components/schemaOrg/blocks/ContentRecommendation/parts/Each';
import { useContentRecommendation } from '@/data/Content/ContentRecommendation';
import { ESpotProps } from '@/data/types/SchemaOrg';
import { FC } from 'react';

export const ContentRecommendation: FC<ESpotProps> = (props) => {
	const { emsName } = props;
	const { data } = useContentRecommendation(emsName);
	return (
		<>
			{data?.map((content, index) => (
				<ContentRecommendationEach key={index} content={content} emsName={emsName} />
			))}
		</>
	);
};
