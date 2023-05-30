/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PasswordInput } from '@/components/blocks/PasswordInput';
import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { REG_EX } from '@/utils/address';
import { useForm } from '@/utils/useForm';
import { Stack, Typography, TextField, DialogActions, Button } from '@mui/material';
import { FC, FormEvent, SyntheticEvent, useMemo } from 'react';

const initSessionValues: LoginInput = {
	email: '',
	logonPassword: '',
};

type LoginInput = {
	email: string;
	logonPassword: string;
};

type Props = {
	onSubmit: (login: LoginInput, event?: FormEvent) => void;
	handleCancel: (event: SyntheticEvent) => void;
	text?: string;
	logonId?: string;
};

export const SessionErrorDialogLoginForm: FC<Props> = ({
	onSubmit,
	handleCancel,
	text = '',
	logonId = '',
}) => {
	const initValues = useMemo(() => ({ ...initSessionValues, email: logonId }), [logonId]);
	const {
		handleInputChange,
		values: loginValues,
		formRef,
		error,
		handleSubmit,
	} = useForm(initValues);

	const SignInNLS = useLocalization('SignIn');
	const SessionErrorNLS = useLocalization('SessionError');
	return (
		<Stack
			onSubmit={handleSubmit(onSubmit)}
			name="sessionErrorSignInForm"
			noValidate
			ref={formRef}
			component="form"
		>
			<Typography variant="body1">{text}</Typography>
			<TextField
				variant="outlined"
				margin="normal"
				required
				name="email"
				autoComplete="username"
				label={SignInNLS.Label.Email.t()}
				disabled={!!initValues.email}
				value={loginValues.email}
				onChange={handleInputChange}
				inputProps={{
					maxLength: 100,
					type: 'email',
					placeholder: SignInNLS.emailPlaceholder.t(),
					pattern: REG_EX.EMAIL.source,
				}}
				error={error.email}
				helperText={error.email ? SignInNLS.Msgs.InvalidFormat.t() : EMPTY_STRING}
			/>
			<PasswordInput
				required
				name="logonPassword"
				autoFocus
				label={SignInNLS.Password.t()}
				value={loginValues.logonPassword}
				onChange={handleInputChange}
				error={error.logonPassword}
				inputProps={{
					maxLength: 100,
				}}
			/>
			<DialogActions>
				<Button
					data-testid="session-error-submit"
					id="session-error-submit"
					size="small"
					type="submit"
					variant="contained"
				>
					{SessionErrorNLS.SubmitButton.t()}
				</Button>
				<Button
					data-testid="session-error-cancel"
					id="session-error-cancel"
					size="small"
					onClick={handleCancel}
					variant="outlined"
				>
					{SessionErrorNLS.CancelButton.t()}
				</Button>
			</DialogActions>
		</Stack>
	);
};
