/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */
const EMPTY_ARRAY = [] as any[];
export const extractContentsArray = (data: any) =>
	Array.isArray(data?.contents) ? data.contents : EMPTY_ARRAY;
