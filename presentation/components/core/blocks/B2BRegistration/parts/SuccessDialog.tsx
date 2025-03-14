/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { b2bRegistrationButtonSX } from '@/components/blocks/B2BRegistration/styles/button';
import { Dialog } from '@/components/blocks/Dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { CheckCircle } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC, useCallback, useContext, useEffect, useState } from 'react';

const props = { 'aria-labelledby': 'buyer-user-registration-success-dialog' };

export const B2BRegistrationSuccessDialog: FC = () => {
	const localization = useLocalization('BuyerOrganizationRegistration');
	const router = useNextRouter();
	const { success } = useContext(ContentContext) as { success: boolean };
	const closeAndRedirect = useCallback(async () => {
		await router.push('/');
		setOpen(false);
	}, [router]);
	const [open, setOpen] = useState<boolean>(false);
	useEffect(() => {
		if (success) {
			setOpen(true);
		}
	}, [success]);

	return (
		<Dialog
			open={open}
			onClose={closeAndRedirect}
			title={
				<Stack direction="row" spacing={2}>
					<CheckCircle color="secondary" />
					<Typography variant="h6">{localization.BuyerAdminRegistration.t()}</Typography>
				</Stack>
			}
			content={localization.Success.t()}
			actions={
				<OneClick
					onClick={closeAndRedirect}
					variant="contained"
					sx={b2bRegistrationButtonSX}
					data-testid="button-buyer-user-registration-ok"
					id="button-buyer-user-registration-ok"
				>
					{localization.OK.t()}
				</OneClick>
			}
			props={props}
		/>
	);
};
