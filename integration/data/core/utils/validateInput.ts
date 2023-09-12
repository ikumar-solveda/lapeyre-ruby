/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { REGEX } from '@/data/constants/regex';

export const validateInput = (type: keyof typeof REGEX, value: string) => {
	const stringType = REGEX[type];
	return !value?.trim() || stringType.test(value);
};
