/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useMemo } from 'react';
import { ID } from '@/data/types/Basic';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { Linkable } from '@/components/blocks/Linkable';
import { PasswordInput } from '@/components/blocks/PasswordInput';
import {
	Grid,
	Stack,
	Paper,
	Button,
	Divider,
	Typography,
	TextField,
	useTheme,
} from '@mui/material';
import { useLocalization } from '@/data/Localization';
import { REG_EX } from '@/utils/address';
import { useResetPassword } from '@/data/Content/ResetPassword';
import { useForgotPassword } from '@/data/Content/ForgotPassword';
import { resetPasswordContainerSX } from '@/components/content/ResetPassword/styles/container';
import { resetPasswordButtonSX } from '@/components/content/ResetPassword/styles/button';
import { resetPasswordSignInButtonSX } from '@/components/content/ResetPassword/styles/signInButton';
import { useForm } from '@/utils/useForm';
import { escapeRegExp } from 'lodash';
import { useNextRouter } from '@/data/Content/_NextRouter';

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
			router.query.email
				? {
						...initialResetPassword,
						email: Array.isArray(router.query.email) ? router.query.email[0] : router.query.email,
				  }
				: initialResetPassword,
		[initialResetPassword, router.query.email]
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
		forgotPasswordSubmit({ email: formRef.current?.email.value });
	};
	const isEmailInput = (): boolean => formRef.current?.email.value;

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
								name="email"
								autoComplete="email"
								label={resetPasswordNLS.EmailLabel.t()}
								autoFocus
								value={resetPasswordValues.email}
								onChange={handleInputChange}
								inputProps={{
									maxLength: 100,
									type: 'email',
									placeholder: resetPasswordNLS.EmailPlaceholder.t(),
									pattern: REG_EX.EMAIL.source,
								}}
								error={error.email}
								helperText={error.email ? resetPasswordNLS.Msgs.InvalidFormat.t() : EMPTY_STRING}
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
							<Button type="submit" variant="contained" sx={resetPasswordButtonSX}>
								{resetPasswordNLS.SubmitButton.t()}
							</Button>
						</Stack>
						<Stack alignItems="center" spacing={2}>
							<Typography variant="body1">{resetPasswordNLS.PasswordNotReceived.t()}</Typography>
							<Button
								onClick={handleResendVerification}
								variant="outlined"
								disabled={!isEmailInput()}
								sx={resetPasswordButtonSX}
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
