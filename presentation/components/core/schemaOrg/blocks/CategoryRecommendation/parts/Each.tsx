/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useSchemaOrgForCategory } from '@/data/Content/SchemaOrgForCategory';
import { CATEGORY_ID } from '@/data/constants/schemaOrg';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import { FC, useMemo } from 'react';

export const CategoryRecommendationEach: FC<{ id: string }> = (props) => {
	const { id } = props;
	const input = useMemo(() => ({ id }), [id]);
	const { schema, identifier } = useSchemaOrgForCategory(input);
	return (
		<Head>
			{HTMLReactParser(`<script
                id="${CATEGORY_ID}${identifier}"
                type="application/ld+json"
                >${schema}</script>`)}
		</Head>
	);
};
