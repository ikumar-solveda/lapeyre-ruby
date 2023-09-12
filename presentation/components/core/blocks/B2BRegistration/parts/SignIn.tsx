/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { b2bRegistrationButtonSX } from '@/components/blocks/B2BRegistration/styles/button';
import { Linkable } from '@/components/blocks/Linkable';
import { useLocalization } from '@/data/Localization';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const B2BRegistrationSignIn: FC = () => {
	const localization = useLocalization('RegistrationLayout');
	const RouteLocal = useLocalization('Routes');
	return (
		<Stack alignItems="center" spacing={2}>
			<Typography>{localization.Account.t()}</Typography>
			<Linkable
				href={`/${RouteLocal.Login.route.t()}`}
				type="button"
				variant="outlined"
				sx={b2bRegistrationButtonSX}
				data-testid="button-buyer-organization-registration-sign-in"
				id="button-buyer-organization-registration-sign-in"
			>
				{localization.SignIn.t()}
			</Linkable>
		</Stack>
	);
};
