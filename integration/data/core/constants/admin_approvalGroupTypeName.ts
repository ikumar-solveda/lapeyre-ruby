/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export const DISABLE_INHERITED_PREFIX = 'DisableInherited_';
export const SUPPORTED_APPROVAL_GROUP_TYPES = [
	'OrderApprovalGroup',
	'UserRegistrationApprovalGroup',
];

// only manage those approval group types that are used by store front.
export const APPROVAL_GROUP_TYPE_NAME_MAP: Record<string, true> =
	SUPPORTED_APPROVAL_GROUP_TYPES.map((grp) => [grp, `${DISABLE_INHERITED_PREFIX}${grp}`])
		.flat(1)
		.reduce((agg, v) => ({ ...agg, [v]: true }), {});
export const APPROVAL_GROUP_TYPE_NAME = Object.keys(APPROVAL_GROUP_TYPE_NAME_MAP);
export const APPROVAL_GROUP_VALUE_GROUPING = SUPPORTED_APPROVAL_GROUP_TYPES.map((grp) => ({
	name: grp,
	values: [grp, `${DISABLE_INHERITED_PREFIX}${grp}`],
}));
