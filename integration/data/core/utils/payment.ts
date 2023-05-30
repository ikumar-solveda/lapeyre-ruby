/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CREDIT_CARD_ACCOUNT } from '@/data/constants/payment';
import { CheckoutProfileBillingType } from '@/data/types/CheckoutProfiles';
import { Protocol, CreditCardAccount, PaymentInstruction, PaymentToEdit } from '@/data/types/Order';

const REG_EX_NUMBER = /^[0-9 ]*$/;

export const getNormalizedProtocolData = (protocolData: Protocol[]) =>
	protocolData.reduce<CreditCardAccount>(
		(previous, current) => {
			if (CREDIT_CARD_ACCOUNT[current.name]) {
				previous[current.name as keyof CreditCardAccount] = current.value;
			}
			return previous;
		},
		{
			account: '',
			expire_month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
			expire_year: (new Date().getFullYear() + 1).toString(),
			cc_cvc: '',
		} as CreditCardAccount
	);

export const getPaymentToEdit = (paymentInstruction?: PaymentInstruction) => {
	const dirty = paymentInstruction ? false : true;
	const {
		xpaym_policyId: policyId = '',
		payMethodId = '',
		piCurrency = '',
		piDescription = '',
		billing_address_id = '',
		piAmount = '',
		piId = '',
		protocolData = [],
		paymentTermConditionId = '',
		nickName = '',
	} = paymentInstruction ?? {};
	return {
		policyId,
		payMethodId,
		billing_address_id,
		piAmount,
		piCurrency,
		piDescription,
		piId,
		action: 'none',
		paymentTermConditionId,
		nickName,
		...getNormalizedProtocolData(protocolData),
		dirty,
	} as PaymentToEdit;
};

export const markSinglePaymentDirtyIfNeeded = (
	payment: PaymentToEdit,
	cartTotal: string
): PaymentToEdit =>
	payment.piAmount && Number(payment.piAmount) !== Number(cartTotal)
		? { ...payment, dirty: true, account: '', cc_cvc: '' }
		: payment;

export const CC_LENGTHS = { VISA: 13, MasterCard: 16, AMEX: 15 };

export const checkProfileCreditCard = (billData: CheckoutProfileBillingType) => {
	const {
		pay_expire_year = '',
		pay_expire_month = '',
		pay_payment_method = '',
		pay_account = '',
	} = billData;
	const len = CC_LENGTHS[pay_payment_method as keyof typeof CC_LENGTHS] ?? 1;
	const now = new Date();
	const currentMonth = `${now.getMonth() + 1}`.padStart(2, '0');
	const currentYear = `${now.getFullYear()}`;
	const cardValid = pay_account.length >= len && REG_EX_NUMBER.test(pay_account.trim());
	const expiryValid =
		pay_expire_year > currentYear ||
		(pay_expire_year === currentYear && pay_expire_month >= currentMonth);

	// return two elements: whether card invalid and whether expiry invalid
	return [!cardValid, !expiryValid];
};
