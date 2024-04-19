/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { usePersonContact } from '@/data/Content/PersonContact';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { DATA_KEY_CHECKOUT_PROFILES } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { PAGINATION } from '@/data/constants/tablePagination';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import { CheckoutProfileData, PaginationData } from '@/data/types/CheckoutProfiles';
import { RequestQuery } from '@/data/types/RequestQuery';
import { checkoutProfileMapper } from '@/data/utils/checkoutProfileMapper';
import { checkoutProfileValidator } from '@/data/utils/checkoutProfileValidator';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { processError } from '@/data/utils/processError';
import { SelectChangeEvent } from '@mui/material';
import { transactionsCheckoutProfile } from 'integration/generated/transactions';
import { PersonSingleContact } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { get } from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

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
	const [selectedProfile, setSelectedProfile] = useState<string>(EMPTY_STRING);
	const { notifyError, showSuccessMessage } = useNotifications();
	const [pagination, setPagination] = useState<PaginationData>({
		pageNumber: 1,
		pageSize: PAGINATION.sizes[0],
	});
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
	const { totalLists, totalPages, displayedItems } = useMemo(() => {
		const totalLists: number = dFix(`${checkoutProfileList.length ?? 0}`, 0);
		const totalPages = pagination ? dFix(Math.ceil(totalLists / pagination.pageSize), 0) : 1;
		const start = pagination.pageSize * (pagination.pageNumber - 1);
		const displayedItems = checkoutProfileList.slice(start, pagination.pageSize + start);
		return { totalLists, totalPages, displayedItems };
	}, [checkoutProfileList, pagination]);

	const deleteCheckoutProfile = async (p: CheckoutProfileData) => {
		try {
			await checkoutProfileRemover(true)(settings?.storeId, p.xchkout_ProfileId, undefined, params);
			showSuccessMessage(success.DeletedCheckoutProfile.t([p.xchkout_ProfileName as string]));
			if (
				pagination.pageNumber > 1 &&
				pagination.pageNumber === totalPages &&
				displayedItems.length === 1
			) {
				setPagination((prev) => ({ ...prev, pageNumber: pagination.pageNumber - 1 }));
			}
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

	const onSelectProfile = (event: SelectChangeEvent<string>) => {
		const rc = profileList?.find(
			(p) => p.xchkout_ProfileName && p.xchkout_ProfileId === event.target.value
		);
		if (rc) {
			setSelectedProfile(rc.xchkout_ProfileId);
		} else {
			setSelectedProfile(EMPTY_STRING);
		}
	};

	const onPageChange = useCallback((event: ChangeEvent<unknown>, page: number) => {
		setPagination((prev) => ({ ...prev, pageNumber: page }));
	}, []);

	const onCreateCheckoutProfileSuccess = useCallback(() => {
		if (pagination.pageNumber < totalPages) {
			const newPageNumber = totalLists % 10 ? totalPages : totalPages + 1;
			setPagination((prev) => ({ ...prev, pageNumber: newPageNumber }));
		} else if (
			pagination.pageNumber === totalPages &&
			displayedItems.length === pagination.pageSize
		) {
			setPagination((prev) => ({ ...prev, pageNumber: pagination.pageNumber + 1 }));
		}
		setModifyState({ state: 0 });
		mutateCheckoutProfiles();
	}, [
		displayedItems.length,
		mutateCheckoutProfiles,
		pagination.pageNumber,
		pagination.pageSize,
		totalLists,
		totalPages,
	]);

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
		pagination,
		onPageChange,
		totalPages,
		displayedItems,
		onCreateCheckoutProfileSuccess,
	};
};
