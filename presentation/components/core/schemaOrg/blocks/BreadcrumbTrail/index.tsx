/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BREADCRUMB_TRAIL_ID } from '@/data/constants/schemaOrg';
import { useSchemaOrgForBreadcrumbTrail } from '@/data/Content/SchemaOrgForBreadcrumbTrail';
import { DataProps } from '@/data/types/SchemaOrg';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import { FC } from 'react';

export const BreadcrumbTrail: FC<DataProps> = (props) => {
	const { data } = props;
	const { schema } = useSchemaOrgForBreadcrumbTrail(props);
	return (
		<Head>
			{HTMLReactParser(`<script
				id="${BREADCRUMB_TRAIL_ID}${data?.tokenExternalValue}"
				type="application/ld+json"
				>${schema}</script>`)}
		</Head>
	);
};
