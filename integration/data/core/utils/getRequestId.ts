/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { REQUEST_ID_HEADER_KEY } from '@/data/constants/environment';
import { AppContextWrapper } from '@/data/types/AppRouter';
import { isAppContext } from '@/data/utils/isAppContext';
import { isNil } from 'lodash';
import { GetServerSidePropsContext } from 'next';

export const getRequestId = (ctx?: GetServerSidePropsContext) => {
	if (!isNil(ctx)) {
		if (isAppContext(ctx)) {
			return (ctx as any as AppContextWrapper).extra.requestId;
		} else {
			// req is optional chained in case `ctx` is DocumentContext
			return ctx.req?.headers[REQUEST_ID_HEADER_KEY];
		}
	} else {
		return undefined;
	}
};
