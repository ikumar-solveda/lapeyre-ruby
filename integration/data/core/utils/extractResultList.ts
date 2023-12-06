/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export const extractResultList = (data: any) =>
	Array.isArray(data?.resultList) ? data.resultList : [];
