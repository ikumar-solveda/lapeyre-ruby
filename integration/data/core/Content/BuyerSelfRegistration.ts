/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { buyerRegistrar } from '@/data/Content/_BuyerRegistrar';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { initialBuyerSelfRegistrationValue } from '@/data/constants/buyerSelfRegistration';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { BuyerSelfRegistrationValueType } from '@/data/types/BuyerSelfRegistration';
import { ContentProps } from '@/data/types/ContentProps';
import { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';
import { processBuyerRegistrationError } from '@/data/utils/processBuyerRegistrationError';
import { ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest } from 'integration/generated/transactions/data-contracts';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

export const getBuyerSelfRegistration = async ({ cache, context }: ContentProps) => {
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'RegistrationLayout'),
		getLocalization(cache, context.locale || 'en-US', 'BuyerUserRegistration'),
		getLocalization(cache, context.locale || 'en-US', 'CommerceEnvironment'),
		getLocalization(cache, context.locale || 'en-US', 'Routes'),
		getLocalization(cache, context.locale || 'en-US', 'AddressForm'),
	]);
};

export const useBuyerSelfRegistration = () => {
	const { settings } = useSettings();
	const [success, setSuccess] = useState<boolean>(false);
	const { mutate } = useSWRConfig();
	const params = useExtraRequestParameters();
	const { notifyError } = useNotifications();
	const parseParentOrg = (orgName: string) => {
		const regex = new RegExp('/', 'ig');
		if (orgName.match(regex)) {
			const arr = orgName.split('/');
			return `o=${arr[0]},o=${arr[1]}`;
		} else {
			return `o=${orgName}`;
		}
	};
	const submit = async (values: BuyerSelfRegistrationValueType) => {
		const { orgName, address1, address2, ...others } = values;
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
			const user = await buyerRegistrar(true)(settings?.storeId ?? '', {}, data, params);
			await mutate(personMutatorKeyMatcher(''), undefined);
			setSuccess(true);
			return user;
		} catch (e) {
			const err = processBuyerRegistrationError(e as TransactionErrorResponse);
			notifyError(err);
			return undefined;
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
