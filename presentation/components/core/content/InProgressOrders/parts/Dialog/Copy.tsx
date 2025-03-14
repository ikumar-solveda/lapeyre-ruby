/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { inProgressOrdersDialogTextFieldStack } from '@/components/content/InProgressOrders/styles/Dialog/textFieldStack';
import { IN_PROGRESS_ORDERS_MAX_LEN } from '@/data/constants/inProgressOrders';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { REGEX } from '@/data/constants/regex';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { CopyOrderProps, InProgressOrdersContextValues } from '@/data/types/InProgressOrders';
import { useForm } from '@/utils/useForm';
import { ContentCopyOutlined } from '@mui/icons-material';
import { Button, Stack, type StackProps, TextField } from '@mui/material';
import { type FC, useCallback, useContext, useMemo } from 'react';

const initialValues: CopyOrderProps = {
	name: EMPTY_STRING,
	orderId: EMPTY_STRING,
};

export const InProgressOrdersDialogCopy: FC = () => {
	const { onCopy, closeDialog, showDialog, orderId } = useContext(
		ContentContext
	) as InProgressOrdersContextValues;
	const nls = useLocalization('InProgressOrdersNew');
	const { values, error, handleInputChange, formRef, handleSubmit, resetForm, submitting } =
		useForm(initialValues);

	const onSubmit = useCallback(
		async (values: CopyOrderProps) => {
			await onCopy({ ...values, orderId: orderId.join('') });
			resetForm();
		},
		[onCopy, orderId, resetForm]
	);

	const dataContainerProps = useMemo(
		() =>
			({
				component: 'form',
				ref: formRef,
				onSubmit: handleSubmit(onSubmit),
				noValidate: true,
			} as StackProps<'form'>),
		[formRef, handleSubmit, onSubmit]
	);

	return (
		<Dialog
			open={showDialog}
			onClose={closeDialog}
			dataContainerProps={dataContainerProps}
			title={
				<Stack direction="row" alignItems="center" gap={1}>
					<ContentCopyOutlined color="info" />
					{nls.Dialog.CopyOrder.t()}
				</Stack>
			}
			content={
				<Stack {...inProgressOrdersDialogTextFieldStack}>
					<TextField
						required
						id="copy-in-progress-order-dialog-name"
						data-testid="copy-in-progress-order-dialog-name"
						name="name"
						placeholder={nls.Dialog.Placeholder.t()}
						autoComplete="off"
						autoFocus
						value={values.name}
						onChange={handleInputChange}
						inputProps={{ maxLength: IN_PROGRESS_ORDERS_MAX_LEN, pattern: REGEX.ALNUM_FORM.source }}
						error={error.name}
						helperText={error.name ? nls.Dialog.InvalidOrderName.t() : null}
					/>
				</Stack>
			}
			actions={
				<>
					<Button
						variant="outlined"
						id="copy-in-progress-order-dialog-cancel"
						data-testid="copy-in-progress-order-dialog-cancel"
						onClick={closeDialog}
					>
						{nls.Dialog.Cancel.t()}
					</Button>
					<OneClick
						variant="contained"
						type="submit"
						id="copy-in-progress-order-dialog-save"
						data-testid="copy-in-progress-order-dialog-save"
						disabled={submitting}
					>
						{nls.Dialog.Save.t()}
					</OneClick>
				</>
			}
		/>
	);
};
