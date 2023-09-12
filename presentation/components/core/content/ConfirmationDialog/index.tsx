/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { confirmationDialogContentSX } from '@/components/content/ConfirmationDialog/styles/content';
import { useLocalization } from '@/data/Localization';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
			aria-describedby="confirmation-dialog-content"
			disableEscapeKeyDown
			maxWidth="md"
			open={open}
		>
			{text.title ? <DialogTitle>{text.title}</DialogTitle> : false}
			<DialogContent id="confirmation-dialog-content" sx={confirmationDialogContentSX}>
				{text.message}
			</DialogContent>
			<DialogActions>
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
			</DialogActions>
		</Dialog>
	);
};
