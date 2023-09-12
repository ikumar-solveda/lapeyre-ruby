/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { UserContext } from '@/data/types/UserContext';

export const getContractIdFromContext = (context?: UserContext) =>
	`${context?.entitlement?.currentTradingAgreementIds?.at(0)}`;
