/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
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
import { ID } from '@/data/types/Basic';
import { cartMutatorKeyMatcher } from '@/utils/mutatorKeyMatchers';
import { Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';
import { useSWRConfig } from 'swr';

export const Login: FC<{ id: ID }> = () => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();

	const router = useNextRouter();
	const RouteLocal = useLocalization('Routes');
	const { mutate } = useSWRConfig();
	const currentCartSWRKey = useCartSWRKey(); // in current language

	const { loginSubmit, setPasswordExpired, passwordExpired } = useLogin();

	const handleLogin = async (props: UserLogon) => {
		const resp = await loginSubmit(props);
		if ('userId' in resp ?? {}) {
			if (router.query.flow === 'checkout') {
				await router.push(RouteLocal.CheckOut.route.t());
			} else {
				await router.push('/');
			}
			await mutate(personMutatorKeyMatcher(''), undefined);
			await mutate(cartMutatorKeyMatcher('')); // at current page
			await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // all cart except current cart, e.g different locale
		}
	};

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
