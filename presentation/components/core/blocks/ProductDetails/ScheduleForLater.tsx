/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DatePicker } from '@/components/blocks/DatePicker';
import { productDetailsBackorderTypographySX } from '@/components/blocks/ProductDetails/styles/backorderTypography';
import { productDetailsRequestedDateTimeTypographySX } from '@/components/blocks/ProductDetails/styles/requestedDateTimeTypography';
import { TimePicker } from '@/components/blocks/TimePicker';
import { ONLINE_STORE_KEY } from '@/data/constants/inventory';
import { useProductDetails } from '@/data/Content/ProductDetails';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { getAdapterLocaleForDatePicker } from '@/utils/getAdapterLocaleForDatePicker';
import { getDateOffsetRangeV2 } from '@/utils/getDateOffsetRangeV2';
import {
	FormControlLabel,
	FormGroup,
	Stack,
	Switch,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FC, useContext, useEffect, useMemo } from 'react';

const EMPTY_STORE_AVAILABILITY = {} as ProductAvailabilityData;
const EMPTY_AVAILABILITY: ProductAvailabilityData[] = [];

export const ProductDetailsScheduleForLater: FC = () => {
	const localization = useLocalization('productDetail');
	const theme = useTheme();
	const { localeName: locale } = useStoreLocale();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const {
		isDeliverySelected,
		availability = EMPTY_AVAILABILITY,
		useExpectedDateValue,
	} = useContext(ContentContext) as ReturnType<typeof useProductDetails>;
	const { scheduled, onChange, onToggle, onTimePickerError } = useExpectedDateValue;
	const storeAvailability = useMemo(
		() =>
			isDeliverySelected
				? availability.find((a) => a.storeName === ONLINE_STORE_KEY) ?? EMPTY_STORE_AVAILABILITY
				: availability.find((a) => a.physicalStoreId),
		[availability, isDeliverySelected]
	);

	const scheduleForLaterDateRange = useMemo(
		() => getDateOffsetRangeV2(storeAvailability),
		[storeAvailability]
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

	const requestedDateText = useMemo(
		() =>
			isDeliverySelected
				? localization.requestedShipDate.t()
				: localization.requestedPickupDate.t(),
		[isDeliverySelected, localization]
	);

	const futureOrderable = useMemo(
		() => !!storeAvailability?.pbcData?.fulfillmentCenter.availableToPromiseDateTime,
		[storeAvailability]
	);

	useEffect(() => {
		onChange('full')(scheduleForLaterDateRange.minDate);
	}, [scheduleForLaterDateRange, onChange]);

	return futureOrderable ? (
		<Stack spacing={2}>
			<Typography sx={productDetailsBackorderTypographySX}>
				{localization.eligibleBackordered.t()}
			</Typography>
			<Stack>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								id="schedule-for-later-switch"
								data-testid="schedule-for-later-switch"
								checked={scheduled.enabled}
								onChange={onToggle}
							/>
						}
						label={localization.scheduleForLater.t()}
					/>
				</FormGroup>
				{scheduled.enabled ? (
					<Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
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
							<Typography sx={productDetailsRequestedDateTimeTypographySX} variant="caption">
								{requestedDateText}
							</Typography>
						</Stack>
						{!isDeliverySelected ? (
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
								<Typography sx={productDetailsRequestedDateTimeTypographySX} variant="caption">
									{localization.requestedPickupTime.t()}
								</Typography>
							</Stack>
						) : null}
					</Stack>
				) : null}
			</Stack>
		</Stack>
	) : null;
};
