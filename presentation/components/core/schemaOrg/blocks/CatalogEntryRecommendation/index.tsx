/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CatalogEntryRecommendationEach } from '@/components/schemaOrg/blocks/CatalogEntryRecommendation/parts/Each';
import { useCatalogEntryRecommendation } from '@/data/Content/CatalogEntryRecommendation';
import { ESpotProps } from '@/data/types/SchemaOrg';
import { FC } from 'react';

export const CatalogEntryRecommendation: FC<ESpotProps> = (props) => {
	const { emsName } = props;
	const { partNumbers } = useCatalogEntryRecommendation(emsName);
	return (
		<>
			{partNumbers.map((partNumber, index) => (
				<CatalogEntryRecommendationEach key={index} partNumber={partNumber} />
			))}
		</>
	);
};
