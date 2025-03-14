/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LISTS_TABLE } from '@/data/constants/requisitionLists';
import { CopyListProps } from '@/data/types/RequisitionLists';
import { REG_EX } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import { Button, type StackProps, TextField } from '@mui/material';
import { FC, FormEvent, useCallback, useMemo } from 'react';

type CopyListDialogProps = {
	open?: boolean;
	closeDialog: () => void;
	onDialogSubmit: (values: CopyListProps, event?: FormEvent<HTMLFormElement>) => void;
	listValues: CopyListProps;
};

export const RequisitionListsTableCopyListDialog: FC<CopyListDialogProps> = ({
	open = false,
	closeDialog,
	onDialogSubmit,
	listValues,
}) => {
	const requisitionListsNLS = useLocalization('RequisitionLists');
	const confirmationNLS = useLocalization('Confirmation');
	const { handleInputChange, handleSubmit, values, error, formRef, submitting } =
		useForm(listValues);
	const onCancel = useCallback(() => {
		closeDialog();
	}, [closeDialog]);
	const dataContainerProps = useMemo(
		() =>
			({
				component: 'form',
				ref: formRef,
				onSubmit: handleSubmit(onDialogSubmit),
				noValidate: true,
			} as StackProps<'form'>),
		[formRef, handleSubmit, onDialogSubmit]
	);

	return (
		<Dialog
			open={open}
			title={requisitionListsNLS.CopyTitle.t()}
			dataContainerProps={dataContainerProps}
			content={
				<TextField
					required
					id={`${REQUISITION_LISTS_TABLE}-copy-list-name`}
					data-testid={`${REQUISITION_LISTS_TABLE}-copy-list-name`}
					label={requisitionListsNLS.nameForCopiedList.t()}
					name="listName"
					autoFocus
					fullWidth
					value={values.listName}
					error={error.listName}
					onChange={handleInputChange}
					inputProps={{
						maxLength: 254,
						pattern: REG_EX.NICKNAME_ALPHA_NUMERIC_SPECIAL_CHAR.source,
					}}
					helperText={error.listName ? requisitionListsNLS.InvalidListName.t() : null}
				/>
			}
			actions={
				<>
					<Button
						variant="outlined"
						id={`${REQUISITION_LISTS_TABLE}-copy-list-cancel`}
						data-testid={`${REQUISITION_LISTS_TABLE}-copy-list-cancel`}
						onClick={onCancel}
						disabled={submitting}
					>
						{confirmationNLS.CancelButton.t()}
					</Button>
					<Button
						variant="contained"
						type="submit"
						disabled={submitting}
						id={`${REQUISITION_LISTS_TABLE}-copy-list-submit`}
						data-testid={`${REQUISITION_LISTS_TABLE}-copy-list-submit`}
					>
						{confirmationNLS.SubmitButton.t()}
					</Button>
				</>
			}
		/>
	);
};
