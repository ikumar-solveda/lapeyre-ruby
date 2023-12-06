/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { organizationRegistrar } from '@/data/Content/_Admin_OrganizationRegistrar';
import { organizationUpdateByAction } from '@/data/Content/_Admin_OrganizationUpdateByAction';
import {
	organizationsDataMap,
	organizationsICanAdminFetcher,
} from '@/data/Content/_Admin_OrganizationsICanAdminFetcher';
import {
	rolesAssignedInOrgFetcher,
	rolesDetailsDataMap,
} from '@/data/Content/_Admin_RolesAssignedInOrgFetcher';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { ACTION_TYPES_FOR_ROLE_AND_APPROVAL } from '@/data/constants/admin_organizationManagement';
import { DATA_KEY_ORGANIZATION_MANAGEMENT } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { AdminOrganizationRegistration } from '@/data/types/Admin_OrganizationManagement';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { processError } from '@/data/utils/processError';
import { ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityAddRequest } from 'integration/generated/transactions/data-contracts';
import { keyBy } from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

export const useAdmin_OrganizationManagementCreate = () => {
	const { notifyError, showSuccessMessage } = useNotifications();
	const params = useExtraRequestParameters();
	const { settings } = useSettings();
	const localization = useLocalization('OrganizationManagement');
	const parentPath = useLocalization('Routes').OrganizationManagement.route.t();
	const [parentOrganizationId, setParentOrganizationId] = useState<string>('');
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);

	const { data: parentOrganizationsData } = useSWR(
		[storeId, organizationsICanAdminFetcher.name, DATA_KEY_ORGANIZATION_MANAGEMENT],
		async ([storeId]) => organizationsICanAdminFetcher(true)(storeId, params)
	);
	const { parentOrganizations, parentOrganizationsById } = useMemo(() => {
		const parentOrganizations = organizationsDataMap(parentOrganizationsData);
		const parentOrganizationsById = keyBy(parentOrganizations, 'organizationId');
		return { parentOrganizations, parentOrganizationsById };
	}, [parentOrganizationsData]);

	const { data: roleData } = useSWR(
		parentOrganizationId && storeId
			? [
					{ storeId, organizationId: parentOrganizationId, params },
					DATA_KEY_ORGANIZATION_MANAGEMENT,
			  ]
			: null,
		async ([props]) => rolesAssignedInOrgFetcher()(props),
		{ revalidateOnMount: true }
	);

	const { roles, rolesById } = useMemo(() => rolesDetailsDataMap(roleData), [roleData]);
	const [roleSearch, setRoleSearch] = useState<string>('');
	const displayedRoles = useMemo(
		() =>
			roleSearch
				? roles.filter(({ displayName }) =>
						displayName?.toLowerCase().includes(roleSearch.toLowerCase())
				  )
				: roles,
		[roles, roleSearch]
	);

	const onRoleSearch = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setRoleSearch(e.target.value),
		[]
	);

	const onValidateSubmit = useCallback(
		(validate: () => boolean) => async (props: AdminOrganizationRegistration) => {
			if (!validate()) {
				return;
			}

			try {
				const response = await organizationRegistrar(true)({
					storeId,
					requestData:
						props as unknown as ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityAddRequest,
					params,
				});
				const { orgEntityId = '' } = response ?? {};

				const data = Object.keys(props.selectedRoles).reduce(
					(agg, roleId, index) => {
						agg[`roleId${index}`] = roleId;
						return agg;
					},
					{ orgEntityId, segmentId: '' } as Record<string, string>
				);

				await organizationUpdateByAction()({
					storeId,
					organizationId: orgEntityId,
					query: { action: ACTION_TYPES_FOR_ROLE_AND_APPROVAL[1] },
					data,
					params,
				});
				showSuccessMessage(localization.OrganizationCreated.t());

				await mutate(
					generateKeyMatcher({ [DATA_KEY_ORGANIZATION_MANAGEMENT]: true })(EMPTY_STRING),
					undefined
				);
				return await router.push({ pathname: parentPath }, undefined, { shallow: true });
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			localization.OrganizationCreated,
			notifyError,
			params,
			parentPath,
			router,
			showSuccessMessage,
			storeId,
		]
	);

	return {
		onValidateSubmit,
		parentOrganizations,
		parentOrganizationsById,
		roles,
		rolesById,
		displayedRoles,
		onRoleSearch,
		setParentOrganizationId,
	};
};
