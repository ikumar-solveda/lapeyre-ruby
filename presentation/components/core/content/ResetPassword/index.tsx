/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { PasswordInput } from '@/components/blocks/PasswordInput';
import { resetPasswordButtonSX } from '@/components/content/ResetPassword/styles/button';
import { resetPasswordContainerSX } from '@/components/content/ResetPassword/styles/container';
import { resetPasswordSignInButtonSX } from '@/components/content/ResetPassword/styles/signInButton';
import { useForgotPassword } from '@/data/Content/ForgotPassword';
import { useResetPassword } from '@/data/Content/ResetPassword';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ADDRESS_FIELD_LENGTH } from '@/data/constants/addressFields';
import { ID } from '@/data/types/Basic';
import { useForm } from '@/utils/useForm';
import { Button, Divider, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { escapeRegExp } from 'lodash';
import { FC, useMemo } from 'react';

export const ResetPassword: FC<{ id: ID }> = () => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const resetPasswordNLS = useLocalization('ResetPassword');
	const RouteLocal = useLocalization('Routes');

	const { resetPasswordSubmit, initialResetPassword } = useResetPassword();
	const router = useNextRouter();

	const initialFormData = useMemo(
		() =>
			router.query.logonId
				? {
						...initialResetPassword,
						logonId: Array.isArray(router.query.logonId)
							? router.query.logonId[0]
							: router.query.logonId,
				  }
				: initialResetPassword,
		[initialResetPassword, router.query.logonId]
	);

	const {
		formRef,
		values: resetPasswordValues,
		handleInputChange,
		handleSubmit,
		error,
	} = useForm(initialFormData);

	const { forgotPasswordSubmit } = useForgotPassword();
	const handleResendVerification = () => {
		forgotPasswordSubmit({ logonId: formRef.current?.logonId.value });
	};
	const isLogonIdInput = (): boolean => formRef.current?.logonId.value;

	return (
		<Grid container spacing={contentSpacing}>
			<Grid item xs={12} md={6} m="auto">
				<Paper
					sx={resetPasswordContainerSX}
					component="form"
					onSubmit={handleSubmit(resetPasswordSubmit)}
					ref={formRef}
					noValidate
				>
					<Stack spacing={3}>
						<Stack spacing={2}>
							<Typography variant="h4">{resetPasswordNLS.Title.t()}</Typography>
							<Typography variant="body1">{resetPasswordNLS.ContentText.t()}</Typography>
							<TextField
								variant="outlined"
								margin="normal"
								required
								name="logonId"
								autoComplete="username"
								label={resetPasswordNLS.LogonIDLabel.t()}
								autoFocus
								value={resetPasswordValues.logonId}
								onChange={handleInputChange}
								inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.logonId }}
								error={error.logonId}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								name="validationCode"
								label={resetPasswordNLS.ValidationCodeLabel.t()}
								value={resetPasswordValues.validationCode}
								onChange={handleInputChange}
								inputProps={{
									maxLength: 100,
								}}
								error={error.validationCode}
							/>
							<Grid container>
								<Grid item xs={12} sm={6} pr={{ xs: 0, sm: 1 }}>
									<PasswordInput
										required
										name="logonPassword"
										label={resetPasswordNLS.NewPasswordLabel.t()}
										value={resetPasswordValues.logonPassword}
										onChange={handleInputChange}
										error={error.logonPassword}
										inputProps={{
											maxLength: 100,
											pattern: escapeRegExp(resetPasswordValues.logonPasswordVerify),
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} pl={{ xs: 0, sm: 1 }} mt={{ xs: 2, sm: 0 }}>
									<PasswordInput
										required
										name="logonPasswordVerify"
										label={resetPasswordNLS.VerifyPasswordLabel.t()}
										value={resetPasswordValues.logonPasswordVerify}
										error={error.logonPasswordVerify}
										onChange={handleInputChange}
										inputProps={{
											maxLength: 100,
											pattern: escapeRegExp(resetPasswordValues.logonPassword),
										}}
									/>
								</Grid>
							</Grid>
						</Stack>

						<Stack alignItems="center">
							<Button
								type="submit"
								variant="contained"
								sx={resetPasswordButtonSX}
								data-testid="button-reset-password-submit"
								id="button-reset-password-submit"
							>
								{resetPasswordNLS.SubmitButton.t()}
							</Button>
						</Stack>
						<Stack alignItems="center" spacing={2}>
							<Typography variant="body1">{resetPasswordNLS.PasswordNotReceived.t()}</Typography>
							<Button
								onClick={handleResendVerification}
								variant="outlined"
								disabled={!isLogonIdInput()}
								sx={resetPasswordButtonSX}
								data-testid="button-reset-password-resend-verification-code"
								id="button-reset-password-resend-verification-code"
							>
								{resetPasswordNLS.ResendVerificationCode.t()}
							</Button>
						</Stack>
						<Divider />
						<Stack alignItems="center" spacing={2}>
							<Typography variant="body1">{resetPasswordNLS.AccountInfoRemember.t()}</Typography>
							<Linkable
								href={`/${RouteLocal.Login.route.t()}`}
								type="button"
								variant="outlined"
								sx={resetPasswordSignInButtonSX}
								data-testid="sign-in-now"
								id="sign-in-now"
							>
								{resetPasswordNLS.SignIn.t()}
							</Linkable>
						</Stack>
					</Stack>
				</Paper>
			</Grid>
		</Grid>
	);
};
