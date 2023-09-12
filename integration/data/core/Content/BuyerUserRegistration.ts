/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useState } from 'react';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useSettings } from '@/data/Settings';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { transactionsPerson } from 'integration/generated/transactions';
import { ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest } from 'integration/generated/transactions/data-contracts';
import { useNotifications } from '@/data/Content/Notifications';
import { processError } from '@/data/utils/processError';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';
import { useSWRConfig } from 'swr';
import { ContentProps } from '@/data/types/ContentProps';
import { getLocalization } from '@/data/Localization';
import { ERR_CMD_INVALID_PARAM } from '@/data/constants/errors';
import { ErrorType } from '../types/Error';

const buyerRegistrar =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		data: ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest,
		params: RequestParams
	) =>
		await transactionsPerson(pub).personRegisterPersonOnUserRegistrationAdminAdd(
			storeId,
			query,
			data,
			params
		);

type BuyerUserRegistration = {
	logonId: string;
	logonPassword: string;
	logonPasswordVerify: string;
	firstName: string;
	lastName: string;
	email1: string;
	phone1: string;
	address1: string;
	address2: string;
	city: string;
	country: string;
	state: string;
	zipCode: string;
	preferredLanguage: string;
	preferredCurrency: string;
	orgName: string;
};

const initialRegistration: BuyerUserRegistration = {
	logonId: EMPTY_STRING,
	logonPassword: EMPTY_STRING,
	logonPasswordVerify: EMPTY_STRING,
	firstName: EMPTY_STRING,
	lastName: EMPTY_STRING,
	email1: EMPTY_STRING,
	phone1: EMPTY_STRING,
	address1: EMPTY_STRING,
	address2: EMPTY_STRING,
	city: EMPTY_STRING,
	country: EMPTY_STRING,
	state: EMPTY_STRING,
	zipCode: EMPTY_STRING,
	preferredLanguage: EMPTY_STRING,
	preferredCurrency: EMPTY_STRING,
	orgName: EMPTY_STRING,
};

const processBuyerUserRegistrationError = (originalError: TransactionErrorResponse): ErrorType => {
	let rc = processError(originalError as TransactionErrorResponse) as ErrorType;
	const { error, errorParameters = [] } = rc;
	if (
		error.errorKey === ERR_CMD_INVALID_PARAM &&
		(errorParameters[0] === 'parentMember' || errorParameters[0] === 'parentMemberId')
	) {
		rc = { ...rc, messageKey: `${ERR_CMD_INVALID_PARAM}_${errorParameters[0]}` };
	}
	return rc;
};

export const getBuyerUserRegistration = async ({ cache, context }: ContentProps) => {
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'RegistrationLayout'),
		getLocalization(cache, context.locale || 'en-US', 'BuyerUserRegistration'),
		getLocalization(cache, context.locale || 'en-US', 'CommerceEnvironment'),
		getLocalization(cache, context.locale || 'en-US', 'Routes'),
		getLocalization(cache, context.locale || 'en-US', 'AddressForm'),
	]);
};

export const useBuyerUserRegistration = () => {
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
	const submit = async (values: BuyerUserRegistration) => {
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
			await buyerRegistrar(true)(settings?.storeId ?? '', {}, data, params);
			await mutate(personMutatorKeyMatcher(''), undefined);
			setSuccess(true);
		} catch (e) {
			const err = processBuyerUserRegistrationError(e as TransactionErrorResponse);
			notifyError(err);
		}
	};

	return {
		initialRegistration,
		success,
		submit,
	};
};
