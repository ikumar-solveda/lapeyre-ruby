/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { transactionsCheckoutProfile } from 'integration/generated/transactions';
import { useState, useMemo, ChangeEvent, useCallback } from 'react';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { useSettings } from '@/data/Settings';
import useSWR from 'swr';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import { get } from 'lodash';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { PersonSingleContact } from 'integration/generated/transactions/data-contracts';
import { RequestQuery } from '@/data/types/RequestQuery';
import { useNotifications } from '@/data/Content/Notifications';
import { processError } from '@/data/utils/processError';
import { usePersonContact } from '@/data/Content/PersonContact';
import { useLocalization } from '@/data/Localization';
import { CheckoutProfileData } from '@/data/types/CheckoutProfiles';
import { useSelectedProfileState } from '@/data/state/useCheckoutProfileState';
import { SelectChangeEvent } from '@mui/material';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { checkoutProfileValidator } from '@/data/utils/checkoutProfileValidator';
import { checkoutProfileMapper } from '@/data/utils/checkoutProfileMapper';
import { DATA_KEY_CHECKOUT_PROFILES } from '@/data/constants/dataKey';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';

type ModifyStates = 0 | 1 | 2; // 1 is create, 2 is edit, 0 is read-only
export type ModifyContext = {
	state: ModifyStates;
	profile?: CheckoutProfileData;
};

export const checkoutProfilesFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: Record<string, string | boolean | ID[] | number>,
		params: RequestParams
	) =>
		await transactionsCheckoutProfile(pub).checkoutProfileGetCheckoutProfile(
			storeId,
			query,
			params
		);

const checkoutProfileRemover =
	(pub: boolean) =>
	async (
		storeId: string,
		checkoutProfileId: string,
		query: RequestQuery = {},
		params: RequestParams
	) =>
		await transactionsCheckoutProfile(pub).checkoutProfileDeleteCheckoutProfile(
			storeId,
			checkoutProfileId,
			query,
			params
		);

const EMPTY_ARRAY: PersonSingleContact[] = [];

export const useCheckoutProfiles = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { shippingAddress = EMPTY_ARRAY, billingAddress = EMPTY_ARRAY } = usePersonContact();
	const [modifyState, setModifyState] = useState<ModifyContext>({ state: 0 });
	const { notifyError, showSuccessMessage } = useNotifications();
	const success = useLocalization('success-message');
	const checkoutShippingAddresses: PersonSingleContact[] = useMemo(
		() => shippingAddress.filter((a) => a.hasOwnProperty('addressLine')),
		[shippingAddress]
	);
	const checkoutBillingAddresses: PersonSingleContact[] = useMemo(
		() => billingAddress.filter((a) => a.hasOwnProperty('addressLine')),
		[billingAddress]
	);

	const {
		data,
		error,
		mutate: mutateCheckoutProfiles,
	} = useSWR(
		storeId && shippingAddress.length > 0 && billingAddress.length > 0
			? [{ storeId, query: { langId, responseFormat: 'json' } }, DATA_KEY_CHECKOUT_PROFILES]
			: null,
		async ([{ storeId, query }]) => checkoutProfilesFetcher(true)(storeId, query, params)
	);
	const profileList = useMemo(() => checkoutProfileMapper(data), [data]);

	const {
		allProfiles: checkoutProfileData,
		validProfiles,
		validByKey: validById,
	} = useMemo(
		() =>
			checkoutProfileValidator(profileList, checkoutShippingAddresses, checkoutBillingAddresses),
		[checkoutBillingAddresses, checkoutShippingAddresses, profileList]
	);

	const [searchTerm, setSearchTerm] = useState<string>(EMPTY_STRING);
	const checkoutProfileList = useMemo(() => {
		const re = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
		return checkoutProfileData.filter(
			(p) => p.xchkout_ProfileName && p.xchkout_ProfileName.match(re)
		);
	}, [checkoutProfileData, searchTerm]);

	const deleteCheckoutProfile = async (p: CheckoutProfileData) => {
		try {
			await checkoutProfileRemover(true)(settings?.storeId, p.xchkout_ProfileId, undefined, params);
			showSuccessMessage(success.DeletedCheckoutProfile.t([p.xchkout_ProfileName as string]));
			mutateCheckoutProfiles();
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

	const onCreate = () => setModifyState({ state: 1 });
	const onEdit = (profile: CheckoutProfileData) => setModifyState({ state: 2, profile });
	const onCancel = () => setModifyState({ state: 0 });

	const onSearch = useCallback(
		// the debounce is not needed, we are not calling service, this is just client filtering.
		(e: ChangeEvent<HTMLInputElement>) => {
			const term = get(e, 'target.value', '');
			setSearchTerm(term);
		},
		[]
	);

	const {
		selectedProfile,
		actions: { selectProfile, resetSelectedProfile },
	} = useSelectedProfileState();

	const onSelectProfile = (event: SelectChangeEvent<string>) => {
		const rc = profileList?.find(
			(p) => p.xchkout_ProfileName && p.xchkout_ProfileId === event.target.value
		);
		if (rc) {
			selectProfile(rc.xchkout_ProfileId);
		} else {
			resetSelectedProfile();
		}
	};

	return {
		selectedProfile,
		onSelectProfile,
		checkoutBillingAddresses,
		checkoutShippingAddresses,
		checkoutProfileList,
		validProfiles,
		validById,
		mutateCheckoutProfiles,
		onCreate,
		onEdit,
		onCancel,
		searchTerm,
		setSearchTerm,
		onSearch,
		error,
		deleteCheckoutProfile,
		modifyState,
		setModifyState,
	};
};
