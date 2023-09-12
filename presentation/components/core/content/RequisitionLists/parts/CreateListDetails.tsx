/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { requisitionListsCreateListDetailsSX } from '@/components/content/RequisitionLists/styles/createListDetails';
import { useRequisitionListsCreation } from '@/data/Content/RequisitionListsCreation';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { REQUISITION_LIST, REQUISITION_LISTS_STATUS_CODE } from '@/data/constants/requisitionLists';
import { CreateListProps } from '@/data/types/RequisitionLists';
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
import { FC, FormEvent, useCallback } from 'react';

const initialValues: CreateListProps = {
	name: '',
	status: REQUISITION_LISTS_STATUS_CODE.PRIVATE,
};

type Props = {
	toggleExpand: () => void;
};

export const RequisitionListCreateListDetails: FC<Props> = ({ toggleExpand }) => {
	const { onCreate } = useRequisitionListsCreation();
	const { NewRequisitionName, Visibility, PrivateList, SharedList, InvalidListName, CreateList } =
		useLocalization('RequisitionLists');
	const { values, error, handleInputChange, formRef, handleSubmit, submitting, resetForm } =
		useForm(initialValues);

	const onSubmit = useCallback(
		async (values: CreateListProps, event?: FormEvent<HTMLFormElement>) => {
			await onCreate(values, event);
			resetForm();
			toggleExpand();
		},
		[onCreate, resetForm, toggleExpand]
	);

	return (
		<Stack spacing={1} component="form" ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
			<TextField
				required
				id={`${REQUISITION_LIST}-create-field-name`}
				data-testid={`${REQUISITION_LIST}-create-field-name`}
				name="name"
				label={
					<Typography component="span" sx={requisitionListsCreateListDetailsSX}>
						{NewRequisitionName.t()}
					</Typography>
				}
				value={values.name}
				inputProps={{ maxLength: 128, pattern: REG_EX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source }}
				onChange={handleInputChange}
				placeholder={NewRequisitionName.t()}
				error={error.name}
				helperText={error.name ? InvalidListName.t() : EMPTY_STRING}
			/>
			<FormControl>
				<FormLabel
					id={`${REQUISITION_LIST}-create-visibility-label`}
					data-testid={`${REQUISITION_LIST}-create-visibility-label`}
				>
					<Typography variant="body2" component="span" sx={requisitionListsCreateListDetailsSX}>
						{Visibility.t()}
					</Typography>
				</FormLabel>
				<RadioGroup
					row
					id={`${REQUISITION_LIST}-create-field-type`}
					data-testid={`${REQUISITION_LIST}-create-field-type`}
					aria-labelledby={`${REQUISITION_LIST}-create-visibility-label`}
					name="status"
					value={values.status}
					onChange={handleInputChange}
				>
					<FormControlLabel
						value={REQUISITION_LISTS_STATUS_CODE.PRIVATE}
						control={<Radio />}
						label={PrivateList.t()}
					/>
					<FormControlLabel
						value={REQUISITION_LISTS_STATUS_CODE.SHARED}
						control={<Radio />}
						label={SharedList.t()}
					/>
				</RadioGroup>
			</FormControl>
			<Stack alignItems="flex-start">
				<Button
					variant="contained"
					data-testid={`${REQUISITION_LIST}-create-submit-button`}
					aria-labelledby={`${REQUISITION_LIST}-create-submit-button`}
					type="submit"
					disabled={submitting}
				>
					{CreateList.t()}
				</Button>
			</Stack>
		</Stack>
	);
};
