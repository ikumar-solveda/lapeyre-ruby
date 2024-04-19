/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { useState } from 'react';

import { useCartSWRKey } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { buyerOrganizationRegistrar } from '@/data/Content/_BuyerOrganizationRegistration';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { logoutFetcher } from '@/data/Content/_Logout';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { getLocalization } from '@/data/Localization-Server';
import { useUser } from '@/data/User';
import { GENERIC_USER_ID, REGISTRATION_APPROVAL_STATUS_APPROVED } from '@/data/constants/user';
import { ContentProps } from '@/data/types/ContentProps';
import { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { cartMutatorKeyMatcher } from '@/utils/mutatorKeyMatchers';
import { ComIbmCommerceRestMemberHandlerOrganizationHandlerBuyerRegistrationAddRequest } from 'integration/generated/transactions/data-contracts';
import { useSWRConfig } from 'swr';

type BuyerOrganizationRegistration = {
	org_orgEntityName: string;
	org_address1: string;
	org_address2: string;
	org_city: string;
	org_country: string;
	org_state: string;
	org_zipCode: string;
	org_email1: string;
	org_phone1: string;
};
type BuyerAdminRegistration = {
	usr_logonId: string;
	usr_logonPassword: string;
	usr_logonPasswordVerify: string;
	usr_firstName: string;
	usr_lastName: string;
	usr_address1: string;
	usr_address2: string;
	usr_city: string;
	usr_country: string;
	usr_state: string;
	usr_zipCode: string;
	usr_email1: string;
	usr_phone1: string;
	usr_preferredLanguage: string;
	usr_preferredCurrency: string;
};
type BuyerOrganizationAndAdminRegistration = BuyerOrganizationRegistration & BuyerAdminRegistration;

const initialOrgData: BuyerOrganizationRegistration = {
	org_orgEntityName: EMPTY_STRING,
	org_address1: EMPTY_STRING,
	org_address2: EMPTY_STRING,
	org_city: EMPTY_STRING,
	org_country: EMPTY_STRING,
	org_state: EMPTY_STRING,
	org_zipCode: EMPTY_STRING,
	org_email1: EMPTY_STRING,
	org_phone1: EMPTY_STRING,
};
const initialOrgAndAdminData: BuyerOrganizationAndAdminRegistration = {
	...initialOrgData,
	usr_logonId: EMPTY_STRING,
	usr_logonPassword: EMPTY_STRING,
	usr_logonPasswordVerify: EMPTY_STRING,
	usr_firstName: EMPTY_STRING,
	usr_lastName: EMPTY_STRING,
	usr_address1: EMPTY_STRING,
	usr_address2: EMPTY_STRING,
	usr_city: EMPTY_STRING,
	usr_country: EMPTY_STRING,
	usr_state: EMPTY_STRING,
	usr_zipCode: EMPTY_STRING,
	usr_email1: EMPTY_STRING,
	usr_phone1: EMPTY_STRING,
	usr_preferredLanguage: EMPTY_STRING,
	usr_preferredCurrency: EMPTY_STRING,
};

export const getBuyerOrganizationRegistration = async ({ cache, context }: ContentProps) => {
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'RegistrationLayout'),
		getLocalization(cache, context.locale || 'en-US', 'BuyerOrganizationRegistration'),
		getLocalization(cache, context.locale || 'en-US', 'CommerceEnvironment'),
		getLocalization(cache, context.locale || 'en-US', 'Routes'),
		getLocalization(cache, context.locale || 'en-US', 'AddressForm'),
	]);
};

export const useBuyerOrganizationRegistration = () => {
	const { settings } = useSettings();
	const storeId = settings?.storeId ?? '';
	const [success, setSuccess] = useState<boolean>(false);
	const { user } = useUser();
	const { mutate } = useSWRConfig();
	const router = useNextRouter();
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const { notifyError, showSuccessMessage } = useNotifications();
	const params = useExtraRequestParameters();
	const buyerOrganizationRegistrationNLS = useLocalization('BuyerOrganizationRegistration');
	const RouteLocal = useLocalization('Routes');
	const [activeStep, setActiveStep] = useState<number>(0);
	const steps: number[] = [0, 1];
	const [checked, setChecked] = useState<boolean>(false);
	const [formData, setFormData] =
		useState<BuyerOrganizationAndAdminRegistration>(initialOrgAndAdminData);

	const submit = async (values: BuyerOrganizationAndAdminRegistration) => {
		const { org_orgEntityName, usr_logonId, usr_logonPassword, usr_logonPasswordVerify, ...all } =
			values;

		if (checked) {
			const {
				org_address1: usr_address1,
				org_address2: usr_address2,
				org_city: usr_city,
				org_country: usr_country,
				org_state: usr_state,
				org_zipCode: usr_zipCode,
			} = all;
			Object.assign(all, {
				usr_address1,
				usr_address2,
				usr_city,
				usr_country,
				usr_state,
				usr_zipCode,
			});
		}

		const data = {
			receiveSMSNotification: false,
			receiveSMS: false,
			page: 'account',
			registerType: 'G',
			primary: true,
			isBuyerUser: true,
			challengeQuestion: '-',
			challengeAnswer: '-',
			usr_profileType: 'B',
			approvalGroups: 'orderProcess',
			registerOrg: true,
			org_orgEntityName: [org_orgEntityName],
			usr_logonId: [usr_logonId],
			usr_logonPassword: [usr_logonPassword],
			usr_logonPasswordVerify: [usr_logonPasswordVerify],
			...all,
		} as ComIbmCommerceRestMemberHandlerOrganizationHandlerBuyerRegistrationAddRequest;

		try {
			const resp = await buyerOrganizationRegistrar(true)(storeId, data, {}, params);
			if (resp.registrationApprovalStatus === REGISTRATION_APPROVAL_STATUS_APPROVED) {
				// auto approval
				await mutate(personMutatorKeyMatcher(''), undefined);
				await mutate(cartMutatorKeyMatcher('')); // at current page
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // all cart except current cart, e.g different locale
				if (user && user.userId === GENERIC_USER_ID) {
					// generic user go to login page, and show success message
					await router.push({ pathname: RouteLocal.Login.route.t() });
					showSuccessMessage(buyerOrganizationRegistrationNLS.AutoApproved.t());
				} else {
					await router.push('/');
				}
			} else {
				await logoutFetcher(true)(storeId, { updateCookies: true }, params); // delete potential guest shopper cookies to avoid session error.
				await mutate(personMutatorKeyMatcher(''), undefined);
				await mutate(cartMutatorKeyMatcher('')); // at current page
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // all cart except current cart, e.g different locale
				setSuccess(true);
			}
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

	const onStep = (targetStep: number) => () => setActiveStep(targetStep);

	const submitOrg = (orgData: BuyerOrganizationRegistration) => {
		setFormData((old) => ({ ...old, ...orgData }));
		onStep(1)();
	};

	const updateForm = (formData: BuyerOrganizationAndAdminRegistration) => {
		setFormData((old) => ({ ...old, ...formData }));
	};

	return {
		initialOrgAndAdminData,
		initialOrgData,
		success,
		activeStep,
		submit,
		setActiveStep,
		steps,
		setChecked,
		checked,
		submitOrg,
		updateForm,
		onStep,
		formData,
	};
};
