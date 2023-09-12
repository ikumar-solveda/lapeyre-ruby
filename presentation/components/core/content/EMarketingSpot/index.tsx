/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { CatalogEntryRecommendation } from '@/components/content/CatalogEntryRecommendation';
import { CategoryRecommendation } from '@/components/content/CategoryRecommendation';
import { ContentCarousel } from '@/components/content/ContentCarousel';
import { ContentRecommendation } from '@/components/content/ContentRecommendation';
import { useEMarketingSpot } from '@/data/Content/EMarketingSpot';
import { ID } from '@/data/types/Basic';
import { WidgetProperties } from '@/data/types/Slot';
import { Stack, useTheme } from '@mui/material';
import { FC } from 'react';

const emptyProperties = {} as WidgetProperties;

export const EMarketingSpot: FC<{ id: ID; properties?: WidgetProperties }> = ({
	id,
	properties = emptyProperties,
}) => {
	const { emsName = '' } = properties;
	const { data, loading } = useEMarketingSpot(emsName);
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	if (!loading && !data.hasContent && !data.hasCategory && !data.hasCatEntry) {
		return null;
	}
	return loading ? (
		<ProgressIndicator />
	) : (
		<Stack gap={contentSpacing}>
			{data.hasContent ? (
				data.hasContentCarousel ? (
					<ContentCarousel id={id} properties={properties} />
				) : (
					<ContentRecommendation id={id} properties={properties} />
				)
			) : null}
			{data.hasCategory ? <CategoryRecommendation id={id} properties={properties} /> : null}
			{data.hasCatEntry ? <CatalogEntryRecommendation id={id} properties={properties} /> : null}
		</Stack>
	);
};
