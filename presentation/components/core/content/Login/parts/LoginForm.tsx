/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { Linkable } from '@/components/blocks/Linkable';
import { PasswordInput } from '@/components/blocks/PasswordInput';
import {
	Stack,
	Button,
	Divider,
	Typography,
	TextField,
	FormControlLabel,
	Checkbox,
	Box,
} from '@mui/material';
import { useLocalization } from '@/data/Localization';
import { REG_EX } from '@/utils/address';
import { UserLogon } from '@/data/Content/Login';
import { loginButtonSX } from '@/components/content/Login/styles/button';
import { useForm } from '@/utils/useForm';
import { useNextRouter } from '@/data/Content/_NextRouter';

const initLoginValues: UserLogon = {
	email: '',
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
				name="email"
				autoComplete="username"
				label={signInNLS.Label.Email.t()}
				autoFocus
				value={loginValues.email}
				onChange={handleInputChange}
				inputProps={{
					maxLength: 100,
					type: 'email',
					placeholder: signInNLS.emailPlaceholder.t(),
					pattern: REG_EX.EMAIL.source,
				}}
				error={error.email}
				helperText={error.email ? signInNLS.Msgs.InvalidFormat.t() : EMPTY_STRING}
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
				<Linkable href={`/${RouteLocal.ForgotPassword.route.t()}`} type="inline">
					{signInNLS.ForgotPassword.t()}
				</Linkable>
			</Typography>

			<Stack spacing={2}>
				<Stack alignItems="center">
					<Button type="submit" variant="contained" sx={loginButtonSX}>
						{signInButton}
					</Button>
				</Stack>
				<Divider />
				<Stack alignItems="center" spacing={2}>
					<Typography variant="body1">{noAccountMsg}</Typography>
					<Linkable href={noAccountButtonLink} type="button" variant="outlined" sx={loginButtonSX}>
						{noAccountButtonText}
					</Linkable>
				</Stack>
			</Stack>
		</Stack>
	);
};
