/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DatePicker } from '@/components/blocks/DatePicker';
import { expectedDateDialogPickerLabelSX } from '@/components/blocks/ExpectedDateDialog/styles/pickerLabel';
import { TimePicker } from '@/components/blocks/TimePicker';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { ExpectedDateDialogContextValueType } from '@/data/types/ScheduleForLater';
import { getAdapterLocaleForDatePicker } from '@/utils/getAdapterLocaleForDatePicker';
import { getDateOffsetRangeV2 } from '@/utils/getDateOffsetRangeV2';
import { FormControlLabel, FormGroup, Stack, Switch, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { type FC, useContext, useMemo } from 'react';

export const ExpectedDateDialogMessage: FC = () => {
	const { scheduled, onToggle, isDelivery, availability, onChange, onTimePickerError } = useContext(
		ContentContext
	) as ExpectedDateDialogContextValueType;
	const localization = useLocalization('ExpectedDateDialog');
	const { localeName: locale } = useStoreLocale();
	const scheduleForLaterDateRange = useMemo(
		() => getDateOffsetRangeV2(availability),
		[availability]
	);

	const minTime = useMemo(() => {
		const current = new Date();
		const currStr = current.toDateString();
		const sched = scheduled.date?.toDateString();
		const minFuture = scheduleForLaterDateRange.minDate.toDateString();

		// min-time should be bounded by current time if today's date or by min-time of minimum future,
		//   otherwise it can be unbounded
		return sched === currStr
			? current
			: sched === minFuture
			? scheduleForLaterDateRange.minDate
			: undefined;
	}, [scheduled, scheduleForLaterDateRange]);

	return (
		<Stack spacing={2}>
			<Stack>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								id="order-item-table-schedule-for-later-switch"
								data-testid="order-item-table-schedule-for-later-switch"
								checked={scheduled.enabled}
								onChange={onToggle}
							/>
						}
						label={localization.ScheduleForLater.t()}
					/>
				</FormGroup>
				{scheduled.enabled ? (
					<Stack direction="row" spacing={2}>
						<Stack>
							<LocalizationProvider
								dateAdapter={AdapterDateFns}
								adapterLocale={getAdapterLocaleForDatePicker(locale)}
								localeText={{
									datePickerToolbarTitle: localization.SelectDate.t(),
									cancelButtonLabel: localization.Cancel.t(),
									okButtonLabel: localization.OK.t(),
								}}
							>
								<DatePicker
									disablePast
									minDate={scheduleForLaterDateRange.minDate}
									maxDate={scheduleForLaterDateRange.maxDate}
									value={scheduled.date}
									onChange={onChange('date')}
								/>
							</LocalizationProvider>
							<Typography sx={expectedDateDialogPickerLabelSX} variant="caption">
								{isDelivery
									? localization.RequestedShipDate.t()
									: localization.RequestedPickupDate.t()}
							</Typography>
						</Stack>
						{!isDelivery ? (
							<Stack>
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									localeText={{
										timePickerToolbarTitle: localization.SelectTime.t(),
										cancelButtonLabel: localization.Cancel.t(),
										okButtonLabel: localization.OK.t(),
									}}
								>
									<TimePicker
										disableIgnoringDatePartForTimeValidation={true}
										minTime={minTime}
										value={scheduled.date}
										onChange={onChange('time')}
										onError={onTimePickerError}
									/>
								</LocalizationProvider>
								<Typography sx={expectedDateDialogPickerLabelSX} variant="caption">
									{localization.RequestedPickupTime.t()}
								</Typography>
							</Stack>
						) : null}
					</Stack>
				) : null}
			</Stack>
		</Stack>
	);
};
