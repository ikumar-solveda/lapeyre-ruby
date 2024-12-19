/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CatalogEntryRecommendation } from '@/components/schemaOrg/blocks/CatalogEntryRecommendation';
import { CategoryRecommendation } from '@/components/schemaOrg/blocks/CategoryRecommendation';
import { ContentRecommendation } from '@/components/schemaOrg/blocks/ContentRecommendation';
import { useEMarketingSpot } from '@/data/Content/EMarketingSpot';
import { WidgetProps } from '@/data/types/SchemaOrg';
import { FC } from 'react';

export const EMarketingSpot: FC<WidgetProps> = (props) => {
	const { widget } = props;
	const { data } = useEMarketingSpot(widget?.properties?.emsName as string);
	return (
		<>
			{data.hasContent ? (
				!data.hasContentCarousel ? (
					<ContentRecommendation emsName={widget?.properties?.emsName as string} />
				) : null
			) : null}
			{data.hasCategory ? (
				<CategoryRecommendation emsName={widget?.properties?.emsName as string} />
			) : null}
			{data.hasCatEntry ? (
				<CatalogEntryRecommendation emsName={widget?.properties?.emsName as string} />
			) : null}
		</>
	);
};
