/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { PasswordInput } from '@/components/blocks/PasswordInput';
import { RegisterOrCheckout } from '@/components/content/Login/parts/RegisterOrCheckout';
import { loginButtonSX } from '@/components/content/Login/styles/button';
import { UserLogon } from '@/data/Content/Login';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ADDRESS_FIELD_LENGTH } from '@/data/constants/addressFields';
import { useRecurringOrderState } from '@/data/state/useRecurringOrderState';
import { useForm } from '@/utils/useForm';
import {
	Alert,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';

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
	const [recurringMessage, setRecurringMessage] = useState<string>('');

	const {
		handleInputChange,
		values: loginValues,
		formRef,
		error,
		handleSubmit,
		submitting,
	} = useForm(initLoginValues);

	const router = useNextRouter();
	const {
		recurringOrderInfo: { isRecurring },
	} = useRecurringOrderState();
	const checkoutFlow = router.query.flow === 'checkout' ? true : false;
	const signInTitle = checkoutFlow
		? signInNLS.SignInAndCheckoutTitle.t()
		: signInNLS.SignInButton.t();
	const signInButton = checkoutFlow
		? signInNLS.SignInAndCheckoutButton.t()
		: signInNLS.SignInButton.t();
	const recurringMessageToShow = signInNLS.Msgs.RecurringOrder.t();

	useEffect(() => {
		// recurring order state only at client, use useEffect to avoid hydration error
		if (checkoutFlow && isRecurring) {
			setRecurringMessage(recurringMessageToShow);
		}
	}, [checkoutFlow, isRecurring, recurringMessageToShow]);

	return (
		<Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} noValidate ref={formRef}>
			<Typography variant="h4">{signInTitle}</Typography>
			{recurringMessage ? (
				<Alert variant="standard" severity="warning">
					{recurringMessage}
				</Alert>
			) : null}
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
				inputProps={{ maxLength: ADDRESS_FIELD_LENGTH.logonId }}
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
				<RegisterOrCheckout />
			</Stack>
		</Stack>
	);
};
