/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getInitState } from '@/data/state/provider';
import { RecurringOrderState } from '@/data/types/RecurringOrder';

export const RECURRING_ORDER_INFO = (key: string): RecurringOrderState =>
	getInitState(key, {
		isRecurring: false,
		frequency: 'Everyday',
		startDate: new Date().toISOString(),
	});
