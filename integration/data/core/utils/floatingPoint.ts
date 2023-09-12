/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export const dFix = (value: number | string, decPts = 6) => +Number(value).toFixed(decPts);

export const dAdd = (...values: Array<string | number>) => {
	const rc = dFix(values.filter(Boolean).reduce((tally: number, v) => dFix(tally + dFix(v)), 0));
	return rc;
};

export const dMul = (...values: Array<string | number>) => {
	const rc = dFix(values.reduce((tally: number, v) => dFix(tally * dFix(v)), 1));
	return rc;
};

export const dDiv = (numerator: number | string, denominator: number | string) => {
	const rc = dFix(dFix(numerator) / dFix(denominator));
	return rc;
};
