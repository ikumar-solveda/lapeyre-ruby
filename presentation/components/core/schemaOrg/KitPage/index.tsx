/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BreadcrumbTrail } from '@/components/schemaOrg/blocks/BreadcrumbTrail';
import { KIT_ID } from '@/data/constants/schemaOrg';
import { useSchemaOrgForKitPage } from '@/data/Content/SchemaOrgForKitPage';
import { DataProps } from '@/data/types/SchemaOrg';
import HTMLReactParser from 'html-react-parser';
import Head from 'next/head';
import { FC } from 'react';

export const KitPage: FC<DataProps> = (props) => {
	const { data } = props;
	const { schema, requiresCrumb } = useSchemaOrgForKitPage(props);

	return (
		<>
			<Head>
				{HTMLReactParser(`<script
					id="${KIT_ID}${data?.tokenExternalValue}"
					type="application/ld+json"
					>${schema}</script>`)}
			</Head>
			{requiresCrumb ? <BreadcrumbTrail data={data} /> : null}
		</>
	);
};
