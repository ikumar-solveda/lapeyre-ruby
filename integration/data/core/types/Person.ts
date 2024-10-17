/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { EditableAddress } from '@/data/types/Address';
import {
	PersonPerson,
	PersonSingleContact,
} from 'integration/generated/transactions/data-contracts';

export type Person = PersonPerson;
export type { PersonSingleContact as PersonContact };
export type RolesWithDetails = {
	displayName: string;
	roleId: string;
	name: string;
	description: string | null;
};

export type RegistrationAddress = {
	country: string;
	lastName: string;
	zipCode: string;
	address3: string;
	mobilePhone1: string;
	address2: string;
	city: string;
	address1: string;
	addressType: string;
	mobilePhone1Country: string;
	nickName: string;
	phone2: string;
	addressId: string;
	phone1: string;
	email2: string;
	firstName: string;
	email1: string;
	fax2: string;
	middleName: string;
	fax1: string;
	state: string;
	memberId: string;
};

export type RolesDetailsResponse = {
	displayName: string;
	rolesWithDetails: RolesWithDetails[];
	userId: string;
};

export type UserRegistrationDetailsResponse = {
	personTitle: string;
	addresses: RegistrationAddress[];
	preferredLanguage: string;
	address: RegistrationAddress;
	organizationName: string;
	parentMemberId: string;
	preferredCurrency: string;
	/** The user registration type. Valid values are as follows: R - registered user G - guest user A - administrator S - site administrator  */
	registerType: 'R' | 'G' | 'A' | 'S';
	userId: string;
	organizationId: string;
	logonId: string;
	userRegistry: {
		status: '1' | '0';
	};
};

export type RolesOfUserInOrgsICanAdminResponse = {
	orgIdRoleDataBeans: {
		[orgId: string]: RolesWithDetails[];
	};
};

export type EditablePersonInfo = Omit<EditableAddress, 'addressType' | 'nickName'> & {
	parentOrgId?: string;
	preferredCurrency?: string;
	preferredLanguage?: string;
	privacyNoticeVersion?: string;
	marketingTrackingConsent?: boolean;
};

export type EditablePersonInfoParam = Omit<EditableAddress, 'addressType' | 'nickName'> & {
	parentOrgId?: string;
	preferredCurrency?: string;
	preferredLanguage?: string;
	privacyNoticeVersion?: string;
	marketingTrackingConsent?: string;
	address1: string;
	address2: string;
};
