/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Order } from '@/data/types/Order';
import { ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary } from 'integration/generated/transactions/data-contracts';

export type RecurringOrderState = {
	isRecurring?: boolean;
	frequency?: string;
	startDate?: string;
};

export type SubscriptionResponse =
	ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary & { Order: Order[] };
