/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SessionErrorDialogLoginForm } from '@/components/content/SessionErrorDialog/parts/LoginForm';
import { useSessionError } from '@/data/Content/SessionErrorDialog';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { FC } from 'react';

export const SessionErrorDialog: FC = () => {
	const { handleCancel, message, onSubmit, logonId } = useSessionError();

	return (
		<Dialog disableEscapeKeyDown maxWidth="sm" open={!!message}>
			<DialogTitle>{message?.title}</DialogTitle>
			<DialogContent>
				<SessionErrorDialogLoginForm
					handleCancel={handleCancel}
					onSubmit={onSubmit}
					text={message?.text}
					logonId={logonId}
				/>
			</DialogContent>
		</Dialog>
	);
};
