/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { BuyerUserRegistrationAccountPreferences } from '@/components/content/BuyerUserRegistration/parts/AccountPreferences';
import { BuyerUserRegistrationAddressDetails } from '@/components/content/BuyerUserRegistration/parts/AddressDetails';
import { BuyerUserRegistrationOrganizationDetails } from '@/components/content/BuyerUserRegistration/parts/OrganizationDetails';
import { BuyerUserRegistrationSignIn } from '@/components/content/BuyerUserRegistration/parts/SignIn';
import { BuyerUserRegistrationSuccessDialog } from '@/components/content/BuyerUserRegistration/parts/SuccessDialog';
import { buyerUserRegistrationButtonSX } from '@/components/content/BuyerUserRegistration/styles/button';
import { buyerUserRegistrationContainerSX } from '@/components/content/BuyerUserRegistration/styles/container';
import { useBuyerUserRegistration } from '@/data/Content/BuyerUserRegistration';
import { useLocalization } from '@/data/Localization';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { useForm } from '@/utils/useForm';
import { Divider, Grid, Paper, Stack } from '@mui/material';
import { FC } from 'react';

export const BuyerUserRegistration: FC<{ id: ID }> = () => {
	const localization = useLocalization('BuyerUserRegistration');
	const { submit, initialRegistration, success } = useBuyerUserRegistration();
	const form = useForm(initialRegistration);
	const { handleSubmit, submitting } = form;

	return (
		<ContentProvider value={{ ...form, success }}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8} m="auto">
					<Paper
						sx={buyerUserRegistrationContainerSX}
						component="form"
						ref={form.formRef}
						onSubmit={handleSubmit(submit)}
						noValidate
					>
						<Stack spacing={2}>
							<BuyerUserRegistrationOrganizationDetails />
							<Divider />
							<BuyerUserRegistrationAddressDetails />
							<Divider />
							<BuyerUserRegistrationAccountPreferences />
							<Stack alignItems="center">
								<OneClick
									variant="contained"
									type="submit"
									disabled={submitting}
									sx={buyerUserRegistrationButtonSX}
									data-testid="button-buyer-user-registration-submit"
									id="button-buyer-user-registration-submit"
								>
									{localization.Submit.t()}
								</OneClick>
							</Stack>
							<Divider />
							<BuyerUserRegistrationSignIn />
						</Stack>
						<BuyerUserRegistrationSuccessDialog />
					</Paper>
				</Grid>
			</Grid>
		</ContentProvider>
	);
};
