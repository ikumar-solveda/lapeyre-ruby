/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */
import { memberGroupsFetcher } from '@/data/Content/_Admin_MemberGroupFetcher';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useSettings } from '@/data/Settings';
import {
	APPROVAL_GROUP_TYPE_NAME,
	APPROVAL_GROUP_TYPE_NAME_MAP,
} from '@/data/constants/admin_approvalGroupTypeName';
import { DATA_KEY_MEMBER_GROUP } from '@/data/constants/dataKey';
import { MEMBER_GROUP_QUERY_TYPE } from '@/data/types/MemberGroup';
import { updateApproval } from '@/data/utils/admin_organizationManagementApprovalsUtil';
import { ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList } from 'integration/generated/transactions/data-contracts';
import { keyBy } from 'lodash';
import { useMemo } from 'react';
import useSWR from 'swr';
export { updateApproval };

const mapTypes = (
	approvalTypes?: ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList[]
) => approvalTypes?.filter(({ name = '' }) => APPROVAL_GROUP_TYPE_NAME_MAP[name]) ?? [];

const mapApprovals = (
	orgId?: string,
	approvals?: ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList[]
) =>
	keyBy(
		approvals?.filter(
			({ ownerId, name = '' }) => ownerId === orgId && APPROVAL_GROUP_TYPE_NAME_MAP[name]
		) ?? [],
		'name'
	);

export const useEditOrganizationMemberGroup = ({ organizationId }: { organizationId?: string }) => {
	const { settings } = useSettings();
	const { storeId } = settings;
	const params = useExtraRequestParameters();

	const { data: rawTypes, error } = useSWR(
		organizationId
			? [
					storeId,
					{
						q: 'approvalMemberGroupTypes',
						propertiesFilter: 'approval=y',
					} as MEMBER_GROUP_QUERY_TYPE,
					DATA_KEY_MEMBER_GROUP,
			  ]
			: null,
		async ([storeId, query]) => memberGroupsFetcher(true)(storeId, query, params),
		{ revalidateOnMount: true }
	);

	const { data: rawApprovals, error: assignedApprovalError } = useSWR(
		organizationId
			? [
					storeId,
					{ q: 'manageable', typeName: APPROVAL_GROUP_TYPE_NAME } as MEMBER_GROUP_QUERY_TYPE,
					DATA_KEY_MEMBER_GROUP,
			  ]
			: null,
		async ([storeId, query]) => memberGroupsFetcher(true)(storeId, query, params),
		{ revalidateOnMount: true }
	);
	const assignedApprovals = useMemo(
		() => mapApprovals(organizationId, rawApprovals),
		[organizationId, rawApprovals]
	);
	const approvalTypes = useMemo(() => mapTypes(rawTypes), [rawTypes]);

	return {
		approvalTypes,
		error,
		assignedApprovals,
		assignedApprovalError,
	};
};
