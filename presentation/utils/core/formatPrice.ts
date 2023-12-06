/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { dFix } from '@/utils/floatingPoint';

export const formatPrice = (locale: string | undefined, currency: string, price: number | string) =>
	Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		currencyDisplay: 'narrowSymbol',
	}).format(dFix(price));

type CurrencySymbol = {
	prefix?: string;
	postfix?: string;
};

/**
 * Get the locale specific currency symbol with position
 * @param locale
 * @param currency
 * @returns
 */
export const getCurrencySymbol = (locale: string | undefined, currency: string): CurrencySymbol => {
	const parts = Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		currencyDisplay: 'narrowSymbol',
		maximumFractionDigits: 0,
	}).formatToParts(0);
	const maybeCurrencySymbol = parts.at(0);
	if (maybeCurrencySymbol?.type === 'currency') {
		return {
			prefix: maybeCurrencySymbol.value,
		};
	} else {
		return {
			postfix: parts.at(-1)?.value ?? '',
		};
	}
};
