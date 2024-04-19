/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SettingContext } from '@/data/context/setting';
import { useContext, useMemo } from 'react';
import useSWR from 'swr';

// some stepwise refinement
import {
	constructNextUrl,
	dAdd,
	dDiv,
	dFix,
	dMul,
	extractParamsOfConcern,
	getActiveOrganizationId,
	getAsPath,
	getContractIdParamFromContext,
	getSettings,
	isB2BStore,
} from '@/data/Settings-Server';
import { Settings as SettingsType, fetcher } from '@/data/_Settings';
import { DATA_KEY_SETTINGS } from '@/data/constants/dataKey';
import { usePathname, useSearchParams } from 'next/navigation';
export {
	constructNextUrl,
	dAdd,
	dDiv,
	dFix,
	dMul,
	extractParamsOfConcern,
	getActiveOrganizationId,
	getAsPath,
	getContractIdParamFromContext,
	getSettings,
	isB2BStore,
};
export type Settings = SettingsType;

const DATA_KEY = DATA_KEY_SETTINGS;

export const useSettings = () => {
	const settings = useContext(SettingContext);
	return {
		settings,
	};
};

export const useStaticSettings = () => {
	const path = usePathname();
	const params = useSearchParams();
	const asPath = useMemo(() => getAsPath(path, params), [path, params]);
	// static generated error pages does not have query, need to use asPath.
	const {
		queryOfConcern: { storeId, storeIdentifier },
		storeTokenCandidate,
	} = useMemo(() => extractParamsOfConcern(asPath), [asPath]);

	const props = storeId
		? {
				storeId,
				storeTokenCandidate,
		  }
		: storeIdentifier
		? {
				storeIdentifier,
				storeTokenCandidate,
		  }
		: { storeTokenCandidate };
	const { data, error } = useSWR([props, DATA_KEY], async ([props]) => fetcher(true)(props));
	return {
		settings: data,
		loading: !error && !data,
		error,
	};
};
