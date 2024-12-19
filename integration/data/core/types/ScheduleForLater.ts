/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type { useExpectedDate } from '@/data/Content/ExpectedDate';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';

export type ScheduleForLaterType = {
	date?: Date;
	enabled: boolean;
};

export type ExpectedDateDialogContextValueType = ReturnType<typeof useExpectedDate> & {
	dialogOpen: boolean;
	isDelivery: boolean;
	onDialog: () => void;
	onConfirm: () => Promise<unknown>;
	availability: ProductAvailabilityData;
	isDialogForCart?: boolean;
};
