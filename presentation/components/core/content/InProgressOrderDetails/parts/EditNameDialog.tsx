/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { DIALOG_STATES, IN_PROGRESS_ORDERS_MAX_LEN } from '@/data/constants/inProgressOrders';
import { REGEX } from '@/data/constants/regex';
import { useInProgressOrderDetails } from '@/data/Content/InProgressOrderDetails';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useForm } from '@/utils/useForm';
import { CreateOutlined } from '@mui/icons-material';
import { Button, Stack, TextField, type StackProps } from '@mui/material';
import { useContext, useMemo, type FC } from 'react';

export const InProgressOrderDetailsEditNameDialog: FC = () => {
	const { onSaveName, data, dialogOpen, onDialog, dialogState } = useContext(
		ContentContext
	) as ReturnType<typeof useInProgressOrderDetails>;
	const nls = useLocalization('InProgressOrderDetails');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const form = useMemo(() => ({ name: data?.orderDescription ?? '' }), [data, dialogOpen]);
	const { values, handleSubmit, formRef, error, handleInputChange, submitting } = useForm(form);
	const dataContainerProps = useMemo(
		() =>
			({
				component: 'form',
				ref: formRef,
				onSubmit: handleSubmit(onSaveName),
				noValidate: true,
			} as StackProps<'form'>),
		[formRef, handleSubmit, onSaveName]
	);

	return dialogState === DIALOG_STATES.EDIT ? (
		<Dialog
			open={dialogOpen}
			onClose={onDialog()}
			dataContainerProps={dataContainerProps}
			title={
				<Stack direction="row" alignItems="center" gap={1}>
					<CreateOutlined color="info" />
					{nls.EditOrderNameDialog.title.t()}
				</Stack>
			}
			content={
				<TextField
					required
					autoComplete="off"
					id="edit-order-name"
					data-testid="edit-order-name"
					name="name"
					fullWidth
					value={values.name}
					onChange={handleInputChange}
					inputProps={{ maxLength: IN_PROGRESS_ORDERS_MAX_LEN, pattern: REGEX.ALNUM_FORM.source }}
					error={error.name}
					helperText={error.name ? nls.InvalidEditOrderName.t() : null}
				/>
			}
			actions={
				<>
					<Button
						variant="outlined"
						id="in-progress-order-details-dialog-cancel"
						data-testid="in-progress-order-details-dialog-cancel"
						onClick={onDialog()}
					>
						{nls.EditOrderNameDialog.cancel.t()}
					</Button>
					<OneClick
						variant="contained"
						id="in-progress-order-details-dialog-submit"
						data-testid="in-progress-order-details-dialog-submit"
						disabled={submitting}
						type="submit"
					>
						{nls.EditOrderNameDialog.save.t()}
					</OneClick>
				</>
			}
		/>
	) : null;
};
