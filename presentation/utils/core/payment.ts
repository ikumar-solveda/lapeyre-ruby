/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { dFix } from '@/utils/floatingPoint';

export const REG_EX_CVC = /^[0-9 ]{3,4}$/;
export const REG_EX_NUMBER = /^[0-9 ]*$/;
export const REG_EX_NUMBER_NOT_ZERO = /^[0-9\.]*[1-9,]+[0-9\.]*$/;

/**
 * @deprecated 9.1.15.0
 */
export const formatValue = (value: string, currency: string, locale: string) =>
	Intl.NumberFormat(locale, { style: 'currency', currency }).format(dFix(value));
