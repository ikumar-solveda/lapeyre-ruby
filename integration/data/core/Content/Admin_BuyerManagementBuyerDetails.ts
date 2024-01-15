/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { buyerFetcher } from '@/data/Content/_Admin_BuyerFetcher';
import { buyerMemberGroupUpdater } from '@/data/Content/_Admin_BuyerMemberGroupUpdater';
import { buyerUpdater } from '@/data/Content/_Admin_BuyerUpdater';
import {
	organizationsByIDDataMap,
	organizationsDataMap,
	organizationsICanAdminFetcher,
} from '@/data/Content/_Admin_OrganizationsICanAdminFetcher';
import {
	RolesInOrgCanAssignQuery,
	rolesDataMap,
	rolesICanAssignInOrgFetcher,
} from '@/data/Content/_Admin_RolesICanAssignInOrgFetcher';
import { userRolesInOrgsICanAdminFetcher } from '@/data/Content/_Admin_UserRolesInOrgsICanAdminFetcher';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { roleUpdater } from '@/data/Content/_Person';
import { getLocalization, useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import {
	EMPTY_ROLES,
	INITIAL_SELECTED_ROLES,
	ROLES_IN_ORGS_FETCH_USER_ROLES_IN_ORGS_I_CAN_ADMIN_FETCHER_DEDUPING_INTERVAL,
} from '@/data/constants/admin_buyerManagement';
import {
	DATA_KEY_BUYER_DETAILS,
	DATA_KEY_ORGANIZATION_ASSIGNABLE_ROLES,
	DATA_KEY_ORGANIZATION_MANAGEMENT,
} from '@/data/constants/dataKey';
import { SelectedRolesRecord } from '@/data/types/Admin_BuyerManagement';
import { AdminBuyerRegistrationValueType } from '@/data/types/Admin_BuyerRegistration';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import {
	currentSelectedRolesMap,
	flatSelectedRoleData,
	mapBuyerRolesToAssignUnassign,
	mapBuyerToFormValue,
	mapSelectedRolesToAssignPayload,
} from '@/data/utils/admin_buyerManagementRoleUtil';
import { mapSelectedGroupsToUpdatePayload } from '@/data/utils/admin_buyerMemberGroupUtil';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { buyerManagementMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/buyerManagementMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { isEmpty, keyBy } from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

export const getAdmin_BuyerManagementBuyerDetails = async ({
	cache,
	id: _id,
	context,
}: ContentProps) => {
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'BuyerManagement'),
		getLocalization(cache, context.locale || 'en-US', 'MyAccount'),
		getLocalization(cache, context.locale || 'en-US', 'AccountLinks'),
		getLocalization(cache, context.locale || 'en-US', 'BuyerOrganizationAdminTools'),
	]);
};
/**
 * The hook is only used for `BuyerManagementBuyerDetails` component
 * @returns
 */
