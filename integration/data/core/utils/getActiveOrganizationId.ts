/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { UserContext } from '@/data/types/UserContext';

export const getActiveOrganizationId = (context?: UserContext) => {
	const organizationId = context?.entitlement?.activeOrganizationId;
	return organizationId !== undefined
		? {
				organizationId: `${organizationId}`,
		  }
		: undefined;
};
