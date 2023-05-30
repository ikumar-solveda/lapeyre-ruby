/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export const switchOnMock = <T>({ value, mockValue }: { value: T; mockValue: T }): T =>
	process.env.USE_MOCK === 'true' ? mockValue : value;
