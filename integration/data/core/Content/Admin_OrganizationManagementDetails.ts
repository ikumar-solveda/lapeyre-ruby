/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { organizationUpdateByAction } from '@/data/Content/_Admin_OrganizationUpdateByAction';
import { organizationUpdater } from '@/data/Content/_Admin_OrganizationUpdater';
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
import { OrgFetcherProfileNameType, orgFetcher } from '@/data/Content/_Organization';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import {
	ACTION_TYPES_FOR_ROLE_AND_APPROVAL,
	initialOrganizationRegistration,
} from '@/data/constants/admin_organizationManagement';
import { DATA_KEY_ORGANIZATION_MANAGEMENT } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import {
	AdminOrganizationRegistration,
	OrganizationDataBeanWithContactInformation,
} from '@/data/types/Admin_OrganizationManagement';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { getRoleDeltas } from '@/data/utils/admin_organizationManagementRoleUtil';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { processError } from '@/data/utils/processError';
import { ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityUpdateRequest } from 'integration/generated/transactions/data-contracts';
import { isEmpty, keyBy, mapValues } from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

const mapOrganizationDetailsToForm = (details?: OrganizationDataBeanWithContactInformation) => {
	if (details) {
		const {
			contactInfo,
			organizationName: orgEntityName,
			administratorFirstName,
			administratorLastName,
			description,
			roles: _roles,
			parentMemberId,
			orgEntityType,
			organizationId,
		} = (details ?? {}) as Required<typeof details>;
		const roles = _roles?.reduce(
			(agg, v) => ({ ...agg, [`${v}`]: true }),
			{} as Record<string, boolean>
		);
		const { address1, address2, email1, country, state, city, zipCode } = contactInfo;
		const form = mapValues(
			{
				address1,
				address2,
				email1,
				country,
				state,
				city,
				zipCode,
				administratorFirstName,
				administratorLastName,
				orgEntityName,
				organizationId,
				description,
				parentMemberId,
				orgEntityType,
				addToRegisteredCustomersGroup: 'true',
				roles,
				selectedRoles: { ...roles },
				isEdit: true,
			},
			(value: any) => value ?? ''
		);
		return form as AdminOrganizationRegistration;
	}
	return initialOrganizationRegistration;
};

export const useAdmin_OrganizationManagementDetails = ({
	organizationId = '',
}: {
	organizationId: string;
}) => {
	const { notifyError, showSuccessMessage } = useNotifications();
	const params = useExtraRequestParameters();
	const { settings } = useSettings();
	const localization = useLocalization('OrganizationManagement');
	const parentPath = useLocalization('Routes').OrganizationManagement.route.t();
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

	const { data } = useSWR(
		storeId && organizationId
			? [
					{
						storeId,
						organizationId,
						query: { profileName: 'IBM_Organization_Details' as OrgFetcherProfileNameType },
						params,
					},
					DATA_KEY_ORGANIZATION_MANAGEMENT,
			  ]
			: null,
		async ([props]) => orgFetcher(true)(props)
	);

	const initialFieldValues = useMemo(
		() => mapOrganizationDetailsToForm(data as OrganizationDataBeanWithContactInformation),
		[data]
	);

	const { data: roleData } = useSWR(
		initialFieldValues?.parentMemberId && storeId
			? [
					{ storeId, organizationId: initialFieldValues?.parentMemberId, params },
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
			const {
				roles,
				organizationId: _orgId,
				approvalTypes,
				approvals,
				selectedApprovals = {},
				...values
			} = props;
			const { addedRoles, removedRoles } = getRoleDeltas(props);
			try {
				await organizationUpdater(true)({
					storeId,
					organizationId,
					data: values as unknown as ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityUpdateRequest,
					params,
				});

				if (!isEmpty(removedRoles)) {
					await organizationUpdateByAction()({
						storeId,
						organizationId,
						query: { action: ACTION_TYPES_FOR_ROLE_AND_APPROVAL[2] },
						data: { orgEntityId: organizationId, segmentId: '', ...removedRoles },
						params,
					});
				}

				if (!isEmpty(addedRoles)) {
					await organizationUpdateByAction()({
						storeId,
						organizationId,
						query: { action: ACTION_TYPES_FOR_ROLE_AND_APPROVAL[1] },
						data: { orgEntityId: organizationId, segmentId: '', ...addedRoles },
						params,
					});
				}

				if (!isEmpty(selectedApprovals) || !isEmpty(approvals)) {
					const typesByName = keyBy(approvalTypes, 'name');
					const segmentId = Object.keys(selectedApprovals)
						.map((name) => typesByName[name].memberGroupTypeId)
						.join(',');

					await organizationUpdateByAction()({
						storeId,
						organizationId,
						query: { action: ACTION_TYPES_FOR_ROLE_AND_APPROVAL[0] },
						data: { orgEntityId: organizationId, segmentId },
						params,
					});
				}
				showSuccessMessage(localization.OrganizationUpdated.t());

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
			localization.OrganizationUpdated,
			notifyError,
			organizationId,
			params,
			parentPath,
			router,
			showSuccessMessage,
			storeId,
		]
	);

	return {
		initialFieldValues,
		onValidateSubmit,
		parentOrganizations,
		parentOrganizationsById,
		roles,
		rolesById,
		displayedRoles,
		onRoleSearch,
	};
};
