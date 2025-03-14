/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { Settings, fetcher } from '@/data/_Settings';
import { DATA_KEY_SETTINGS } from '@/data/constants/dataKey';
import { Cache } from '@/data/types/Cache';
import { constructNextUrl } from '@/data/utils/constructNextUrl';
import { getAsPath } from '@/data/utils/getAsPath';

import { storeConfig } from '@/data/storeConfig';
import { extractParamsOfConcern } from '@/data/utils/extractParamsOfConcern';
import { dAdd, dDiv, dFix, dMul } from '@/data/utils/floatingPoint';
import { getActiveOrganizationId } from '@/data/utils/getActiveOrganizationId';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';
import { getRequestId } from '@/data/utils/getRequestId';
import { getStoreIdentifierFromHostMapping } from '@/data/utils/getStoreIdentifierFromHostMapping';
import { isB2BStore } from '@/data/utils/isB2BStore';
import { shrink } from '@/data/utils/keyUtil';
import { traceWithId } from '@/data/utils/loggerUtil';
import { setupPreview } from '@/data/utils/setupPreview';
import { pick } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import { unstable_serialize as unstableSerialize } from 'swr';

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
	isB2BStore,
};

const getLastItemOrSelf = (elem?: string | string[]) => (Array.isArray(elem) ? elem.at(-1) : elem);
const cacheScope = { requestScope: false };

export const getSettings = async (
	cache: Cache,
	context: GetServerSidePropsContext
): Promise<Settings> => {
	const { query = {} } = context;
	const { storeId: _storeId, storeIdentifier: _identifier, shopAsUser: _shopAsUser, path } = query;
	const storeTokenCandidate = [path ?? ''].flat(1).at(0)?.toLowerCase();
	const storeId = getLastItemOrSelf(_storeId);
	const shopAsUser = getLastItemOrSelf(_shopAsUser);
	const storeIdentifier = getLastItemOrSelf(_identifier);
	const storeIdentifierFromHost = getStoreIdentifierFromHostMapping({ context });
	const props = storeIdentifierFromHost
		? {
				storeIdentifier: storeIdentifierFromHost,
				shopAsUser,
		  }
		: storeId
		? {
				storeId,
				shopAsUser,
				storeTokenCandidate,
		  }
		: storeIdentifier
		? {
				storeIdentifier,
				shopAsUser,
				storeTokenCandidate,
		  }
		: {
				storeTokenCandidate,
				shopAsUser,
		  };
	const key = unstableSerialize([shrink(props as any), DATA_KEY_SETTINGS]);

	const cached = cache.get(key, cacheScope);
	const value = cached ?? fetcher(false, context)(props);
	const settings = await value;
	if (!settings.error) {
		cache.set(key, value, cacheScope);
	}

	// make storeConfig available to any consumers
	Object.assign(settings, { storeConfig: pick(storeConfig, [`${settings.storeId}`, 'default']) });
	settings.inPreview = setupPreview(context);

	// Prevent excessive logging -- trace only if not fetched from cache
	if (!cached) {
		traceWithId(getRequestId(context), 'getSettings: return with', {
			key,
			scope: cacheScope,
			value: settings,
		});
	}
	return settings;
};
