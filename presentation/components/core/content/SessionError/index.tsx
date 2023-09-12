/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { sessionErrorSX } from '@/components/content/SessionError/styles/sessionError';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { Paper, Typography } from '@mui/material';
import { FC } from 'react';

export const SessionError: FC<{ id: ID }> = () => {
	const SessionNLS = useLocalization('SessionError');
	const LoginRoute = useLocalization('Routes').Login;
	return (
		<Paper sx={sessionErrorSX}>
			<Typography component="div" p={2} variant="subtitle2">
				{SessionNLS.TimeoutMsg.t()}
			</Typography>
			<Linkable
				type="button"
				href={LoginRoute.route.t()}
				id={LoginRoute.route.t()}
				data-testid={LoginRoute.route.t()}
				p={2}
			>
				{SessionNLS.SubmitButton.t()}
			</Linkable>
		</Paper>
	);
};
