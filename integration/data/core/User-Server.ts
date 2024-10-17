/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { getLocalization } from '@/data/Localization-Server';
import { getSettings } from '@/data/Settings-Server';
import { User as UserType, fetcher } from '@/data/_User';
import { DATA_KEY_USER } from '@/data/constants/dataKey';
import { Cache } from '@/data/types/Cache';
import { canBeCachedByCDN } from '@/data/utils/canBeCachedByCDN';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import { RequestParams } from 'integration/generated/query/http-client';
import { GetServerSidePropsContext } from 'next';
import { unstable_serialize as unstableSerialize } from 'swr';

export const getUser = async (
	cache: Cache,
	context: GetServerSidePropsContext
): Promise<UserType> => {
	const settings = await getSettings(cache, context);
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const routes = await getLocalization(cache, locale, 'Routes');
	const { storeId, langId } = getServerSideCommon(settings, context);
	const params: RequestParams = constructRequestParamsWithPreviewToken({
		context,
		settings,
		routes,
	});
	const props = { storeId, langId };
	const key = unstableSerialize([shrink(props), DATA_KEY_USER]);
	const value = cache.get(key) ?? fetcher(false, context)({ storeId, langId, params });
	const user = await value;
	if (canBeCachedByCDN({ context, settings, routes })) {
		user.forCDNCache = true;
	}
	cache.set(key, Promise.resolve(user));
	return user;
};
