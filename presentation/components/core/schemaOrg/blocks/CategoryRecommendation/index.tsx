/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CategoryRecommendationEach } from '@/components/schemaOrg/blocks/CategoryRecommendation/parts/Each';
import { useCategoryRecommendation } from '@/data/Content/CategoryRecommendation';
import { ESpotProps } from '@/data/types/SchemaOrg';
import { FC } from 'react';

export const CategoryRecommendation: FC<ESpotProps> = (props) => {
	const { emsName } = props;
	const { categories } = useCategoryRecommendation(emsName);
	return (
		<>
			{categories.map((category, index) => (
				<CategoryRecommendationEach key={index} id={category.id} />
			))}
		</>
	);
};
