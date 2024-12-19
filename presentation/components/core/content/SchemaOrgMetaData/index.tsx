/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { schemaOrgManifest } from '@/components/schemaOrg/manifest';
import { usePageDataFromId } from '@/data/_PageDataFromId';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { FC } from 'react';

const NullElement: FC = () => null;
export const SchemaOrgMetaData: FC = () => {
	const { data } = usePageDataFromId();
	const Schema = schemaOrgManifest[`${data?.page?.type}`] ?? NullElement;
	return (
		<FlowIfEnabled feature={EMS_STORE_FEATURE.SCHEMA_ORG_META_DATA}>
			<Schema data={data} />
		</FlowIfEnabled>
	);
};
