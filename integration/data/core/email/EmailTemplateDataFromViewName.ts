/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getUser } from '@/data/User-Server';
import { DATA_KEY_EMAIL_TEMPLATE_LOOKUP } from '@/data/constants/dataKey';
import { getTemplateNameFromViewName } from '@/data/email/utils/getTemplateNameFromViewName';
import { getLayoutForView } from '@/data/email/views';
import { Cache } from '@/data/types/Cache';
import { EmailTemplateData } from '@/data/types/EmailTemplateData';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { cookies } from 'next/headers';
import { unstable_serialize as unstableSerialize } from 'swr';

type PageDataLookup = {
	identifier: string;
};

const fetcher =
	(_pub: boolean) =>
	async ({ identifier }: PageDataLookup, _params: RequestParams): Promise<EmailTemplateData> => {
		const layout = getLayoutForView({ identifier });
		return { identifier, layout };
	};

const cacheScope = { requestScope: false };
export const getEmailTemplateDataFromViewName = async (
	cache: Cache,
	context: GetServerSidePropsContext,
	viewName: string,
	validateSession = true
) => {
	if (validateSession) {
		// validate session
		const user = await getUser(cache, context);
		if (!user || user.sessionError) {
			errorWithId(
				getRequestId(context),
				'getEmailTemplateDataFromViewName: Unable to authenticate email session',
				{
					user: user ?? 'undefined',
					sessionError: user?.sessionError ?? false,
					cookies: cookies().toString(),
				}
			);
			return undefined;
		}
	}

	// get template
	const identifier = getTemplateNameFromViewName(viewName);
	const props = { identifier };
	const key = unstableSerialize([props, DATA_KEY_EMAIL_TEMPLATE_LOOKUP]);
	const value = cache.get(key, cacheScope) || fetcher(false)(props, {});
	cache.set(key, value, cacheScope);
	return (await value) as EmailTemplateData;
};
