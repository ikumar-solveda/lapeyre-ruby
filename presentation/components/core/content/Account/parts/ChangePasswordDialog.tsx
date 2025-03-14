/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { AccountChangePasswordFormV2 } from '@/components/content/Account/parts/ChangePasswordFormV2';
import type { ChangePasswordValues, usePersonInfo } from '@/data/Content/PersonInfo';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { Button, StackProps } from '@mui/material';
import { type FC, useContext, useMemo } from 'react';

const props = { 'aria-labelledby': 'change-password-dialog' };
const initialPasswordValue: ChangePasswordValues = {
	xcred_logonPasswordOld: '',
	logonPassword: '',
	xcred_logonPasswordVerify: '',
};

export const AccountChangePasswordDialog: FC = () => {
	const ChangePasswordLabels = useLocalization('ChangePassword');
	const { closePasswordDialog, changePassword, updatePassword } = useContext(
		ContentContext
	) as ReturnType<typeof usePersonInfo>;
	const formValues = useForm<ChangePasswordValues>(initialPasswordValue);
	const { handleSubmit, formRef, submitting } = formValues;
	const dataContainerProps = useMemo(
		() =>
			({
				component: 'form',
				ref: formRef,
				onSubmit: handleSubmit(updatePassword),
				noValidate: true,
			} as StackProps<'form'>),
		[formRef, handleSubmit, updatePassword]
	);

	return (
		<Dialog
			open={changePassword}
			onClose={closePasswordDialog}
			title={ChangePasswordLabels.Title.t()}
			dataContainerProps={dataContainerProps}
			content={<AccountChangePasswordFormV2 {...formValues} />}
			actions={
				<>
					<Button
						id="change-password-dialog-cancel"
						data-testid="change-password-dialog-cancel"
						variant="outlined"
						onClick={closePasswordDialog}
					>
						{ChangePasswordLabels.CancelLabel.t()}
					</Button>
					<Button
						id="change-password-dialog-submit"
						data-testid="change-password-dialog-submit"
						type="submit"
						variant="contained"
						disabled={submitting}
					>
						{ChangePasswordLabels.SaveLabel.t()}
					</Button>
				</>
			}
			props={props}
		/>
	);
};
