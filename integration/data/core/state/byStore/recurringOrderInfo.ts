/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getInitState } from '@/data/state/provider';
import { RecurringOrderState } from '@/data/types/RecurringOrder';

const RECURRING_ORDER_BASE = {
	isRecurring: false,
	frequency: 'Everyday',
	startDate: new Date().toISOString(),
	endDate: new Date().toISOString(),
};
export const RECURRING_ORDER_INFO = (key: string): RecurringOrderState =>
	getInitState(key, RECURRING_ORDER_BASE);
