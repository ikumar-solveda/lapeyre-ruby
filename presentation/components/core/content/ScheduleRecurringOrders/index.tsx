/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023, 2024.
 */

import { scheduleRecurringOrdersCheckBoxSX } from '@/components/content/ScheduleRecurringOrders/styles/checkBox';
import { scheduleRecurringOrdersDateCalendarSX } from '@/components/content/ScheduleRecurringOrders/styles/dateCalendar';
import { scheduleRecurringOrdersFrequencySX } from '@/components/content/ScheduleRecurringOrders/styles/frequency';
import { scheduleRecurringOrdersFrequencyDateStack } from '@/components/content/ScheduleRecurringOrders/styles/frequencyDateStack';
import { scheduleRecurringOrdersFrequencyInputLabelSX } from '@/components/content/ScheduleRecurringOrders/styles/frequencyInputLabel';
import { useLocalization } from '@/data/Localization';
import { RECURRING_ORDER_OPTIONS } from '@/data/constants/recurringOrder';
import { useRecurringOrderState } from '@/data/state/useRecurringOrderState';
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FC, useMemo } from 'react';

export const ScheduleRecurringOrders: FC<{
	variant?: 'full' | 'compact' | 'auto' | 'mini' | 'standard';
}> = () => {
	const {
		recurringOrderInfo,
		actions: { setStartDate, setEndDate, setEnablement, setFrequency },
	} = useRecurringOrderState();
	const { isRecurring, frequency, startDate, endDate } = recurringOrderInfo;
	const date = useMemo(() => new Date(startDate as string), [startDate]);
	const end = useMemo(() => new Date((endDate as string) ?? startDate), [endDate, startDate]);
	const Cart = useLocalization('Cart');
	const Frequencies = useLocalization('CommerceEnvironment').recurringOrderFrequency;

	return (
		<Stack>
			<FormControlLabel
				control={
					<Checkbox
						data-testid={`schedule-recurring-checkbox`}
						id={`schedule-recurring-checkbox`}
						checked={isRecurring}
						onChange={setEnablement}
					/>
				}
				label={<Typography variant="subtitle1">{Cart.Labels.RecurringOrder.t()}</Typography>}
				sx={scheduleRecurringOrdersCheckBoxSX}
			/>

			{isRecurring ? (
				<Stack {...scheduleRecurringOrdersFrequencyDateStack}>
					<FormControl variant="outlined" sx={scheduleRecurringOrdersFrequencySX}>
						<InputLabel
							id="input-label-frequency"
							sx={scheduleRecurringOrdersFrequencyInputLabelSX}
						>
							{Cart.Labels.Frequency.t()}
						</InputLabel>
						<Select
							value={frequency}
							labelId="frequency"
							required
							name="frequency"
							data-testid="recurring-order-frequency"
							onChange={setFrequency}
							variant="outlined"
						>
							{RECURRING_ORDER_OPTIONS.map(({ value }) => (
								<MenuItem value={value} key={value}>
									{Frequencies[value as keyof typeof Frequencies].t()}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							sx={scheduleRecurringOrdersDateCalendarSX}
							disablePast
							label={Cart.Labels.StartDate.t()}
							value={date}
							onChange={setStartDate}
							slotProps={{
								textField: {
									variant: 'outlined',
								},
							}}
						/>
					</LocalizationProvider>

					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							sx={scheduleRecurringOrdersDateCalendarSX}
							disablePast
							label={Cart.Labels.EndDate.t()}
							value={end}
							onChange={setEndDate}
							slotProps={{ textField: { variant: 'outlined' } }}
						/>
					</LocalizationProvider>
				</Stack>
			) : null}
		</Stack>
	);
};
