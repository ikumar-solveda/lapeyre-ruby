/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { FeaturedProduct } from '@/components/content/FeaturedProduct';
import { useFeaturedProductRecommendation } from '@/data/Content/FeaturedProductRecommendation';
import { ID } from '@/data/types/Basic';
import { WidgetProperties } from '@/data/types/Slot';
import { FC } from 'react';

const emptyProperties = {} as WidgetProperties;

export const FeaturedProductRecommendation: FC<{ id: ID; properties?: WidgetProperties }> = ({
	id: _id,
	properties = emptyProperties,
}) => {
	const { emsName = '' } = properties;
	const { partNumber, clickAction, loading } = useFeaturedProductRecommendation(emsName);
	return (
		<>
			{loading ? (
				<ProgressIndicator />
			) : (
				<FeaturedProduct id={partNumber} clickAction={clickAction} />
			)}
		</>
	);
};
