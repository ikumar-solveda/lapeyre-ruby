/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type { ScheduleForLaterType } from '@/data/types/ScheduleForLater';
import { useCallback, useEffect, useState } from 'react';

type Props = {
	date?: string;
	isScheduleForLaterEnabled?: boolean;
};

export const useExpectedDate = ({ date = '', isScheduleForLaterEnabled = false }: Props) => {
	const [scheduled, setScheduled] = useState<ScheduleForLaterType>(() => ({
		date: new Date(date || Date.now()),
		enabled: isScheduleForLaterEnabled,
	}));
	const [errorTimePicker, setErrorTimePicker] = useState<boolean>(false);

	const onChange = useCallback(
		(type: 'date' | 'time' | 'full') => (dts: Date | null) => {
			setErrorTimePicker(false);
			setScheduled((prev) => {
				const current = new Date();
				const date = dts ?? current;
				let rc;
				if (type === 'full') {
					rc = date;
				} else {
					rc = new Date((prev.date ?? current).getTime());
					if (type === 'date') {
						rc.setFullYear(date.getFullYear());
						rc.setMonth(date.getMonth());
						rc.setDate(date.getDate());
					} else if (type === 'time') {
						rc.setHours(date.getHours());
						rc.setMinutes(date.getMinutes());
						rc.setSeconds(date.getSeconds());
					}
				}

				return { ...prev, date: rc };
			});
		},
		[]
	);

	const onTimePickerError = useCallback((error: string | null) => setErrorTimePicker(!!error), []);

	const onToggle = useCallback(
		() => setScheduled((prev) => ({ ...prev, enabled: !prev.enabled })),
		[]
	);

	useEffect(
		() =>
			setScheduled((prev) => ({
				...prev,
				...(date && { date: new Date(date) }),
				...{ enabled: isScheduleForLaterEnabled ? true : false },
			})),
		[date, isScheduleForLaterEnabled]
	);

	return {
		scheduled,
		onChange,
		onToggle,
		errorTimePicker,
		onTimePickerError,
	};
};
