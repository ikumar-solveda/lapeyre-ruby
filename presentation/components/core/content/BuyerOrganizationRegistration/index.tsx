/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { BuyerOrganizationRegistrationAccountPreferences } from '@/components/content/BuyerOrganizationRegistration/parts/AccountPreferences';
import { BuyerOrganizationRegistrationAddressDetails } from '@/components/content/BuyerOrganizationRegistration/parts/AddressDetails';
import { BuyerOrganizationRegistrationOrganizationDetails } from '@/components/content/BuyerOrganizationRegistration/parts/OrganizationDetails';
import { BuyerOrganizationRegistrationSignIn } from '@/components/content/BuyerOrganizationRegistration/parts/SignIn';
import { BuyerOrganizationRegistrationStepper } from '@/components/content/BuyerOrganizationRegistration/parts/Stepper';
import { BuyerOrganizationRegistrationSuccessDialog } from '@/components/content/BuyerOrganizationRegistration/parts/SuccessDialog';
import { BuyerOrganizationRegistrationUserDetails } from '@/components/content/BuyerOrganizationRegistration/parts/UserDetails';
import { buyerOrganizationRegistrationActionButtonSX } from '@/components/content/BuyerOrganizationRegistration/styles/actionButton';
import { buyerOrganizationRegistrationButtonSX } from '@/components/content/BuyerOrganizationRegistration/styles/button';
import { buyerOrganizationRegistrationContainerSX } from '@/components/content/BuyerOrganizationRegistration/styles/container';
import { buyerOrganizationRegistrationSubmissionGridSX } from '@/components/content/BuyerOrganizationRegistration/styles/submissionGrid';
import { useBuyerOrganizationRegistration } from '@/data/Content/BuyerOrganizationRegistration';
import { useLocalization } from '@/data/Localization';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { useForm } from '@/utils/useForm';
import { Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { FC, useCallback } from 'react';

export const BuyerOrganizationRegistration: FC<{ id: ID }> = () => {
	const localization = useLocalization('BuyerOrganizationRegistration');
	const buyerOrgAndAdminValues = useBuyerOrganizationRegistration();
	const { submit, submitOrg, updateForm, onStep, formData, initialOrgData, activeStep } =
		buyerOrgAndAdminValues;
	const form = useForm(formData);
	const orgForm = useForm(initialOrgData);
	const { handleSubmit: onSubmit, submitting } = form;
	const { handleSubmit: onOrgSubmit, submitting: orgSubmitting } = orgForm;
	const back = useCallback(() => {
		updateForm(form.values);
		onStep(0)();
	}, [form, onStep, updateForm]);

	return (
		<ContentProvider value={{ ...form, ...buyerOrgAndAdminValues }}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8} m="auto">
					<BuyerOrganizationRegistrationStepper />
					<Paper sx={buyerOrganizationRegistrationContainerSX}>
						{activeStep === 0 ? (
							<ContentProvider value={{ ...orgForm }}>
								<Stack
									spacing={2}
									component="form"
									ref={orgForm.formRef}
									onSubmit={onOrgSubmit(submitOrg)}
									noValidate
								>
									<BuyerOrganizationRegistrationOrganizationDetails />
									<Divider />
									<BuyerOrganizationRegistrationAddressDetails />
									<Stack alignItems="center">
										<Button
											variant="contained"
											type="submit"
											disabled={orgSubmitting}
											sx={buyerOrganizationRegistrationButtonSX}
											data-testid="button-buyer-organization-registration-next-register"
											id="button-buyer-organization-registration-next-register"
										>
											{localization.NextRegister.t()}
										</Button>
									</Stack>
									<Divider />
									<BuyerOrganizationRegistrationSignIn />
								</Stack>
							</ContentProvider>
						) : (
							<Stack
								spacing={2}
								component="form"
								ref={form.formRef}
								onSubmit={onSubmit(submit)}
								noValidate
							>
								<Typography variant="h4">{localization.BuyerAdminRegistration.t()}</Typography>
								<BuyerOrganizationRegistrationUserDetails />
								<Divider />
								<BuyerOrganizationRegistrationAddressDetails isAdminReg={true} />
								<Divider />
								<BuyerOrganizationRegistrationAccountPreferences />
								<Grid container rowSpacing={1} sx={buyerOrganizationRegistrationSubmissionGridSX}>
									<Grid item>
										<Button
											variant="outlined"
											onClick={back}
											disabled={submitting}
											sx={buyerOrganizationRegistrationActionButtonSX}
											data-testid="button-buyer-organization-registration-back"
											id="button-buyer-organization-registration-back"
										>
											{localization.Back.t()}
										</Button>
									</Grid>
									<Grid item>
										<Button
											variant="contained"
											type="submit"
											disabled={submitting}
											sx={buyerOrganizationRegistrationActionButtonSX}
											data-testid="button-buyer-organization-registration-complete-registration"
											id="button-buyer-organization-registration-complete-registration"
										>
											{localization.CompleteRegistration.t()}
										</Button>
									</Grid>
								</Grid>
							</Stack>
						)}
						<BuyerOrganizationRegistrationSuccessDialog />
					</Paper>
				</Grid>
			</Grid>
		</ContentProvider>
	);
};
