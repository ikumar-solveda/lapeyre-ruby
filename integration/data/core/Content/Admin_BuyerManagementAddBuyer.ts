/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import {
	organizationsByIDDataMap,
	organizationsDataMap,
	organizationsICanAdminFetcher,
} from '@/data/Content/_Admin_OrganizationsICanAdminFetcher';
import {
	rolesDataMap,
	rolesICanAssignInOrgFetcher,
} from '@/data/Content/_Admin_RolesICanAssignInOrgFetcher';
import { buyerRegistrar, nDigitRandom } from '@/data/Content/_BuyerRegistrar';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { roleUpdater } from '@/data/Content/_Person';
import { getLocalization, useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import {
	DATA_KEY_ORGANIZATION_ASSIGNABLE_ROLES,
	DATA_KEY_ORGANIZATION_MANAGEMENT,
} from '@/data/constants/dataKey';
import { SelectedRolesRecord } from '@/data/types/Admin_BuyerManagement';
import { AdminBuyerRegistrationValueType } from '@/data/types/Admin_BuyerRegistration';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { RoleDataBeans } from '@/data/types/Organization';
import {
	flatSelectedRoleData,
	mapSelectedRolesToAssignPayload,
} from '@/data/utils/admin_buyerManagementRoleUtil';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { buyerManagementMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/buyerManagementMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { isEmpty, keyBy } from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

const initialSelectedRoles: SelectedRolesRecord = {};
const EMPTY_ROLES: RoleDataBeans[] = [];

export const getAdmin_BuyerManagementAddBuyer = async ({
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
 * The hook is only used for `BuyerManagementAddBuyer` component
 * @returns
 */
export const useAdmin_BuyerManagementAddBuyer = () => {
	const parentPath = useLocalization('Routes').BuyerManagement.route.t();
	const params = useExtraRequestParameters();
	const { settings } = useSettings();
	const router = useNextRouter();
	const { BuyerCreated } = useLocalization('BuyerManagement');
	const { storeId } = getClientSideCommon(settings, router);
	const { notifyError, showSuccessMessage } = useNotifications();
	const [selectedRoles, setSelectedRoles] = useState<SelectedRolesRecord>(
		() => initialSelectedRoles
	);
	const [selectedOrg, setSelectedOrg] = useState(() => '');

	const { data: orgData } = useSWR(
		[storeId, organizationsICanAdminFetcher.name, DATA_KEY_ORGANIZATION_MANAGEMENT],
		async ([iStoreId]) => organizationsICanAdminFetcher(true)(iStoreId, params)
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
			? [{ storeId, selectedOrg }, DATA_KEY_ORGANIZATION_ASSIGNABLE_ROLES]
			: null,
		async ([{ storeId, selectedOrg }]) =>
			rolesICanAssignInOrgFetcher(true)(storeId, { orgId: selectedOrg }, params)
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
				const logonPassword = nDigitRandom();
				const response = await buyerRegistrar(true)(
					storeId,
					{ mode: 'admin' },
					{ ...values, logonPassword, logonPasswordVerify: logonPassword },
					params
				);
				if (response) {
					const { userId, logonId = '' } = response;
					showSuccessMessage(BuyerCreated.t({ logonId }));
					if (!isEmpty(flatSelectedRoleData(selectedRoles))) {
						await roleUpdater(true)(
							storeId,
							userId,
							{ action: 'assignRole' },
							mapSelectedRolesToAssignPayload(flatSelectedRoleData(selectedRoles)),
							params
						);
					}
				}
				await mutate(buyerManagementMutatorKeyMatcher(''), undefined);
				return await router.push({ pathname: parentPath }, undefined, { shallow: true });
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
				return e as TransactionErrorResponse;
			}
		},
		[
			BuyerCreated,
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
		organizationsById,
		roles: roles ?? EMPTY_ROLES,
		onDeSelectRole,
		onCancel,
	};
};
