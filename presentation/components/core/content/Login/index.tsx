/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { ID } from '@/data/types/Basic';
import { Grid, Paper, useTheme } from '@mui/material';
import { UserLogon, useLogin, personMutatorKeyMatcher } from '@/data/Content/Login';
import { loginContainerSX } from '@/components/content/Login/styles/container';
import { LoginForm } from '@/components/content/Login/parts/LoginForm';
import { LoginChangePasswordForm } from '@/components/content/Login/parts/LoginChangePasswordForm';
import { useSWRConfig } from 'swr';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';

export const Login: FC<{ id: ID }> = () => {
	const {
		dimensions: { contentSpacing },
	} = useTheme();

	const router = useNextRouter();
	const RouteLocal = useLocalization('Routes');
	const { mutateUser } = useUser();
	const { mutate } = useSWRConfig();

	const { loginSubmit, setPasswordExpired, passwordExpired } = useLogin();

	const handleLogin = async (props: UserLogon) => {
		const resp = await loginSubmit(props);
		if ('userId' in resp ?? {}) {
			if (router.query.flow === 'checkout') {
				await router.push(RouteLocal.CheckOut.route.t());
			} else {
				await router.push('/').finally(() => mutateUser());
			}
			mutate(personMutatorKeyMatcher(''), undefined);
			mutateUser();
		}
	};

	const onCancel = () => {
		setPasswordExpired(null);
	};

	return (
		<Grid container spacing={contentSpacing}>
			<Grid item xs={12} md={6} m="auto">
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
		</Grid>
	);
};
