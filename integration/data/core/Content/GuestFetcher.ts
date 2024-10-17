/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { COOKIE_GDPR_MANAGEMENT } from '@/data/constants/privacyPolicy';
import { getCookieName } from '@/data/utils/getCookieName';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { transactionsGuestIdentity } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { Cookies } from 'react-cookie';

export const guestIdentityLoginFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (storeId: string, params: RequestParams) => {
		try {
			const cookies = new Cookies();
			const _data = COOKIE_GDPR_MANAGEMENT.reduce((acc, name) => {
				const cValue = cookies.get(getCookieName({ name, storeId }));
				return { ...acc, ...(cValue !== undefined && { [name]: cValue }) };
			}, {});
			return await transactionsGuestIdentity(true).guestIdentityLogin(
				storeId,
				{
					updateCookies: true,
				} as any,
				_data,
				params
			);
		} catch (e) {
			errorWithId(getRequestId(context), 'GuestFetcher: guestIdentityLoginFetcher: error: ', {
				error: e,
			});
			if (pub) {
				throw e;
			}
			return undefined;
		}
	};

export const guestIdentityLogoutFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (storeId: string, params: RequestParams) => {
		try {
			return await transactionsGuestIdentity(true).guestIdentityLogout(
				storeId,
				{
					updateCookies: true,
				} as any,
				params
			);
		} catch (e) {
			errorWithId(getRequestId(context), 'GuestFetcher: guestIdentityLogoutFetcher: error: ', {
				error: e,
			});
			if (pub) {
				throw e;
			}
			return undefined;
		}
	};
