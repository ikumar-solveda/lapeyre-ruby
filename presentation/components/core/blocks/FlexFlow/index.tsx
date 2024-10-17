/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { FC, PropsWithChildren } from 'react';

type Props = {
	feature: string;
};

/**
 * Renders the children components only if the specified flexflow feature is enabled.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.feature - The feature ID.
 * @param {ReactNode} props.children - The children components to render.
 * @returns {ReactNode} The rendered children components if the feature is enabled, otherwise null.
 */
export const FlowIfEnabled: FC<PropsWithChildren<Props>> = ({ feature, children }) => {
	const {
		data: { featureEnabled },
	} = useFlexFlowStoreFeature({ id: feature });
	return featureEnabled ? <>{children}</> : null;
};

/**
 * Renders the children components only if the specified flexflow feature is disabled.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.feature - The feature ID.
 * @param {ReactNode} props.children - The children components to render.
 * @returns {ReactNode} The rendered children components if the feature is disabled, otherwise null.
 */
export const FlowIfDisabled: FC<PropsWithChildren<Props>> = ({ feature, children }) => {
	const {
		data: { featureEnabled },
	} = useFlexFlowStoreFeature({ id: feature });
	return featureEnabled ? null : <>{children}</>;
};
