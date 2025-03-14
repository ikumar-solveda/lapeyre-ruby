/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { PasswordInput } from '@/components/blocks/PasswordInput';
import { accountChangePasswordFormSX } from '@/components/content/Account/styles/changePasswordForm';
import { ChangePasswordValues } from '@/data/Content/PersonInfo';
import { useLocalization } from '@/data/Localization';
import { useForm } from '@/utils/useForm';
import { Button, DialogActions, Stack } from '@mui/material';
import { escapeRegExp } from 'lodash';
import { FC } from 'react';

const initialPasswordValue: ChangePasswordValues = {
	xcred_logonPasswordOld: '',
	logonPassword: '',
	xcred_logonPasswordVerify: '',
};

type Prop = {
	onSubmit: (value: ChangePasswordValues) => void;
	onCancel: () => void;
};

/**
 * @deprecated in favour of AccountChangePasswordFormV2
 */
export const AccountChangePasswordForm: FC<Prop> = ({ onSubmit, onCancel }) => {
	const ChangePasswordLabels = useLocalization('ChangePassword');
	const { handleSubmit, values, handleInputChange, formRef, error } =
		useForm<ChangePasswordValues>(initialPasswordValue);
	return (
		<Stack
			component="form"
			noValidate
			ref={formRef}
			onSubmit={handleSubmit(onSubmit)}
			display="block"
			spacing={3}
			sx={accountChangePasswordFormSX}
		>
			<PasswordInput
				value={values.xcred_logonPasswordOld}
				required
				label={ChangePasswordLabels.CurrentPasswordLabel.t()}
				autoFocus
				error={error.xcred_logonPasswordOld}
				name="xcred_logonPasswordOld"
				onChange={handleInputChange}
			/>
			<PasswordInput
				value={values.logonPassword}
				required
				error={error.logonPassword}
				label={ChangePasswordLabels.NewPasswordLabel.t()}
				name="logonPassword"
				onChange={handleInputChange}
				inputProps={{
					maxLength: 100,
					pattern: escapeRegExp(values.xcred_logonPasswordVerify),
				}}
			/>
			<PasswordInput
				value={values.xcred_logonPasswordVerify}
				required
				error={error.xcred_logonPasswordVerify}
				label={ChangePasswordLabels.VerifyPasswordLabel.t()}
				name="xcred_logonPasswordVerify"
				onChange={handleInputChange}
				inputProps={{
					maxLength: 100,
					pattern: escapeRegExp(values.logonPassword),
				}}
			/>
			<DialogActions>
				<Button
					id="change-password-dialog-submit"
					data-testid="change-password-dialog-submit"
					type="submit"
					variant="contained"
				>
					{ChangePasswordLabels.SaveLabel.t()}
				</Button>
				<Button
					id="change-password-dialog-cancel"
					data-testid="change-password-dialog-cancel"
					variant="outlined"
					onClick={onCancel}
				>
					{ChangePasswordLabels.CancelLabel.t()}
				</Button>
			</DialogActions>
		</Stack>
	);
};
