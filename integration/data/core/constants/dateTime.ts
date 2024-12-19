/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
export const DATE_FORMAT_OPTION: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
};

export const DATE_TIME_FORMAT_OPTION: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	hour12: true,
};

// mm/dd/yyyy
export const EXP_DATE_OPTION: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
};

export const REQUESTED_DATE_FORMAT_OPTION = EXP_DATE_OPTION;

export const REQUESTED_DATE_TIME_FORMAT_OPTION: Intl.DateTimeFormatOptions = {
	...EXP_DATE_OPTION,
	hour: 'numeric',
	minute: 'numeric',
	hour12: true,
};
