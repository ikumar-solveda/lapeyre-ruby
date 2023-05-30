/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { useUser } from '@/data/User';
import { transactionsPerson } from 'integration/generated/transactions';
import { ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest } from 'integration/generated/transactions/data-contracts';
import { useNotifications } from '@/data/Content/Notifications';
import { processError } from '@/data/utils/processError';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getLocalization } from '@/data/Localization';
import { ContentProps } from '@/data/types/ContentProps';
import { personMutatorKeyMatcher } from '@/data/utils/personMutatorKeyMatcher';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { useSWRConfig } from 'swr';

const registrationFetcher =
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

type UserRegistration = {
	email: string;
	firstName: string;
	lastName: string;
	logonPassword: string;
	logonPasswordVerify: string;
	receiveEmail: boolean;
	rememberMe: boolean;
};

const initialRegistration: UserRegistration = {
	email: '',
	firstName: '',
	lastName: '',
	logonPassword: '',
	logonPasswordVerify: '',
	receiveEmail: false,
	rememberMe: false,
};

export const getRegistration = async ({ cache, context }: ContentProps) => {
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'RegistrationLayout'),
		getLocalization(cache, context.locale || 'en-US', 'Routes'),
	]);
};

export const useRegistration = () => {
	const { settings } = useSettings();
	const { mutateUser } = useUser();
	const { mutate } = useSWRConfig();
	const router = useNextRouter();
	const params = useExtraRequestParameters();
	const { notifyError } = useNotifications();
	const { langId: preferredLanguage } = getClientSideCommon(settings, router);

	const registrationSubmit = async (props: UserRegistration) => {
		const { rememberMe, receiveEmail, ...rest } = props;

		const data = <ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest>{
			...rest,
			logonId: props.email,
			email1: props.email,
			receiveEmail: receiveEmail.toString(),
			preferredLanguage,
			profileType: 'C',
			challengeQuestion: '-',
			challengeAnswer: '-',
			receiveEmailPreference: [
				{ value: receiveEmail.toString(), storeId: settings?.storeId ?? '' },
			],
		};
		try {
			await registrationFetcher(true)(
				settings?.storeId ?? '',
				{ rememberMe, updateCookies: 'true' },
				data,
				params
			);
			await router.push('/');
			mutateUser();
			mutate(personMutatorKeyMatcher(''), undefined);
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

	return {
		registrationSubmit,
		initialRegistration,
	};
};
