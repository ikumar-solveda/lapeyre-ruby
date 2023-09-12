/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { UNSUPPORTED_FOR_MULTI } from '@/data/constants/payment';
import { PaymentToEdit } from '@/data/types/Order';

export const unsupportedMethodForMultiPayment = (payment: PaymentToEdit) => {
	const { payMethodId } = payment;
	return UNSUPPORTED_FOR_MULTI[payMethodId as string];
};
