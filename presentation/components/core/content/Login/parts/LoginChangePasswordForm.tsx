/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PasswordInput } from '@/components/blocks/PasswordInput';
import { UserLogon } from '@/data/Content/Login';
import { useLocalization, useLocalizedErrorMessage } from '@/data/Localization';
import { ErrorType } from '@/data/types/Error';
import { useForm } from '@/utils/useForm';
import { Stack, Button, Typography, Alert, Box, Checkbox, FormControlLabel } from '@mui/material';
import { escapeRegExp } from 'lodash';
import { FC, useMemo } from 'react';

const initialChangePasswordValue: UserLogon = {
	email: '',
	logonPassword: '',
	logonPasswordNew: '',
	logonPasswordVerify: '',
	rememberMe: false,
};

type Props = {
	onSubmit: (value: UserLogon) => void;
	onCancel: () => void;
	passwordExpired: ErrorType & { user: UserLogon };
};
export const LoginChangePasswordForm: FC<Props> = ({ onSubmit, onCancel, passwordExpired }) => {
	const signInNLS = useLocalization('SignIn');
	const getLocalizedErrorMessage = useLocalizedErrorMessage();
	const intialValues = useMemo(
		() => ({
			...initialChangePasswordValue,
			...passwordExpired.user,
		}),
		[passwordExpired.user]
	);
	const { handleSubmit, values, handleInputChange, formRef, error } =
		useForm<UserLogon>(intialValues);

	return (
		<Stack component="form" noValidate ref={formRef} onSubmit={handleSubmit(onSubmit)} spacing={2}>
			<Typography variant="h4">{signInNLS.ChangePassword.t()}</Typography>
			<Alert severity="error">{getLocalizedErrorMessage(passwordExpired)}</Alert>
			<PasswordInput
				value={values.logonPassword}
				required
				label={signInNLS.CurrentPassword.t()}
				autoFocus
				error={error.logonPassword}
				name="logonPassword"
				onChange={handleInputChange}
			/>
			<PasswordInput
				value={values.logonPasswordNew}
				required
				error={error.logonPasswordNew}
				label={signInNLS.Password.t()}
				name="logonPasswordNew"
				onChange={handleInputChange}
				inputProps={{
					maxLength: 100,
					pattern: escapeRegExp(values.logonPasswordVerify),
				}}
			/>
			<PasswordInput
				value={values.logonPasswordVerify}
				required
				error={error.logonPasswordVerify}
				label={signInNLS.PasswordVerify.t()}
				name="logonPasswordVerify"
				onChange={handleInputChange}
				inputProps={{
					maxLength: 100,
					pattern: escapeRegExp(values.logonPasswordNew),
				}}
			/>
			<Box>
				<FormControlLabel
					control={
						<Checkbox name="rememberMe" checked={values.rememberMe} onChange={handleInputChange} />
					}
					label={signInNLS.Label.rememberMe.t()}
				/>
			</Box>
			<Stack direction="row" spacing={1}>
				<Button
					data-testid="change-password-submit"
					id="change-password-submit"
					type="submit"
					variant="contained"
				>
					{signInNLS.Submit.t()}
				</Button>
				<Button
					data-testid="change-password-cancel"
					id="change-password-cancel"
					variant="outlined"
					onClick={onCancel}
				>
					{signInNLS.Cancel.t()}
				</Button>
			</Stack>
		</Stack>
	);
};
