/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { requisitionListsTableCopyListDialogContentSX } from '@/components/content/RequisitionListsTable/styles/copyListDialogContent';
import { requisitionListsTableCopyListDialogPaperSX } from '@/components/content/RequisitionListsTable/styles/copyListDialogPaper';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LISTS_TABLE } from '@/data/constants/requisitionLists';
import { CopyListProps } from '@/data/types/RequisitionLists';
import { REG_EX } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { FC, FormEvent, useCallback } from 'react';

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
	const { handleInputChange, handleSubmit, values, error, formRef } = useForm(listValues);
	const onCancel = useCallback(() => {
		closeDialog();
	}, [closeDialog]);

	return (
		<Dialog
			disableEscapeKeyDown
			maxWidth="sm"
			open={open}
			PaperProps={{ sx: requisitionListsTableCopyListDialogPaperSX }}
		>
			<DialogTitle>{requisitionListsNLS.CopyTitle.t()}</DialogTitle>
			<DialogContent sx={requisitionListsTableCopyListDialogContentSX}>
				<Stack
					component="form"
					ref={formRef}
					onSubmit={handleSubmit(onDialogSubmit)}
					gap={2}
					minWidth={300}
					noValidate
				>
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
					<Stack direction="row" justifyContent="flex-end" gap={2}>
						<Button
							variant="outlined"
							id={`${REQUISITION_LISTS_TABLE}-copy-list-cancel`}
							data-testid={`${REQUISITION_LISTS_TABLE}-copy-list-cancel`}
							onClick={onCancel}
						>
							{confirmationNLS.CancelButton.t()}
						</Button>
						<Button
							variant="contained"
							type="submit"
							id={`${REQUISITION_LISTS_TABLE}-copy-list-submit`}
							data-testid={`${REQUISITION_LISTS_TABLE}-copy-list-submit`}
						>
							{confirmationNLS.SubmitButton.t()}
						</Button>
					</Stack>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
