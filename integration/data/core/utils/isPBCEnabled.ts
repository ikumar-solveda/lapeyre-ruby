/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Settings } from '@/data/Settings';

type Props = {
	name: string;
	settings?: Settings;
};

/**
 * Returns whether the specified PBC is enabled based on the value in `Settings` from environment variable.
 *
 * @param {Props} props - The component props.
 * @param {string} props.name - The PBC name, e.g. RFQ.
 * @param {Settings} props.settings - The settings.
 * @returns {boolean} Whether the PBC is enabled.
 */
export const isPBCEnabled = ({ name, settings }: Props) =>
	!!settings?.pbc?.[`${name.toUpperCase()}_ENABLED`];
