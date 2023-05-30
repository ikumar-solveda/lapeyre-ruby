/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

type MaybeString = string | number | null;

type WithStringInput = {
	string: string;
};

type WithSeparators = {
	decimalSeparator: string;
	thousandSeparator: string;
};

const stringToNumber = ({
	string,
	thousandSeparator,
	decimalSeparator,
}: WithStringInput & WithSeparators) => {
	const maybeFloat = parseFloat(
		string.replaceAll(thousandSeparator, '').replaceAll(decimalSeparator, '.')
	);
	return !isNaN(maybeFloat) ? maybeFloat : 0;
};

export const convertMaybeStringToInt = ({
	input,
	thousandSeparator,
	decimalSeparator,
}: { input: MaybeString } & WithSeparators) =>
	typeof input === 'number' && !isNaN(input)
		? input
		: typeof input === 'string'
		? stringToNumber({ string: input, thousandSeparator, decimalSeparator })
		: 0;
