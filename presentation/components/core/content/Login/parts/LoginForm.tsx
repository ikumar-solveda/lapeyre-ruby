/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { B2B } from '@/components/blocks/B2B';
import { Linkable } from '@/components/blocks/Linkable';
import { PasswordInput } from '@/components/blocks/PasswordInput';
import { loginButtonSX } from '@/components/content/Login/styles/button';
import { UserLogon } from '@/data/Content/Login';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useForm } from '@/utils/useForm';
import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { FC } from 'react';

const initLoginValues: UserLogon = {
	logonId: '',
	logonPassword: '',
	rememberMe: false,
};
type Props = {
	onSubmit: (value: UserLogon) => void;
};

export const LoginForm: FC<Props> = ({ onSubmit }) => {
	const RouteLocal = useLocalization('Routes');
	const signInNLS = useLocalization('SignIn');

	const {
		handleInputChange,
		values: loginValues,
		formRef,
		error,
		handleSubmit,
		submitting,
	} = useForm(initLoginValues);

	const router = useNextRouter();

	const checkoutFlow = router.query.flow === 'checkout' ? true : false;
	const signInTitle = checkoutFlow
		? signInNLS.SignInAndCheckoutTitle.t()
		: signInNLS.SignInButton.t();
	const signInButton = checkoutFlow
		? signInNLS.SignInAndCheckoutButton.t()
		: signInNLS.SignInButton.t();
	const noAccountMsg = signInNLS.noAccount.t();
	const noAccountButtonText = checkoutFlow
		? signInNLS.CheckoutAsGuestButton.t()
		: signInNLS.registerNow.t();
	const noAccountButtonLink = checkoutFlow
		? RouteLocal.CheckOut.route.t()
		: RouteLocal.Registration.route.t();

	return (
		<Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} noValidate ref={formRef}>
			<Typography variant="h4">{signInTitle}</Typography>
			<TextField
				variant="outlined"
				margin="normal"
				required
				name="logonId"
				autoComplete="username"
				label={signInNLS.Label.LogonId.t()}
				autoFocus
				value={loginValues.logonId}
				onChange={handleInputChange}
				inputProps={{
					maxLength: 100,
				}}
				error={error.logonId}
			/>
			<PasswordInput
				required
				name="logonPassword"
				label={signInNLS.Password.t()}
				value={loginValues.logonPassword}
				onChange={handleInputChange}
				error={error.logonPassword}
				inputProps={{
					maxLength: 100,
				}}
			/>
			<Box>
				<FormControlLabel
					control={
						<Checkbox
							name="rememberMe"
							checked={loginValues.rememberMe}
							onChange={handleInputChange}
						/>
					}
					label={signInNLS.Label.rememberMe.t()}
				/>
			</Box>

			<Typography variant="body1">
				<Linkable
					href={`/${RouteLocal.ForgotPassword.route.t()}`}
					type="inline"
					data-testid={RouteLocal.ForgotPassword.route.t()}
					id={RouteLocal.ForgotPassword.route.t()}
				>
					{signInNLS.ForgotPassword.t()}
				</Linkable>
			</Typography>

			<Stack spacing={2}>
				<Stack alignItems="center">
					<Button
						type="submit"
						variant="contained"
						sx={loginButtonSX}
						disabled={submitting}
						data-testid="button-sign-in-submit"
						id="button-sign-in-submit"
					>
						{signInButton}
					</Button>
				</Stack>
				<B2B is={false}>
					<Divider />
					<Stack alignItems="center" spacing={2}>
						<Typography variant="body1">{noAccountMsg}</Typography>
						<Linkable
							href={noAccountButtonLink}
							type="button"
							variant="outlined"
							sx={loginButtonSX}
							data-testid="button-sign-in-register"
							id="button-sign-in-register"
						>
							{noAccountButtonText}
						</Linkable>
					</Stack>
				</B2B>
			</Stack>
		</Stack>
	);
};
