/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { MemberGroupType } from '@/data/types/MemberGroup';
import type { ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser } from 'integration/generated/transactions/data-contracts';
import { isEmpty, keyBy } from 'lodash';

export const isExcludedFromGroups = (
	groupList?: MemberGroupType[],
	memberGroupId: string | number = ''
) => !keyBy(groupList, 'memberGroupId')[memberGroupId ?? ''];

export const mapSelectedGroupsToUpdatePayload = ({
	assignedExcludeMemberGroup,
	assignedIncludeMemberGroup,
	selectedExcludeMemberGroup,
	selectedIncludeMemberGroup,
}: {
	assignedExcludeMemberGroup?: string;
	assignedIncludeMemberGroup?: string;
	selectedExcludeMemberGroup?: string;
	selectedIncludeMemberGroup?: string;
}) => {
	const assignedGroups = (assignedExcludeMemberGroup?.split(',') ?? [])
		.concat(assignedIncludeMemberGroup?.split(',') ?? [])
		.filter(Boolean);
	const removedGroups = assignedGroups.filter(
		(groupId) =>
			!selectedExcludeMemberGroup?.includes(groupId) &&
			!selectedIncludeMemberGroup?.includes(groupId)
	);
	const assignedChanged =
		assignedExcludeMemberGroup !== selectedExcludeMemberGroup ||
		assignedIncludeMemberGroup !== selectedIncludeMemberGroup;
	const data: ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser = {
		...(isEmpty(removedGroups) ? {} : { removeFromMemberGroupId: removedGroups }),
		...(assignedChanged
			? {
					addAsExplicitExclusionToMemberGroupId:
						selectedExcludeMemberGroup?.split(',').filter(Boolean) ?? [],
					addAsExplicitInclusionToMemberGroupId:
						selectedIncludeMemberGroup?.split(',').filter(Boolean) ?? [],
			  }
			: {}),
	};
	return {
		data,
		assignedChanged,
	};
};
