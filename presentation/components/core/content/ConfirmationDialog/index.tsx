/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { useLocalization } from '@/data/Localization';
import { type DialogProps, Button } from '@mui/material';
import { FC, ReactNode, useCallback } from 'react';

export type ConfirmationDialogText = {
	title?: ReactNode;
	message: ReactNode;
	cancel?: ReactNode;
	ok?: ReactNode;
};

type ConfirmationDialogProps = {
	open?: boolean;
	onConfirm: () => Promise<unknown>;
	onCancel: () => Promise<unknown>;
	text: ConfirmationDialogText;
};

const props = {
	maxWidth: 'md',
	fullWidth: false,
	'aria-labelledby': 'confirmation-dialog',
} as DialogProps;

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
	open = false,
	onCancel,
	onConfirm,
	text,
}) => {
	const confirmationNLS = useLocalization('Confirmation');
	const onCancelClick = useCallback(async () => {
		try {
			await onCancel();
		} catch (e) {}
	}, [onCancel]);

	const onOKClick = useCallback(async () => {
		try {
			await onConfirm();
		} catch (e) {}
	}, [onConfirm]);

	return (
		<Dialog
			open={open}
			onClose={onCancelClick}
			title={text.title ? text.title : null}
			content={text.message}
			actions={
				<>
					<Button
						variant="outlined"
						onClick={onCancelClick}
						id="button-confirmation-dialog-cancel"
						data-testid="button-confirmation-dialog-cancel"
					>
						{text.cancel ? text.cancel : confirmationNLS.CancelButton.t()}
					</Button>
					<Button
						variant="contained"
						onClick={onOKClick}
						id="button-confirmation-dialog-submit"
						data-testid="button-confirmation-dialog-submit"
					>
						{text.ok ? text.ok : confirmationNLS.SubmitButton.t()}
					</Button>
				</>
			}
			props={props}
		/>
	);
};
