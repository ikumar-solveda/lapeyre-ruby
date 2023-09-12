/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useNextRouter } from '@/data/Content/_NextRouter';
import { DATE_FORMAT_OPTION } from '@/data/constants/dateTime';
import { useMemo } from 'react';

export const useDateTimeFormat = (options: Intl.DateTimeFormatOptions = DATE_FORMAT_OPTION) => {
	const { locale } = useNextRouter();
	return useMemo(() => new Intl.DateTimeFormat(locale, options), [locale, options]);
};
