/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { B2B } from '@/components/blocks/B2B';
import { LoginChangePasswordForm } from '@/components/content/Login/parts/LoginChangePasswordForm';
import { LoginForm } from '@/components/content/Login/parts/LoginForm';
import { LoginRegistrationB2BForm } from '@/components/content/Login/parts/LoginRegistrationB2BForm';
import { loginContainerSX } from '@/components/content/Login/styles/container';
import { useCartSWRKey } from '@/data/Content/Cart';
import { UserLogon, personMutatorKeyMatcher, useLogin } from '@/data/Content/Login';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC } from '@/data/constants/dataKey';
import { EventsContext } from '@/data/context/events';
import { ValidateLocaleRequestContext } from '@/data/context/validateLocaleRequest';
import type { ID } from '@/data/types/Basic';
import type { LoginResponse } from '@/data/types/UserContext';
import { cartMutatorKeyMatcher } from '@/utils/mutatorKeyMatchers';
import { Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useCallback, useContext } from 'react';
import { useSWRConfig } from 'swr';

const EMPTY_RESPONSE = {};
export const Login: FC<{ id: ID }> = () => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const { onLogin } = useContext(EventsContext);
	const router = useNextRouter();
	const RouteLocal = useLocalization('Routes');
	const { mutate } = useSWRConfig();
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const { user } = useUser();
	const { settings } = useSettings();
	const { loginSubmit, setPasswordExpired, passwordExpired } = useLogin();
	const { setValidateRequested } = useContext(ValidateLocaleRequestContext);

	const handleLogin = useCallback(
		async (props: UserLogon) => {
			const resp = await loginSubmit(props);
			if ('userId' in (resp ?? EMPTY_RESPONSE)) {
				onLogin({
					gtm: { settings, newUserData: resp as LoginResponse, oldUserData: user?.context },
				});
				if (router.query.flow === 'checkout') {
					await router.push(RouteLocal.CheckOut.route.t());
				} else {
					await router.push('/');
				}
				setValidateRequested(true);
				await mutate(personMutatorKeyMatcher(''));
				await mutate(personMutatorKeyMatcher(DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC), undefined);
				await mutate(cartMutatorKeyMatcher('')); // at current page
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // all cart except current cart, e.g different locale
			}
		},
		[
			RouteLocal,
			currentCartSWRKey,
			loginSubmit,
			mutate,
			onLogin,
			router,
			setValidateRequested,
			settings,
			user?.context,
		]
	);

	const onCancel = () => {
		setPasswordExpired(null);
	};

	return (
		<Grid container spacing={contentSpacing} justifyContent="center">
			<Grid item xs={12} sm={8} md={6} m="auto">
				<Paper sx={loginContainerSX}>
					{passwordExpired !== null ? (
						<LoginChangePasswordForm
							onSubmit={handleLogin}
							onCancel={onCancel}
							passwordExpired={passwordExpired}
						/>
					) : (
						<LoginForm onSubmit={handleLogin} />
					)}
				</Paper>
			</Grid>
			<B2B>
				<Grid item xs={12} sm={8} md={6}>
					<LoginRegistrationB2BForm />
				</Grid>
			</B2B>
		</Grid>
	);
};
