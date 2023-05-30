/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export const formatPrice = (locale: string | undefined, currency: string, price: number) =>
	Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
