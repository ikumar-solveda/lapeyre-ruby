/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export const toMap = (a: any[], key?: string) =>
	a.reduce((mapObj, value) => {
		mapObj[key ? value[key] : value] = value;
		return mapObj;
	}, {});
