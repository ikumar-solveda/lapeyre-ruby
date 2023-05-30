/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { UNSUPPORTED_PAYMENTS } from '@/data/constants/unsupportedPayments';
import { CartUsablePaymentInformation } from 'integration/generated/transactions/data-contracts';

export const filterUnSupportedPayments = (usablePayments: CartUsablePaymentInformation[]) =>
	usablePayments.filter(
		(payment) => !UNSUPPORTED_PAYMENTS.includes(payment.paymentMethodName ?? '')
	);
