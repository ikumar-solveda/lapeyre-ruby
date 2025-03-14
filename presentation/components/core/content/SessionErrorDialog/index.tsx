/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { SessionErrorDialogLoginForm } from '@/components/content/SessionErrorDialog/parts/LoginForm';
import { useSessionError } from '@/data/Content/SessionErrorDialog';
import { FC } from 'react';

export const SessionErrorDialog: FC = () => {
	const { handleCancel, message, onSubmit, logonId } = useSessionError();

	return (
		<Dialog
			open={!!message}
			title={message?.title}
			content={
				<SessionErrorDialogLoginForm
					handleCancel={handleCancel}
					onSubmit={onSubmit}
					text={message?.text}
					logonId={logonId}
				/>
			}
			actions={null}
		/>
	);
};
