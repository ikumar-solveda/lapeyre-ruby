/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { forgotPasswordButtonSX } from '@/components/content/ForgotPassword/styles/button';
import { forgotPasswordContainerSX } from '@/components/content/ForgotPassword/styles/container';
import { forgotPasswordSignInButtonSX } from '@/components/content/ForgotPassword/styles/signInButton';
import { useForgotPassword } from '@/data/Content/ForgotPassword';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { useForm } from '@/utils/useForm';
import {
	Button,
	Divider,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import { FC } from 'react';

export const ForgotPassword: FC<{ id: ID }> = () => {
	const RouteLocal = useLocalization('Routes');
	const ForgotPasswordNLS = useLocalization('ForgotPassword');
	const {
		dimensions: { contentSpacing },
	} = useTheme();

	const { initialForgotPassword, forgotPasswordSubmit } = useForgotPassword();

	const {
		formRef,
		values: forgotPasswordValues,
		handleInputChange,
		handleSubmit,
		error,
	} = useForm(initialForgotPassword);

	return (
		<Grid container spacing={contentSpacing}>
			<Grid item xs={12} md={6} m="auto">
				<Paper
					sx={forgotPasswordContainerSX}
					component="form"
					onSubmit={handleSubmit(forgotPasswordSubmit)}
					ref={formRef}
					noValidate
				>
					<Stack spacing={3}>
						<Stack spacing={2}>
							<Typography variant="h4">{ForgotPasswordNLS.Title.t()}</Typography>
							<Typography variant="body1">{ForgotPasswordNLS.ContentTextLogonID.t()}</Typography>
							<TextField
								variant="outlined"
								margin="normal"
								required
								name="logonId"
								autoComplete="username"
								label={ForgotPasswordNLS.LogonIDLabel.t()}
								autoFocus
								value={forgotPasswordValues.logonId}
								onChange={handleInputChange}
								inputProps={{
									maxLength: 100,
								}}
								error={error.logonId}
							/>
						</Stack>
						<Stack alignItems="center">
							<Button
								type="submit"
								variant="contained"
								sx={forgotPasswordButtonSX}
								data-testid="button-forgot-password-send-verification-code"
								id="button-forgot-password-send-verification-code"
							>
								{ForgotPasswordNLS.SendVerificationCodeButton.t()}
							</Button>
						</Stack>
						<Stack alignItems="center" spacing={2}>
							<Typography variant="body1">{ForgotPasswordNLS.CodeReceived.t()}</Typography>
							<Linkable
								href={
									forgotPasswordValues.logonId
										? {
												pathname: RouteLocal.ResetPassword.route.t(),
												query: { logonId: forgotPasswordValues.logonId },
										  }
										: { pathname: RouteLocal.ResetPassword.route.t() }
								}
								type="button"
								variant="outlined"
								sx={forgotPasswordButtonSX}
								data-testid="button-forgot-password-validation-code"
								id="button-forgot-password-validation-code"
							>
								{ForgotPasswordNLS.ValidationCodeButton.t()}
							</Linkable>
						</Stack>
						<Divider />
						<Stack alignItems="center" spacing={2}>
							<Typography variant="body1">{ForgotPasswordNLS.AccountInfoRemember.t()}</Typography>
							<Linkable
								href={`/${RouteLocal.Login.route.t()}`}
								type="button"
								variant="outlined"
								sx={forgotPasswordSignInButtonSX}
								data-testid="button-forgot-password-sign-in"
								id="button-forgot-password-sign-in"
							>
								{ForgotPasswordNLS.SignIn.t()}
							</Linkable>
						</Stack>
					</Stack>
				</Paper>
			</Grid>
		</Grid>
	);
};
