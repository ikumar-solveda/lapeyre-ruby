/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { usePersonInfo } from '@/data/Content/PersonInfo';
import {
	buyersFetcher,
	orgRolesFetcher,
	passwordResetter,
	personUpdateByAdmin,
} from '@/data/Content/_Admin_BuyerManagement';
import {
	organizationsByIDDataMap,
	organizationsDataMap,
	organizationsICanAdminFetcher,
} from '@/data/Content/_Admin_OrganizationsICanAdminFetcher';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import {
	BUYER_MANAGEMENT_REVALIDATION_INTERVAL,
	DEFAULT_SORT,
	ORDER_BY,
	searchInitialValues,
} from '@/data/constants/admin_buyerManagement';
import {
	DATA_KEY_BUYER,
	DATA_KEY_BUYER_ROLE_DESCS,
	DATA_KEY_ORGANIZATION_MANAGEMENT,
} from '@/data/constants/dataKey';
import { PAGINATION } from '@/data/constants/tablePagination';
import { BuyersFetchRequest } from '@/data/types/Admin_BuyerManagement';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { sanitizeSearchPayload } from '@/data/utils/admin_buyerManagementUtil';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { buyerManagementMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/buyerManagementMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { PaginationState, SortingState } from '@tanstack/react-table';
import {
	ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetails,
	ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans,
} from 'integration/generated/transactions/data-contracts';
import { debounce, keyBy } from 'lodash';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

export type { ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans };

const dataMap = (buyers?: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetails) =>
	buyers?.userDataBeans ?? [];

export const useAdmin_BuyerManagement = () => {
	const params = useExtraRequestParameters();
	const { personInfo } = usePersonInfo();
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const orderBy = useMemo(() => {
		const sort = sorting.at(0);
		return sort ? ORDER_BY[sort.id as keyof typeof ORDER_BY](sort.desc) : DEFAULT_SORT;
	}, [sorting]);
	const [apiPayload, setApiPayload] = useState<BuyersFetchRequest>({});
	const { settings } = useSettings();
	const router = useNextRouter();
	const { disabled, enabled } = useLocalization('BuyerManagement');
	const { storeId } = getClientSideCommon(settings, router);
	const { notifyError, showSuccessMessage } = useNotifications();
	const { userAccountEnabled, userAccountDisabled, userPasswordReset } =
		useLocalization('success-message');
	const { pageIndex, pageSize } = pagination;
	const accountStatuses = useMemo(
		() => [
			{ value: '0', label: disabled.t() },
			{ value: '1', label: enabled.t() },
		],
		[enabled, disabled]
	);
	const [showOptions, setShowOptions] = useState<boolean>(false);

	const onToggleOptions = useCallback(() => setShowOptions((prev) => !prev), []);

	const { data, error } = useSWR(
		storeId
			? [
					{
						storeId,
						...apiPayload,
						...orderBy,
						startIndex: pageIndex * pageSize,
						maxResults: pageSize,
					},
					DATA_KEY_BUYER,
			  ]
			: null,
		async ([{ storeId, ...query }]) => buyersFetcher(true)(storeId, query, params),
		{ refreshInterval: BUYER_MANAGEMENT_REVALIDATION_INTERVAL, revalidateOnMount: true }
	);
	const { totalRecords, pageCount } = useMemo(() => {
		const totalRecords = data?.recordSetTotal ?? 0;
		const pageCount = Math.ceil(totalRecords / pageSize);
		return { totalRecords, pageCount };
	}, [data, pageSize]);

	const { data: rolesDescriptionData } = useSWR(
		storeId && personInfo.parentOrgId
			? [{ storeId, parentOrgId: personInfo.parentOrgId, params }, DATA_KEY_BUYER_ROLE_DESCS]
			: null,
		async ([{ storeId, parentOrgId, params }]) =>
			orgRolesFetcher(true)(storeId, parentOrgId as string, params)
	);
	const rolesDescriptions = useMemo(
		() => keyBy(rolesDescriptionData?.parentRolesWithDetails ?? [], 'roleId'),
		[rolesDescriptionData]
	);

	const { data: orgsData } = useSWR(
		[storeId, organizationsICanAdminFetcher.name, DATA_KEY_ORGANIZATION_MANAGEMENT],
		async ([iStoreId]) => organizationsICanAdminFetcher(true)(iStoreId, params)
	);
	const { organizations, organizationsList } = useMemo(
		() => ({
			organizationsList: organizationsDataMap(orgsData),
			organizations: organizationsByIDDataMap(orgsData),
		}),
		[orgsData]
	);
	const buyers = useMemo(
		() => dataMap(data as ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetails),
		[data]
	);

	const onSearch = useCallback((values: typeof searchInitialValues) => {
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
		setApiPayload((prev) => sanitizeSearchPayload({ ...prev, ...values }));
	}, []);

	const onDebouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

	const updateUserAccountStatus = useCallback(
		async (userId: string, userStatus: boolean, logonId: string) => {
			try {
				const status = userStatus ? '1' : '0';
				await personUpdateByAdmin(true)({ storeId, userId, status }, params);
				await mutate(buyerManagementMutatorKeyMatcher(''), undefined);

				const args = { logonId };
				showSuccessMessage(userStatus ? userAccountEnabled.t(args) : userAccountDisabled.t(args));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
				return e as TransactionErrorResponse;
			}
		},
		[storeId, params, showSuccessMessage, userAccountEnabled, userAccountDisabled, notifyError]
	);

	const onResetPassword = useCallback(
		(logonId: string) => async (_event: MouseEvent<HTMLButtonElement>) => {
			try {
				await passwordResetter(true)({ storeId, logonId }, params);
				showSuccessMessage(userPasswordReset.t({ logonId }));
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, params, showSuccessMessage, storeId, userPasswordReset]
	);

	return {
		buyers,
		rolesDescriptions,
		error,
		accountStatuses,
		updateUserAccountStatus,
		onResetPassword,
		onDebouncedSearch,
		onSearch,
		pagination,
		setPagination,
		pageCount,
		totalRecords,
		sorting,
		setSorting,
		showOptions,
		onToggleOptions,
		organizations,
		organizationsList,
	};
};
