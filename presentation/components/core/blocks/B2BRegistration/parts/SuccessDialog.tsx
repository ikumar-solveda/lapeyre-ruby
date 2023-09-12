/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { b2bRegistrationButtonSX } from '@/components/blocks/B2BRegistration/styles/button';
import { b2bRegistrationDialogSX } from '@/components/blocks/B2BRegistration/styles/dialog';
import { OneClick } from '@/components/blocks/OneClick';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Dialog, DialogContent, Paper, Stack } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';

export const B2BRegistrationSuccessDialog: FC = () => {
	const localization = useLocalization('BuyerOrganizationRegistration');
	const router = useNextRouter();
	const { success } = useContext(ContentContext) as { success: boolean };
	const closeAndRedirect = async () => {
		await router.push('/');
		setOpen(false);
	};
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
			aria-labelledby="buyer-user-registration-success-dialog"
		>
			<Paper sx={b2bRegistrationDialogSX}>
				<Stack alignItems="center">
					<DialogContent>{localization.Success.t()}</DialogContent>
					<OneClick
						onClick={closeAndRedirect}
						variant="contained"
						sx={b2bRegistrationButtonSX}
						data-testid="button-buyer-user-registration-ok"
						id="button-buyer-user-registration-ok"
					>
						{localization.OK.t()}
					</OneClick>
				</Stack>
			</Paper>
		</Dialog>
	);
};
