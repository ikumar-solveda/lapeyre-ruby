/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { UserContext } from '@/data/types/UserContext';
import { sortBy } from 'lodash';

export const getContractIdFromContext = (context?: UserContext) =>
	`${sortBy(context?.entitlement?.currentTradingAgreementIds)}`;
