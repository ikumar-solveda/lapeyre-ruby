/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { UserContext } from '@/data/types/UserContext';

export const getAllEligibleContractsParamFromContext = (context?: UserContext) => {
	const contractId = context?.entitlement?.eligibleTradingAgreementIds as unknown as string[];
	return contractId !== undefined ? { contractId } : undefined;
};
