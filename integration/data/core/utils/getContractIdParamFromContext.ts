/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { UserContext } from '@/data/types/UserContext';

const EMPTY_CONTRACT = {} as any;
export const getContractIdParamFromContext = (context?: UserContext) => {
	const contractId = context?.entitlement?.currentTradingAgreementIds;
	return contractId
		? {
				contractId: contractId.map((e) => String(e)),
		  }
		: EMPTY_CONTRACT;
};
