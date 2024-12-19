/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DatePickerAdornment } from '@/components/blocks/DatePicker/parts/Adornment';
import { datePickerSX } from '@/components/blocks/DatePicker/styles';
import { useMediaQuery } from '@mui/material';
import { DEFAULT_DESKTOP_MODE_MEDIA_QUERY, MobileDatePicker } from '@mui/x-date-pickers';
import { useMemo } from 'react';

const DEFAULT_MATCH = { defaultMatches: true };
export const DatePicker: typeof MobileDatePicker = (props) => {
	const isDesktop = useMediaQuery(DEFAULT_DESKTOP_MODE_MEDIA_QUERY, DEFAULT_MATCH);
	const slots = useMemo(
		() => (isDesktop ? { textField: DatePickerAdornment } : undefined),
		[isDesktop]
	);
	return <MobileDatePicker {...props} sx={datePickerSX} slots={slots} />;
};
