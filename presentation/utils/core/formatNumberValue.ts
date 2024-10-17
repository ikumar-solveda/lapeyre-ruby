/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { dFix } from '@/utils/floatingPoint';

type MaybeString = string | number | null;

type WithStringInput = {
	string: string;
};

type WithSeparators = {
	decimalSeparator: string;
	thousandSeparator: string;
};

type WithPrecision = {
	precision: number;
};

type WithMinMax = {
	min?: number;
	max?: number;
};

// Remove all characters except numbers, decimal separator, and negative sign
const removeRestrictedCharacters = ({ string }: WithStringInput) =>
	string.replace(/(?<!^)[^0-9\.,]/g, '').replace(/[^0-9\.\-,]/g, '');

const displayThousands = ({ string, thousandSeparator }: WithStringInput & WithSeparators) =>
	string.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

const clampString = ({
	string,
	min,
	max,
	after,
}: WithStringInput & WithMinMax & { after?: string }) => {
	const adjustedMax = max ? (after && dFix(max, 0) === max ? max - 1 : max) : max;
	const value = dFix(string, 0);
	return Math.max(
		Math.min(value, adjustedMax ?? Number.MAX_VALUE),
		min ?? Number.MIN_VALUE
	).toString();
};

const numberStringToPrecision = ({
	string,
	precision,
	decimalSeparator,
	thousandSeparator,
	min,
	max,
}: WithStringInput & WithPrecision & WithSeparators & WithMinMax) => {
	const [before, after] = string.split(decimalSeparator);
	const afterTrimmed = after?.substring(0, precision).trim();
	const beforeWithThousands = displayThousands({
		string:
			string.length > 0
				? clampString({
						string: before.replaceAll(thousandSeparator, ''),
						after: afterTrimmed,
						min,
						max,
				  })
				: string,
		thousandSeparator,
		decimalSeparator,
	});
	return after !== undefined && !beforeWithThousands.includes(decimalSeparator)
		? `${beforeWithThousands}${precision > 0 ? decimalSeparator : ''}${afterTrimmed}`
		: beforeWithThousands;
};

export const formatNumberValue = ({
	value,
	precision,
	decimalSeparator,
	thousandSeparator,
	min,
	max,
}: WithPrecision & WithSeparators & WithMinMax & { value: MaybeString }) =>
	numberStringToPrecision({
		string: removeRestrictedCharacters({ string: value?.toString() || '' }),
		precision,
		decimalSeparator,
		thousandSeparator,
		min,
		max,
	});
