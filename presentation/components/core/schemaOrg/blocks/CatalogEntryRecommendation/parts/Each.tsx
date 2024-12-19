/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { PRODUCT_ID } from '@/data/constants/schemaOrg';
import { useSchemaOrgForProduct } from '@/data/Content/SchemaOrgForProduct';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import { FC } from 'react';

export const CatalogEntryRecommendationEach: FC<{ partNumber: string }> = (props) => {
	const { partNumber } = props;
	const { schema } = useSchemaOrgForProduct({ partNumber });

	return (
		<Head>
			{HTMLReactParser(`<script
					id="${PRODUCT_ID}${partNumber}"
					type="application/ld+json"
					>${schema}</script>`)}
		</Head>
	);
};
