/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AccountChangePasswordForm } from '@/components/content/Account/parts/ChangePasswordForm';
import { accountChangePasswordDialogSX } from '@/components/content/Account/styles/changePasswordDialog';
import { usePersonInfo } from '@/data/Content/PersonInfo';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FC, useContext } from 'react';

export const AccountChangePasswordDialog: FC = () => {
	const ChangePasswordLabels = useLocalization('ChangePassword');
	const { closePasswordDialog, changePassword, updatePassword } = useContext(
		ContentContext
	) as ReturnType<typeof usePersonInfo>;
	return (
		<Dialog
			open={changePassword}
			onClose={closePasswordDialog}
			aria-labelledby="change-password-dialog"
			sx={accountChangePasswordDialogSX}
		>
			<DialogTitle id="change-password-dialog">{ChangePasswordLabels.Title.t()}</DialogTitle>
			<DialogContent>
				<AccountChangePasswordForm onSubmit={updatePassword} onCancel={closePasswordDialog} />
			</DialogContent>
		</Dialog>
	);
};
