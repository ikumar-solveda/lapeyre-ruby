/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { DATE_FORMAT_OPTION } from '@/data/constants/dateTime';

export const getDateTimeFormat = (
	locale: string,
	options: Intl.DateTimeFormatOptions = DATE_FORMAT_OPTION
) => new Intl.DateTimeFormat(locale, options);
