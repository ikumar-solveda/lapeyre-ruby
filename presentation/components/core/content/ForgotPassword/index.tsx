/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { ID } from '@/data/types/Basic';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { Linkable } from '@/components/blocks/Linkable';
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
import { useForm } from '@/utils/useForm';
import { useForgotPassword } from '@/data/Content/ForgotPassword';
import { forgotPasswordContainerSX } from '@/components/content/ForgotPassword/styles/container';
import { forgotPasswordButtonSX } from '@/components/content/ForgotPassword/styles/button';
import { forgotPasswordSignInButtonSX } from '@/components/content/ForgotPassword/styles/signInButton';

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
							<Typography variant="body1">{ForgotPasswordNLS.ContentText.t()}</Typography>
							<TextField
								variant="outlined"
								margin="normal"
								required
								name="email"
								autoComplete="email"
								label={ForgotPasswordNLS.EmailLabel.t()}
								autoFocus
								value={forgotPasswordValues.email}
								onChange={handleInputChange}
								inputProps={{
									maxLength: 100,
									type: 'email',
									placeholder: ForgotPasswordNLS.EmailPlaceholder.t(),
								}}
								error={error.email}
								helperText={error.email ? ForgotPasswordNLS.Msgs.InvalidFormat.t() : EMPTY_STRING}
							/>
						</Stack>
						<Stack alignItems="center">
							<Button type="submit" variant="contained" sx={forgotPasswordButtonSX}>
								{ForgotPasswordNLS.SendVerificationCodeButton.t()}
							</Button>
						</Stack>
						<Stack alignItems="center" spacing={2}>
							<Typography variant="body1">{ForgotPasswordNLS.CodeReceived.t()}</Typography>
							<Linkable
								href={
									forgotPasswordValues.email
										? {
												pathname: RouteLocal.ResetPassword.route.t(),
												query: { email: forgotPasswordValues.email },
										  }
										: { pathname: RouteLocal.ResetPassword.route.t() }
								}
								type="button"
								variant="outlined"
								sx={forgotPasswordButtonSX}
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
