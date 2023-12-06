/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SelectWithResize } from '@/components/blocks/SelectWithResize';
import { adminBuyerApprovalsManagementSearchOptionsSX } from '@/components/content/AdminBuyerApprovalsManagement/styles/searchOptions';
import { useAdmin_BuyerApprovalsManagementTable } from '@/data/Content/Admin_BuyerApprovalsManagementTable';
import { useLocalization } from '@/data/Localization';
import { APPROVALS_LIST, initialValues } from '@/data/constants/admin_approvalsManagement';
import { ContentContext } from '@/data/context/content';
import { REG_EX } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import {
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	MenuItem,
	SelectChangeEvent,
	Stack,
	TextField,
} from '@mui/material';
import { debounce } from 'lodash';
import { ChangeEvent, FC, useCallback, useContext, useMemo } from 'react';

export const AdminBuyerApprovalsManagementSearchHeader: FC = () => {
	const { showOptions, onToggleOptions, formValue } = useContext(ContentContext) as ReturnType<
		typeof useAdmin_BuyerApprovalsManagementTable
	> & {
		formValue: ReturnType<typeof useForm<typeof initialValues>>;
	};
	const { spacing } = adminBuyerApprovalsManagementSearchOptionsSX;
	const { values, error, handleInputChange, handleSelectChange, formRef } = formValue;
	const searchOptions = useLocalization('ApprovalsManagement');
	const submitWrapper = useCallback(() => formRef.current?.requestSubmit(), [formRef]);
	const debouncedSubmit = useMemo(() => debounce(submitWrapper, 300), [submitWrapper]);

	const statusOnChange = useCallback(
		(event: SelectChangeEvent) => {
			handleSelectChange(event);
			debouncedSubmit();
		},
		[debouncedSubmit, handleSelectChange]
	);

	const inputOnChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			handleInputChange(event);
			debouncedSubmit();
		},
		[debouncedSubmit, handleInputChange]
	);

	return (
		<Stack gap={spacing} direction="row" justifyContent="space-between">
			<Grid container justifyContent="space-between" spacing={2}>
				<Grid item xs={12} md={4}>
					<TextField
						id="buyer-approval-search-header-status-id"
						data-testid="buyer-approval-search-header-status-id"
						name="approvalStatusId"
						onChange={inputOnChange}
						value={values.approvalStatusId}
						inputProps={{
							maxLength: 32,
							pattern: REG_EX.IDENTIFICATION.source,
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton aria-label={searchOptions.Search.t()} edge="end" type="submit">
										<SearchIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
						placeholder={searchOptions.SearchByApproval.t()}
						error={error.approvalStatusId}
					/>
				</Grid>
				<Grid container justifyContent="flex-end" item spacing={2} xs={12} md="auto">
					<Grid item xs={12} md="auto">
						<FormControl variant="outlined" fullWidth>
							<SelectWithResize
								value={values?.status ?? 'all'}
								name="status"
								onChange={statusOnChange}
								data-testid="buyer-approval-search-header-status-select"
								id="buyer-approval-search-header-status-select"
								fullWidth
							>
								{APPROVALS_LIST.map(({ value, key }) => (
									<MenuItem value={value} key={value}>
										{(searchOptions[key] as any).t()}
									</MenuItem>
								))}
							</SelectWithResize>
						</FormControl>
					</Grid>
					<Grid item xs={12} md="auto">
						<Button
							variant="contained"
							endIcon={showOptions ? <RemoveIcon /> : <AddIcon />}
							onClick={onToggleOptions}
							fullWidth
						>
							{searchOptions.SearchOptions.t()}
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Stack>
	);
};
