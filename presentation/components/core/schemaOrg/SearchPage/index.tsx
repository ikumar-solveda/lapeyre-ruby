/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SEARCH_ID } from '@/data/constants/schemaOrg';
import { useSchemaOrgForSearchPage } from '@/data/Content/SchemaOrgForSearchPage';
import { DataProps } from '@/data/types/SchemaOrg';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import { FC } from 'react';

export const SearchPage: FC<DataProps> = (props) => {
	const { schema } = useSchemaOrgForSearchPage(props);
	return (
		<Head>
			{HTMLReactParser(`<script
				id="${SEARCH_ID}"
				type="application/ld+json"
				>${schema}</script>`)}
		</Head>
	);
};
