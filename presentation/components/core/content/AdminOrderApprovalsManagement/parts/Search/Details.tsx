/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { adminOrderApprovalsManagementDatePickerSX } from '@/components/content/AdminOrderApprovalsManagement/styles/datePicker';
import { adminOrderApprovalsManagementSearchOptionsSX } from '@/components/content/AdminOrderApprovalsManagement/styles/searchOptions';
import { adminOrderApprovalsManagementSearchOptionsDetailsSX } from '@/components/content/AdminOrderApprovalsManagement/styles/searchOptionsDetails';
import { useAdmin_OrderApprovalsManagementTable } from '@/data/Content/Admin_OrderApprovalsManagementTable';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { ORDER_APPROVALS, initialValues } from '@/data/constants/admin_approvalsManagement';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ContentContext } from '@/data/context/content';
import { AdminBuyerOrderSearchData } from '@/data/types/Admin_ApprovalsManagement';
import { REG_EX } from '@/utils/address';
import { getAdapterLocaleForDatePicker } from '@/utils/getAdapterLocaleForDatePicker';
import { useForm } from '@/utils/useForm';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FC, useCallback, useContext } from 'react';

export const AdminOrderApprovalsManagementSearchDetails: FC = () => {
	const { formValue } = useContext(ContentContext) as ReturnType<
		typeof useAdmin_OrderApprovalsManagementTable
	> & { formValue: ReturnType<typeof useForm<typeof initialValues>> };
	const { values, onNamedValueChange, handleInputChange, error, submitting } = formValue;
	const { spacing } = adminOrderApprovalsManagementSearchOptionsSX;
	const onChange = useCallback(
		(name: keyof AdminBuyerOrderSearchData) => (value: Date | null) => {
			onNamedValueChange(name, value ?? undefined);
		},
		[onNamedValueChange]
	);
	const searchOptions = useLocalization('ApprovalsManagement');
	const { localeName: locale } = useStoreLocale();

	return (
		<Stack gap={spacing} sx={adminOrderApprovalsManagementSearchOptionsDetailsSX}>
			<Grid container spacing={spacing}>
				<Grid item xs={12} sm={6} md={4}>
					<TextField
						id={`${ORDER_APPROVALS}-first-name`}
						data-testid={`${ORDER_APPROVALS}-first-name`}
						name="submitterFirstName"
						label={searchOptions.BuyerFirstName.t()}
						value={values.submitterFirstName}
						inputProps={{
							maxLength: 40,
							pattern: REG_EX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source,
						}}
						onChange={handleInputChange}
						placeholder={searchOptions.BuyerFirstName.t()}
						error={error?.submitterFirstName}
						helperText={
							error?.submitterFirstName ? searchOptions.InvalidBuyerName.t() : EMPTY_STRING
						}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<TextField
						id={`${ORDER_APPROVALS}-last-name`}
						data-testid={`${ORDER_APPROVALS}-last-name`}
						name="submitterLastName"
						label={searchOptions.BuyerLastName.t()}
						value={values.submitterLastName}
						inputProps={{
							maxLength: 40,
							pattern: REG_EX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source,
						}}
						onChange={handleInputChange}
						placeholder={searchOptions.BuyerLastName.t()}
						error={error.submitterLastName}
						helperText={error.submitterLastName ? searchOptions.InvalidBuyerName.t() : EMPTY_STRING}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<LocalizationProvider
						dateAdapter={AdapterDateFns}
						adapterLocale={getAdapterLocaleForDatePicker(locale)}
						localeText={{
							datePickerToolbarTitle: searchOptions.SelectDate.t(),
							cancelButtonLabel: searchOptions.Cancel.t(),
							okButtonLabel: searchOptions.OK.t(),
						}}
					>
						<DatePicker
							label={searchOptions.StartDate.t()}
							onChange={onChange('startSubmitTime')}
							value={values?.startSubmitTime ?? null}
							disableFuture
							sx={adminOrderApprovalsManagementDatePickerSX}
						/>
					</LocalizationProvider>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<LocalizationProvider
						dateAdapter={AdapterDateFns}
						adapterLocale={getAdapterLocaleForDatePicker(locale)}
						localeText={{
							datePickerToolbarTitle: searchOptions.SelectDate.t(),
							cancelButtonLabel: searchOptions.Cancel.t(),
							okButtonLabel: searchOptions.OK.t(),
						}}
					>
						<DatePicker
							label={searchOptions.EndDate.t()}
							onChange={onChange('endSubmitTime')}
							value={values?.endSubmitTime ?? null}
							disableFuture
							sx={adminOrderApprovalsManagementDatePickerSX}
						/>
					</LocalizationProvider>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item>
					<Button
						variant="contained"
						data-testid={`${ORDER_APPROVALS}-search-button`}
						aria-labelledby={`${ORDER_APPROVALS}-search-button`}
						type="submit"
						disabled={submitting}
					>
						{searchOptions.Search.t()}
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						data-testid={`${ORDER_APPROVALS}-clear-results-button`}
						aria-labelledby={`${ORDER_APPROVALS}-clear-results-button`}
						type="reset"
					>
						{searchOptions.ClearResults.t()}
					</Button>
				</Grid>
			</Grid>
		</Stack>
	);
};
