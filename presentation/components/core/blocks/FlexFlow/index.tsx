/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { FC, PropsWithChildren } from 'react';

type Props = {
	feature: string;
};

export const FlowIfEnabled: FC<PropsWithChildren<Props>> = ({ feature, children }) => {
	const {
		data: { featureEnabled },
	} = useFlexFlowStoreFeature({ id: feature });
	return featureEnabled ? <>{children}</> : null;
};

export const FlowIfDisabled: FC<PropsWithChildren<Props>> = ({ feature, children }) => {
	const {
		data: { featureEnabled },
	} = useFlexFlowStoreFeature({ id: feature });
	return featureEnabled ? null : <>{children}</>;
};
