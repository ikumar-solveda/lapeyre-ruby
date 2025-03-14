/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { B2B } from '@/components/blocks/B2B';
import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { inProgressOrdersDialogTextFieldStack } from '@/components/content/InProgressOrders/styles/Dialog/textFieldStack';
import {
	IN_PROGRESS_ORDERS_MAX_LEN,
	IN_PROGRESS_ORDERS_STATUS,
} from '@/data/constants/inProgressOrders';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { REGEX } from '@/data/constants/regex';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import type {
	CreateNewOrderProps,
	InProgressOrdersContextValues,
} from '@/data/types/InProgressOrders';
import { useForm } from '@/utils/useForm';
import { CreateOutlined } from '@mui/icons-material';
import { Button, MenuItem, Select, Stack, type StackProps, TextField } from '@mui/material';
import { type FC, useCallback, useContext, useMemo } from 'react';

const initialValues: CreateNewOrderProps = {
	name: EMPTY_STRING,
	status: IN_PROGRESS_ORDERS_STATUS.SHARED,
};

export const InProgressOrdersDialogCreate: FC = () => {
	const { onCreate, showDialog, closeDialog } = useContext(
		ContentContext
	) as InProgressOrdersContextValues;
	const { settings } = useSettings();
	const nls = useLocalization('InProgressOrdersNew');
	const {
		values,
		error,
		handleInputChange,
		handleSelectChange,
		formRef,
		handleSubmit,
		resetForm,
		submitting,
	} = useForm(initialValues);

	const onSubmit = useCallback(
		async (values: CreateNewOrderProps) => {
			if (!isB2BStore(settings)) {
				await onCreate({ ...values, status: IN_PROGRESS_ORDERS_STATUS.PRIVATE });
			} else {
				await onCreate(values);
			}
			resetForm();
		},
		[onCreate, resetForm, settings]
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
					<CreateOutlined color="info" />
					{nls.Dialog.CreateNewOrder.t()}
				</Stack>
			}
			content={
				<Stack {...inProgressOrdersDialogTextFieldStack}>
					<TextField
						required
						id="create-new-in-progress-order-dialog-name"
						data-testid="create-new-in-progress-order-dialog-name"
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
					<B2B>
						<Select
							id="create-new-in-progress-order-dialog-status"
							data-testid="create-new-in-progress-order-dialog-status"
							value={values.status}
							onChange={handleSelectChange}
							name="status"
						>
							<MenuItem value={IN_PROGRESS_ORDERS_STATUS.SHARED}>{nls.Dialog.Shared.t()}</MenuItem>
							<MenuItem value={IN_PROGRESS_ORDERS_STATUS.PRIVATE}>
								{nls.Dialog.Private.t()}
							</MenuItem>
						</Select>
					</B2B>
				</Stack>
			}
			actions={
				<>
					<Button
						variant="outlined"
						id="create-new-in-progress-order-dialog-cancel"
						data-testid="create-new-in-progress-order-dialog-cancel"
						onClick={closeDialog}
					>
						{nls.Dialog.Cancel.t()}
					</Button>
					<OneClick
						variant="contained"
						type="submit"
						id="create-new-in-progress-order-dialog-save"
						data-testid="create-new-in-progress-order-dialog-save"
						disabled={submitting}
					>
						{nls.Dialog.Save.t()}
					</OneClick>
				</>
			}
		/>
	);
};
