/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

const YEAR = new Date().getFullYear();
export const EXPIRY = {
	MONTHS: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
	YEARS: Array(10)
		.fill(null)
		.map((_v, i) => `${YEAR + i}`),
};

export const BILLING_ADDRESS_ID = 'billing_address_id';

export const CREDIT_CARD_ACCOUNT: Record<string, boolean> = {
	account: true,
	expire_month: true,
	expire_year: true,
	cc_cvc: true,
	cc_brand: true,
};

export const UNSUPPORTED_FOR_MULTI: Record<string, true> = {
	PayInStore: true,
};
