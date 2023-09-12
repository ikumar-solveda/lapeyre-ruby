/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { PersonContact } from '@/data/types/Person';
import {
	ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetails,
	OraganizationAdministratorAddressBook,
	OraganizationAdministratorToFindOrganizationInformationByOrganizationIdentifier,
} from 'integration/generated/transactions/data-contracts';

export type OrganizationResponseAddress =
	OraganizationAdministratorToFindOrganizationInformationByOrganizationIdentifier &
		OraganizationAdministratorAddressBook;
export type OrganizationResponse =
	ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetails;
export type OrganizationAddress = PersonContact & { isOrgAddress?: boolean };
export type OrganizationType = OrganizationResponse & { addresses: OrganizationAddress[] };
