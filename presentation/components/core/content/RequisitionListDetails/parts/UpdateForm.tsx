/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { requisitionListDetailsUpdateFormSX } from '@/components/content/RequisitionListDetails/styles/updateForm';
import { requisitionListDetailsUpdateFormActionsSX } from '@/components/content/RequisitionListDetails/styles/updateFormActions';
import { useRequisitionListDetails } from '@/data/Content/RequisitionListDetails';
import { useLocalization } from '@/data/Localization';
import {
	REQUISITION_LISTS_STATUS_CODE,
	REQUISITION_LIST_DETAILS_TABLE,
} from '@/data/constants/requisitionLists';
import { ContentContext } from '@/data/context/content';
import { REG_EX } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { FC, FormEvent, MouseEvent, useCallback, useContext, useMemo } from 'react';

type UpdateFormProps = {
	name: string;
	status: string;
};
export const RequisitionListDetailsUpdateForm: FC<UpdateFormProps & { resetEdit: () => void }> = ({
	resetEdit,
	name,
	status,
}) => {
	const requisitionListsNLS = useLocalization('RequisitionLists');
	const requisitionListItemsNLS = useLocalization('RequisitionListItems');
	const { updateRequisitionListInfo } = useContext(ContentContext) as ReturnType<
		typeof useRequisitionListDetails
	>;
	const initialValue = useMemo(() => ({ name, status }), [name, status]);
	const { values, handleSubmit, formRef, error, handleInputChange, submitting } =
		useForm(initialValue);
	const onSubmit = useCallback(
		async (values: UpdateFormProps, event?: FormEvent<HTMLFormElement>) => {
			event && event.preventDefault();
			await updateRequisitionListInfo(values);
		},
		[updateRequisitionListInfo]
	);
	const onCancelClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			event.stopPropagation();
			resetEdit();
		},
		[resetEdit]
	);
	return (
		<Stack
			gap={1}
			m={2}
			component="form"
			alignItems="flex-start"
			ref={formRef}
			onSubmit={handleSubmit(onSubmit)}
			id={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form`}
			data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form`}
			sx={requisitionListDetailsUpdateFormSX}
			noValidate
		>
			<TextField
				label={
					<Typography variant="strong" component="span">
						{requisitionListsNLS.Columns.ListName.t()}
					</Typography>
				}
				name="name"
				value={values.name}
				onChange={handleInputChange}
				required
				inputProps={{ maxLength: 128, pattern: REG_EX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source }}
				error={error.name}
				helperText={error.name ? requisitionListsNLS.InvalidListName.t() : null}
			/>
			<FormControl>
				<FormLabel
					id={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-visibility-label`}
					required
				>
					<Typography variant="strong" component="span">
						{requisitionListsNLS.Visibility.t()}
					</Typography>
				</FormLabel>
				<RadioGroup
					aria-labelledby={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-visibility-label`}
					name="status"
					id={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-visibility`}
					data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-visibility`}
					value={values.status}
					onChange={handleInputChange}
				>
					<FormControlLabel
						id={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-visibility-private`}
						data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-visibility-private`}
						value={REQUISITION_LISTS_STATUS_CODE.PRIVATE}
						control={<Radio />}
						label={requisitionListsNLS.Type.Y.t()}
					/>
					<FormControlLabel
						id={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-visibility-shared`}
						data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-visibility-shared`}
						value={REQUISITION_LISTS_STATUS_CODE.SHARED}
						control={<Radio />}
						label={requisitionListsNLS.Type.Z.t()}
					/>
				</RadioGroup>
			</FormControl>
			<Stack
				id={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-actions`}
				data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-actions`}
				alignItems="flex-start"
				direction="row"
				gap={2}
				sx={requisitionListDetailsUpdateFormActionsSX}
			>
				<Button
					size="small"
					variant="contained"
					id={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-save-button`}
					data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-save-button`}
					type="submit"
					disabled={submitting}
				>
					{requisitionListItemsNLS.saveChanges.t()}
				</Button>
				<Button
					size="small"
					variant="outlined"
					id={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-cancel-button`}
					data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-summary-edit-form-cancel-button`}
					onClick={onCancelClick}
				>
					{requisitionListItemsNLS.cancel.t()}
				</Button>
			</Stack>
		</Stack>
	);
};
