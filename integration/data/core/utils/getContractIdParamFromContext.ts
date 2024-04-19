/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { UserContext } from '@/data/types/UserContext';

export const getContractIdParamFromContext = (context?: UserContext) => {
	const contractId = context?.entitlement?.currentTradingAgreementIds;
	return contractId
		? {
				contractId: contractId.map((e) => String(e)),
		  }
		: ({} as any);
};
