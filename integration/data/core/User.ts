/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { User as UserType, fetcher } from '@/data/_User';
import { DATA_KEY_USER } from '@/data/constants/dataKey';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { getUser } from '@/data/User-Server';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import useSWR from 'swr';
export { fetcher, getUser };
export type User = UserType;

export const useUser = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	// server-side param has cookie, client does not. need to separate cookie and preview header.
	const params = useExtraRequestParameters();
	const {
		data,
		mutate: mutateUser,
		error,
	} = useSWR(storeId ? [shrink({ storeId, langId }), DATA_KEY_USER] : null, async ([props]) =>
		fetcher(true)({ ...expand(props), params })
	);

	return {
		user: data,
		mutateUser,
		loading: !error && !data,
		error,
	};
};
