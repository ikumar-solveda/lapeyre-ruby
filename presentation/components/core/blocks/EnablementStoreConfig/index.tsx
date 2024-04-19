/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useSettings } from '@/data/Settings';
import { getStoreConfig } from '@/data/storeConfig/getStoreConfig';
import { StoreEnablementConfig } from '@/data/types/StoreConfig';
import { FC, PropsWithChildren } from 'react';

type Props = {
	config: string;
};

export const ConfigIfEnabled: FC<PropsWithChildren<Props>> = ({ config, children }) => {
	const { settings } = useSettings();
	const enabled = getStoreConfig<StoreEnablementConfig>(settings, config)?.enabled || false;
	return enabled ? <>{children}</> : null;
};

export const ConfigIfDisabled: FC<PropsWithChildren<Props>> = ({ config, children }) => {
	const { settings } = useSettings();
	const enabled = getStoreConfig<StoreEnablementConfig>(settings, config)?.enabled || false;
	return enabled ? null : <>{children}</>;
};