export const useAdmin_BuyerManagementBuyerDetails = ({ buyerId }: { buyerId: string }) => {
	const parentPath = useLocalization('Routes').BuyerManagement.route.t();
	const params = useExtraRequestParameters();
	const { settings } = useSettings();
	const router = useNextRouter();
	const buyerUpdated = useLocalization('BuyerManagement').BuyerUpdated;
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { notifyError, showSuccessMessage } = useNotifications();
	const [selectedRoles, setSelectedRoles] = useState<SelectedRolesRecord>(
		() => INITIAL_SELECTED_ROLES
	);

	const { data: buyerData } = useSWR(
		storeId && buyerId ? [{ storeId, userId: buyerId, params }, DATA_KEY_BUYER_DETAILS] : null,
		async ([payload]) => buyerFetcher(true)(payload),
		{ revalidateOnMount: true }
	);

	const initialAdminBuyerValue = useMemo(() => mapBuyerToFormValue(buyerData), [buyerData]);

	const { data: userRolesData } = useSWR(
		storeId && buyerId
			? [{ storeId, userId: buyerId, langId }, DATA_KEY_ORGANIZATION_ASSIGNABLE_ROLES]
			: null,
		async ([{ storeId, userId, langId }]) =>
			userRolesInOrgsICanAdminFetcher(true)({ storeId, userId, params, query: { langId } }),
		{
			revalidateIfStale: true,
			dedupingInterval:
				ROLES_IN_ORGS_FETCH_USER_ROLES_IN_ORGS_I_CAN_ADMIN_FETCHER_DEDUPING_INTERVAL,
		}
	);
	const currentAssignedRoles = useMemo(
		() => (userRolesData ? currentSelectedRolesMap(userRolesData) : undefined),
		[userRolesData]
	);
	const [selectedOrg, setSelectedOrg] = useState(() => '');

	const { data: orgData } = useSWR(
		[{ storeId, params }, organizationsICanAdminFetcher.name, DATA_KEY_ORGANIZATION_MANAGEMENT],
		async ([{ storeId, params }]) => organizationsICanAdminFetcher(true)(storeId, params)
	);

	const { organizations, organizationsById } = useMemo(
		() => ({
			organizations: organizationsDataMap(orgData),
			organizationsById: organizationsByIDDataMap(orgData),
		}),
		[orgData]
	);

	const { data: rolesData } = useSWR(
		storeId && selectedOrg
			? [{ storeId, selectedOrg, params, langId }, DATA_KEY_ORGANIZATION_ASSIGNABLE_ROLES]
			: null,
		async ([{ storeId, selectedOrg, params, langId }]) =>
			rolesICanAssignInOrgFetcher(true)(
				storeId,
				{ orgId: selectedOrg, langId } as RolesInOrgCanAssignQuery,
				params
			)
	);

	const { rolesById, roles } = useMemo(() => {
		const roles = rolesDataMap(rolesData);
		return { rolesById: keyBy(roles, 'roleId'), roles };
	}, [rolesData]);

	const onRoleCheckboxChanged = useCallback(
		(event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
			const { value } = event.target;
			if (checked) {
				setSelectedRoles((pre) => ({
					...pre,
					[selectedOrg]: {
						...pre[selectedOrg],
						[value]: {
							...rolesById[value],
							orgId: selectedOrg,
						},
					},
				}));
			} else {
				setSelectedRoles((pre) => {
					const selectedOrgRole = {
						...pre[selectedOrg],
					};
					delete selectedOrgRole[value];
					return {
						...pre,
						[selectedOrg]: selectedOrgRole,
					};
				});
			}
		},
		[rolesById, selectedOrg]
	);

	const onDeSelectRole = useCallback(
		({ roleId, orgId }: { roleId: string; orgId: string }) =>
			(_event: Event) => {
				setSelectedRoles((pre) => {
					const selectedOrgRole = {
						...pre[orgId],
					};
					delete selectedOrgRole[roleId];
					return {
						...pre,
						[orgId]: selectedOrgRole,
					};
				});
			},
		[]
	);

	const onCancel = useCallback(
		async () => await router.push({ pathname: parentPath }, undefined, { shallow: true }),
		[parentPath, router]
	);

	const onValidateSubmit = useCallback(
		(validate: () => boolean) => async (values: AdminBuyerRegistrationValueType) => {
			if (!validate()) {
				return;
			}
			try {
				const {
					logonId,
					logonPassword,
					logonPasswordVerify,
					organizationId,
					assignedExcludeMemberGroup,
					assignedIncludeMemberGroup,
					selectedExcludeMemberGroup,
					selectedIncludeMemberGroup,
					...payload
				} = values;
				const response = await buyerUpdater(true)(storeId, buyerId, payload, params);
				if (response) {
					const assigns = mapBuyerRolesToAssignUnassign(
						flatSelectedRoleData(selectedRoles),
						currentAssignedRoles
					);
					const unassign = mapBuyerRolesToAssignUnassign(
						flatSelectedRoleData(currentAssignedRoles),
						selectedRoles
					);
					if (!isEmpty(assigns)) {
						await roleUpdater(true)(
							storeId,
							buyerId,
							{ action: 'assignRole' },
							mapSelectedRolesToAssignPayload(assigns),
							params
						);
					}
					if (!isEmpty(unassign)) {
						await roleUpdater(true)(
							storeId,
							buyerId,
							{ action: 'unassignRole' },
							mapSelectedRolesToAssignPayload(unassign),
							params
						);
					}
					const { data, assignedChanged } = mapSelectedGroupsToUpdatePayload({
						assignedExcludeMemberGroup,
						assignedIncludeMemberGroup,
						selectedExcludeMemberGroup,
						selectedIncludeMemberGroup,
					});
					if (assignedChanged) {
						await buyerMemberGroupUpdater(true)({
							storeId,
							userId: buyerId,
							data,
							params,
						});
					}
				}
				showSuccessMessage(buyerUpdated.t({ logonId }));
				await mutate(buyerManagementMutatorKeyMatcher(''), undefined);
				return await router.push({ pathname: parentPath }, undefined, { shallow: true });
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
				return e as TransactionErrorResponse;
			}
		},
		[
			buyerId,
			buyerUpdated,
			currentAssignedRoles,
			notifyError,
			params,
			parentPath,
			router,
			selectedRoles,
			showSuccessMessage,
			storeId,
		]
	);

	return {
		onValidateSubmit,
		selectedOrg,
		setSelectedOrg,
		selectedRoles,
		onRoleCheckboxChanged,
		organizations,
		roles: roles ?? EMPTY_ROLES,
		onDeSelectRole,
		onCancel,
		organizationsById,
		initialAdminBuyerValue,
		currentAssignedRoles,
		setSelectedRoles,
	};
};
