/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { FlowIfEnabled } from '@/components/blocks/FlexFlow';
import { openGraphManifest } from '@/components/openGraph/manifest';
import { usePageDataFromId } from '@/data/_PageDataFromId';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { FC } from 'react';

const NullElement: FC = () => null;
export const OpenGraph: FC = () => {
	const { data } = usePageDataFromId();
	const OpenGraph = openGraphManifest[`${data?.page?.type}`] ?? NullElement;
	return (
		<FlowIfEnabled feature={EMS_STORE_FEATURE.OPEN_GRAPH}>
			<OpenGraph data={data} />
		</FlowIfEnabled>
	);
};
