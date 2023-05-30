/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export const extractContentsArray = (data: any) =>
	Array.isArray(data?.contents) ? data.contents : [];
