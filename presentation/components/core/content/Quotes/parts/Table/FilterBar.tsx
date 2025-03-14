/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { DatePicker } from '@/components/blocks/DatePicker';
import { OneClick } from '@/components/blocks/OneClick';
import { quotesTableClearButtonSX } from '@/components/content/Quotes/styles/Table/clearButton';
import { quotesTableFilterMenuHeightSX } from '@/components/content/Quotes/styles/Table/filterMenuHeight';
import { quotesTableFilterStack } from '@/components/content/Quotes/styles/Table/filterStack';
import { quotesTableFilterStatusSX } from '@/components/content/Quotes/styles/Table/filterStatus';
import { State, StateLabels } from '@/data/constants/quotes';
import type { useQuotes } from '@/data/Content/Quotes';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { getAdapterLocaleForDatePicker } from '@/utils/getAdapterLocaleForDatePicker';
import { Checkbox, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { type FC, useContext } from 'react';

const resetTimeOffset = (date: Date) => {
	date.setHours(date.getHours() - 23);
	date.setMinutes(date.getMinutes() - 59);
	date.setSeconds(date.getSeconds() - 59);
	date.setMilliseconds(date.getMilliseconds() - 999);
	return date;
};

export const QuotesTableFilterBar: FC = () => {
	const quotesTableNLS = useLocalization('QuotesTable');
	const nls = useLocalization('QuoteStates');
	const quotes = useLocalization('Quotes');
	const localization = useLocalization('productDetail');
	const quotesContent = useContext(ContentContext) as ReturnType<typeof useQuotes>;
	const { statuses, date, onStatus, onDateFrom, onDateTo, onClear } = quotesContent;
	const { localeName: locale } = useStoreLocale();

	return (
		<Stack {...quotesTableFilterStack}>
			<FormControl fullWidth sx={quotesTableFilterStatusSX}>
				<InputLabel>{quotesTableNLS.Filter.t()}</InputLabel>
				<Select
					displayEmpty
					id="filter-by-statuses"
					data-testid="filter-by-statuses"
					multiple
					value={statuses}
					onChange={onStatus}
					renderValue={(selected: string[]) =>
						selected.length ? selected.map((s: string) => StateLabels[s]).join(', ') : null
					}
					MenuProps={{
						PaperProps: {
							sx: quotesTableFilterMenuHeightSX,
						},
					}}
				>
					{Object.entries(State).map(([_status, index]) => (
						<MenuItem key={index} value={index.toString()}>
							<Checkbox checked={!!statuses.find((s: string) => s === index.toString())} />
							{nls[StateLabels[`${index}`] as keyof typeof nls]?.t()}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<LocalizationProvider
				dateAdapter={AdapterDateFns}
				adapterLocale={getAdapterLocaleForDatePicker(locale)}
				localeText={{
					datePickerToolbarTitle: localization.SelectDate.t(),
					cancelButtonLabel: localization.Cancel.t(),
					okButtonLabel: localization.OK.t(),
				}}
			>
				<Stack direction="row" spacing={1}>
					<DatePicker
						disableFuture
						label={quotes.DateFrom.t()}
						onChange={onDateFrom}
						value={date?.fromDate ? new Date(date.fromDate) : null}
						maxDate={date?.toDate ? new Date(date.toDate) : undefined}
					/>
					<DatePicker
						disableFuture
						label={quotes.DateTo.t()}
						onChange={onDateTo}
						value={date?.toDate ? resetTimeOffset(new Date(date.toDate)) : null}
						minDate={date?.fromDate ? new Date(date.fromDate) : undefined}
					/>
				</Stack>
			</LocalizationProvider>

			<OneClick variant="outlined" onClick={onClear} sx={quotesTableClearButtonSX}>
				{quotes.Clear.t()}
			</OneClick>
		</Stack>
	);
};
