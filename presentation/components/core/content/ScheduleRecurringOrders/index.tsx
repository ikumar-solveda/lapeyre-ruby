/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { scheduleRecurringOrderstartDateCalendarSX } from '@/components/content/ScheduleRecurringOrders/styles/startDateCalendar';
import { useLocalization } from '@/data/Localization';
import { RECURRING_ORDER_OPTIONS } from '@/data/constants/recurringOrder';
import { useRecurringOrderState } from '@/data/state/useRecurringOrderState';
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Select,
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
		actions: { setDate, setEnablement, setFrequency },
	} = useRecurringOrderState();
	const { isRecurring, frequency, startDate } = recurringOrderInfo;
	const date = useMemo(() => new Date(startDate as string), [startDate]);
	const Cart = useLocalization('Cart');
	const Frequencies = useLocalization('CommerceEnvironment').recurringOrderFrequency;

	return (
		<Grid container spacing={2} alignItems="center">
			<Grid item xs={12} md="auto">
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
				/>
			</Grid>
			{isRecurring ? (
				<>
					<Grid item xs={12} sm={2}>
						<FormControl variant="standard" fullWidth>
							<InputLabel shrink id="frequency">
								{Cart.Labels.Frequency.t()}
							</InputLabel>
							<Select
								value={frequency}
								labelId="frequency"
								required
								name="frequency"
								variant="standard"
								data-testid="recurring-order-frequency"
								onChange={setFrequency}
								fullWidth
							>
								{RECURRING_ORDER_OPTIONS.map(({ value }) => (
									<MenuItem value={value} key={value}>
										{Frequencies[value as keyof typeof Frequencies].t()}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={2}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								sx={scheduleRecurringOrderstartDateCalendarSX}
								disablePast
								label={Cart.Labels.StartDate.t()}
								value={date}
								onChange={setDate}
								slotProps={{ textField: { variant: 'standard', fullWidth: true } }}
							/>
						</LocalizationProvider>
					</Grid>
				</>
			) : null}
		</Grid>
	);
};
