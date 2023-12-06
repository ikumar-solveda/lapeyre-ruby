/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { memberGroupsFetcher } from '@/data/Content/_Admin_MemberGroupFetcher';
import { userRolesInOrgsICanAdminFetcher } from '@/data/Content/_Admin_UserRolesInOrgsICanAdminFetcher';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { ROLES_IN_ORGS_FETCH_USER_ROLES_IN_ORGS_I_CAN_ADMIN_FETCHER_DEDUPING_INTERVAL } from '@/data/constants/admin_buyerManagement';
import {
	DATA_KEY_MEMBER_GROUP,
	DATA_KEY_ORGANIZATION_ASSIGNABLE_ROLES,
} from '@/data/constants/dataKey';
import { MEMBER_GROUP_QUERY_TYPE, MemberGroupType } from '@/data/types/MemberGroup';
import { isExcludedFromGroups } from '@/data/utils/admin_buyerMemberGroupUtil';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { keyBy, values } from 'lodash';
import { ChangeEvent, useMemo, useState } from 'react';
import useSWR from 'swr';

const EMPTY_AVAILABLE_GROUPS = [] as MemberGroupType[];

export const useEditBuyerMemberGroup = (buyerId: string) => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const [searchText, setSearchText] = useState<string>('');
	const { data: userRolesData } = useSWR(
		storeId && buyerId
			? [{ storeId, userId: buyerId }, DATA_KEY_ORGANIZATION_ASSIGNABLE_ROLES]
			: null,
		async ([{ storeId, userId }]) =>
			userRolesInOrgsICanAdminFetcher(true)({ storeId, userId, params }),
		{
			revalidateIfStale: true,
			dedupingInterval:
				ROLES_IN_ORGS_FETCH_USER_ROLES_IN_ORGS_I_CAN_ADMIN_FETCHER_DEDUPING_INTERVAL,
		}
	);

	const isRegisteredCustomer = !!keyBy(values(userRolesData?.orgIdRoleDataBeans).flat(1), 'name')[
		'Registered Customer'
	];

	const {
		data: manageableMemberGroups,
		// error: _manageableMemberGroupsError
	} = useSWR(
		[
			{
				storeId,
				query: {
					q: 'manageable' as MEMBER_GROUP_QUERY_TYPE['q'],
				},
			},
			DATA_KEY_MEMBER_GROUP,
		],
		async ([{ storeId, query }]) => memberGroupsFetcher(true)(storeId, query, params)
	);

	const {
		data: includedMemberGroup,
		// error: includedMemberGroupError
	} = useSWR(
		[
			{
				storeId,
				query: {
					q: 'explicitlyIncludedOrExcluded' as MEMBER_GROUP_QUERY_TYPE['q'],
					exclude: '0' as MEMBER_GROUP_QUERY_TYPE['exclude'],
					userId: buyerId,
				},
			},
			DATA_KEY_MEMBER_GROUP,
		],
		async ([{ storeId, query }]) => memberGroupsFetcher(true)(storeId, query, params),
		{ revalidateIfStale: true }
	);

	const {
		data: excludedMemberGroup,
		// error: excludedMemberGroupError
	} = useSWR(
		[
			{
				storeId,
				query: {
					q: 'explicitlyIncludedOrExcluded' as MEMBER_GROUP_QUERY_TYPE['q'],
					exclude: '1' as MEMBER_GROUP_QUERY_TYPE['exclude'],
					userId: buyerId,
				},
			},
			DATA_KEY_MEMBER_GROUP,
		],
		async ([{ storeId, query }]) => memberGroupsFetcher(true)(storeId, query, params),
		{ revalidateIfStale: true }
	);

	const {
		data: customerGroup,
		// error: customerGroupError
	} = useSWR(
		[
			{
				storeId,
				query: {
					q: 'manageable' as MEMBER_GROUP_QUERY_TYPE['q'],
					typeName: ['CustomerTerritoryGroup', 'CustomerPriceGroup'],
				},
			},
			DATA_KEY_MEMBER_GROUP,
		],
		async ([{ storeId, query }]) => memberGroupsFetcher(true)(storeId, query, params),
		{ revalidateIfStale: true }
	);

	const {
		data: registeredCustomerGroup,
		// error: registeredCustomerGroupError
	} = useSWR(
		[
			{
				storeId,
				query: {
					q: 'manageable' as MEMBER_GROUP_QUERY_TYPE['q'],
					typeName: ['RegisteredCustomersGroup'],
				},
			},
			DATA_KEY_MEMBER_GROUP,
		],
		async ([{ storeId, query }]) => memberGroupsFetcher(true)(storeId, query, params),
		{ revalidateIfStale: true }
	);

	const availableGroups = useMemo(() => {
		if (manageableMemberGroups && registeredCustomerGroup && customerGroup) {
			return manageableMemberGroups.filter(
				({ memberGroupId }) =>
					isExcludedFromGroups(registeredCustomerGroup, memberGroupId) &&
					(!isRegisteredCustomer || isExcludedFromGroups(customerGroup, memberGroupId))
			);
		} else {
			return EMPTY_AVAILABLE_GROUPS;
		}
	}, [customerGroup, isRegisteredCustomer, manageableMemberGroups, registeredCustomerGroup]);

	const incGroupAsString = includedMemberGroup
		?.map(({ memberGroupId }) => memberGroupId)
		.sort()
		.join(',');
	const excGroupAsString = excludedMemberGroup
		?.map(({ memberGroupId }) => memberGroupId)
		.sort()
		.join(',');

	const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};
	return {
		onSearch,
		searchText,
		incGroupAsString,
		excGroupAsString,
		availableGroups,
		setSearchText,
	};
};
