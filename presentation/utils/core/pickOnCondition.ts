/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

export const pickOnCondition = (value: any, ...condition: boolean[]) =>
	condition.every(Boolean) ? value : undefined;
