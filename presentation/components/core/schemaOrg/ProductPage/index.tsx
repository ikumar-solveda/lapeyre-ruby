/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BreadcrumbTrail } from '@/components/schemaOrg/blocks/BreadcrumbTrail';
import { PRODUCT_ID } from '@/data/constants/schemaOrg';
import { useSchemaOrgForProductPage } from '@/data/Content/SchemaOrgForProductPage';
import { DataProps } from '@/data/types/SchemaOrg';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import { FC } from 'react';

export const ProductPage: FC<DataProps> = (props) => {
	const { data } = props;
	const { schema, requiresCrumb } = useSchemaOrgForProductPage(props);

	return (
		<>
			<Head>
				{HTMLReactParser(`<script
					id="${PRODUCT_ID}${data?.tokenExternalValue}"
					type="application/ld+json"
					>${schema}</script>`)}
			</Head>
			{requiresCrumb ? <BreadcrumbTrail data={data} /> : null}
		</>
	);
};
