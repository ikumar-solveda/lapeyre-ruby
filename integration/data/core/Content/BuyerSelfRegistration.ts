/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { useCartSWRKey } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { usePrivacyAndMarketing } from '@/data/Content/PrivacyAndMarketing';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { buyerRegistrar } from '@/data/Content/_BuyerRegistrar';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { logoutFetcher } from '@/data/Content/_Logout';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getLocalization, useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import {
	DEFAULT_ORG_NAME,
	initialBuyerSelfRegistrationValue,
} from '@/data/constants/buyerSelfRegistration';
import { REGISTRATION_APPROVAL_STATUS_PENDING } from '@/data/constants/user';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { BuyerSelfRegistrationValueType } from '@/data/types/BuyerSelfRegistration';
import { ContentProps } from '@/data/types/ContentProps';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';
import { processBuyerRegistrationError } from '@/data/utils/processBuyerRegistrationError';
import type { ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest } from 'integration/generated/transactions/data-contracts';
import { isUndefined } from 'lodash';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

export const getBuyerSelfRegistration = async ({ cache, context }: ContentProps) => {
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await Promise.all([
		getLocalization(cache, locale, 'RegistrationLayout'),
		getLocalization(cache, locale, 'BuyerUserRegistration'),
		getLocalization(cache, locale, 'CommerceEnvironment'),
		getLocalization(cache, locale, 'Routes'),
		getLocalization(cache, locale, 'AddressForm'),
	]);
};

export const useBuyerSelfRegistration = () => {
	const { settings } = useSettings();
	const storeId = settings.storeId;
	const [success, setSuccess] = useState<boolean>(false);
	const { mutate } = useSWRConfig();
	const router = useNextRouter();
	const params = useExtraRequestParameters();
	const localization = useLocalization('BuyerUserRegistration');
	const { notifyError, showErrorMessage } = useNotifications();
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const parseParentOrg = (orgName: string) => {
		const regex = new RegExp('/', 'ig');
		if (orgName.match(regex)) {
			const arr = orgName.split('/');
			return `o=${arr[0]},o=${arr[1]}`;
		} else {
			return `o=${orgName}`;
		}
	};
	const { privacyNoticeVersion, setPrivacyNoticeVersion, setMarketingTrackingConsent } =
		usePrivacyAndMarketing();
	const submit = async (values: BuyerSelfRegistrationValueType) => {
		const { orgName, address1, address2, marketingTrackingConsent: _consent, ...others } = values;
		if (orgName === DEFAULT_ORG_NAME) {
			showErrorMessage(localization.DefaultOrgMsg.t({ orgName }));
			scrollTo(0, 0);
			return;
		} else {
			const privacyData = {
				...(!isUndefined(_consent) && { marketingTrackingConsent: _consent ? '1' : '0' }),
				...(!isUndefined(privacyNoticeVersion) && {
					privacyNoticeVersion: String(privacyNoticeVersion),
				}),
			};
			const organizationDistinguishedName = parseParentOrg(orgName);
			const addressLine = [address1, address2];
			const data = {
				receiveSMSNotification: 'false',
				receiveSMS: 'false',
				registerType: 'G',
				primary: 'true',
				isBuyerUser: 'true',
				challengeQuestion: '-',
				challengeAnswer: '-',
				usr_profileType: 'B',
				addressType: 'SB',
				receiveEmail: 'false',
				appendRootOrganizationDN: 'true',
				ancestorOrgs: orgName,
				organizationDistinguishedName,
				addressLine,
				...others,
			} as ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest;
			try {
				const user = await buyerRegistrar(true)(
					storeId,
					{ updateCookies: true },
					{ ...data, ...privacyData },
					params
				);
				privacyData.privacyNoticeVersion &&
					setPrivacyNoticeVersion(dFix(privacyData.privacyNoticeVersion));
				privacyData.marketingTrackingConsent &&
					setMarketingTrackingConsent(dFix(privacyData.marketingTrackingConsent));
				if (user.registrationApprovalStatus === REGISTRATION_APPROVAL_STATUS_PENDING) {
					await logoutFetcher(true)(storeId, { updateCookies: true }, params); // delete potential guest shopper cookies to avoid session error.
					await mutate(personMutatorKeyMatcher(''), undefined);
					await mutate(cartMutatorKeyMatcher('')); // at current page
					setSuccess(true);
					// Do we need to handle rejected case?
				} else {
					// auto approval
					await mutate(personMutatorKeyMatcher(''), undefined);
					await mutate(cartMutatorKeyMatcher('')); // at current page
					await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // all cart except current cart, e.g different locale
					await router.push('/');
				}
				return user;
			} catch (e) {
				const err = processBuyerRegistrationError(e as TransactionErrorResponse);
				notifyError(err);
				return undefined;
			}
		}
	};

	return {
		success,
		submit,
		/**
		 * @deprecated direct `import { initialBuyerSelfRegistrationValue } from '@/data/constants/buyerSelfRegistration';`
		 */
		initialRegistration: initialBuyerSelfRegistrationValue,
	};
};
