/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { useLocalization } from '@/data/Localization';
import { RegistrationAddress } from '@/data/types/Person';
import type { ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans } from 'integration/generated/transactions/data-contracts';

export type BUYER_MANAGEMENT_STEPS_TYPE = Record<
	'step',
	keyof ReturnType<typeof useLocalization<'BuyerManagement'>>['StepperLabels']
>[];
type SearchType = '1' | '2' | '3' | '4' | '5' | '6' | '8';
export type BuyersFetchRequest = {
	orderByFieldName?: string;
	roleId?: string;
	accountStatus?: string;
	orderByTableName?: string;
	logonId?: string;
	logonIdSearchType?: SearchType;
	parentOrgId?: string;
	parentOrgName?: string;
	parentOrgNameSearchType?: SearchType;
	firstName?: string;
	firstNameSearchType?: SearchType;
	lastName?: string;
	lastNameSearchType?: SearchType;
	startIndex?: number;
	maxResults?: number;
};

export type BuyerResponse =
	ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans & {
		address: RegistrationAddress;
		addresses?: RegistrationAddress[];
		organizationId?: string;
	};

type Role = {
	displayName: string;
	roleId: string;
	name: string;
};
export type SelectedRole = Role & {
	orgId: string;
};
type SelectedOrgRole = {
	[roleId: string]: SelectedRole;
};
export type SelectedRolesRecord = {
	[orgId: string]: SelectedOrgRole;
};
