/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { DEFAULT_DECIMAL_PLACES_STR } from '@/data/constants/price';
import { dFix } from '@/utils/floatingPoint';

export const formatPrice = (
	locale: string | undefined,
	currency: string,
	price: number | string,
	decimalPlaces: string | undefined = DEFAULT_DECIMAL_PLACES_STR
) =>
	Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		currencyDisplay: 'narrowSymbol',
		maximumFractionDigits: dFix(decimalPlaces, 0),
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
