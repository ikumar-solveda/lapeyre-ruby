/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TimePickerAdornment } from '@/components/blocks/TimePicker/parts/Adornment';
import { timePickerSX } from '@/components/blocks/TimePicker/styles';
import { useMediaQuery } from '@mui/material';
import { DEFAULT_DESKTOP_MODE_MEDIA_QUERY, MobileTimePicker } from '@mui/x-date-pickers';
import { useMemo } from 'react';

const DEFAULT_MATCH = { defaultMatches: true };
export const TimePicker: typeof MobileTimePicker = (props) => {
	const isDesktop = useMediaQuery(DEFAULT_DESKTOP_MODE_MEDIA_QUERY, DEFAULT_MATCH);
	const slots = useMemo(
		() => (isDesktop ? { textField: TimePickerAdornment } : undefined),
		[isDesktop]
	);
	return <MobileTimePicker {...props} sx={timePickerSX} slots={slots} />;
};
