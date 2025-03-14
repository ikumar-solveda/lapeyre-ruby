/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useSettings } from '@/data/Settings';
import { FC, PropsWithChildren } from 'react';

type Props = {
	name: string;
};

/**
 * Renders the children components only if the specified PBC is enabled.
 * Whether the PBC is enabled is determined by the value in `Settings` from environment variable.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.name - The PBC name, e.g. RFQ.
 * @param {ReactNode} props.children - The children components to render.
 * @returns {ReactNode} The rendered children components if the PBC is enabled, otherwise null.
 */
export const PBCIfEnabled: FC<PropsWithChildren<Props>> = ({ name, children }) => {
	const { settings } = useSettings();
	const enabled = !!settings.pbc?.[`${name.toUpperCase()}_ENABLED`];
	return enabled ? <>{children}</> : null;
};

/**
 * Renders the children components only if the specified PBC is disabled.
 * Whether the PBC is enabled is determined by the value in `Settings` from environment variable.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.name - The PBC name.
 * @param {ReactNode} props.children - The children components to render.
 * @returns {ReactNode} The rendered children components if the PBC is disabled, otherwise null.
 */
export const PBCIfDisabled: FC<PropsWithChildren<Props>> = ({ name, children }) => {
	const { settings } = useSettings();
	const enabled = !!settings.pbc?.[`${name.toUpperCase()}_ENABLED`];
	return enabled ? null : <>{children}</>;
};
