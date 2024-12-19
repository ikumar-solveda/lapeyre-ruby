/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BreadcrumbTrail } from '@/components/schemaOrg/blocks/BreadcrumbTrail';
import { CATEGORY_ID } from '@/data/constants/schemaOrg';
import { useSchemaOrgForCategoryPage } from '@/data/Content/SchemaOrgForCategoryPage';
import { DataProps } from '@/data/types/SchemaOrg';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import { FC } from 'react';

export const CategoryPage: FC<DataProps> = (props) => {
	const { data } = props;
	const { schema, requiresCrumb } = useSchemaOrgForCategoryPage(props);
	return (
		<>
			<Head>
				{HTMLReactParser(`<script
					id="${CATEGORY_ID}${data?.tokenExternalValue}"
					type="application/ld+json"
					>${schema}</script>`)}
			</Head>
			{requiresCrumb ? <BreadcrumbTrail data={data} /> : null}
		</>
	);
};
