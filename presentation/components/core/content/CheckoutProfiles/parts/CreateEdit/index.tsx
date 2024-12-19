/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CheckoutProfilesCreateEditBilling } from '@/components/content/CheckoutProfiles/parts/CreateEdit/Billing';
import { CheckoutProfilesCreateEditShipping } from '@/components/content/CheckoutProfiles/parts/CreateEdit/Shipping';
import { checkoutProfileCreateEditStepLabelSX } from '@/components/content/CheckoutProfiles/styles/CreateEdit/stepLabel';
import { checkoutProfileCreateEditStepperSX } from '@/components/content/CheckoutProfiles/styles/CreateEdit/stepper';
import { checkoutProfileCreateEditStepperPaperSX } from '@/components/content/CheckoutProfiles/styles/CreateEdit/stepperPaper';
import { useAddressBook } from '@/data/Content/AddressBook';
import { useCheckoutProfiles } from '@/data/Content/CheckoutProfiles';
import { useAllowablePaymentMethods } from '@/data/Content/_AllowablePaymentMethods';
import { useAllowableShippingModes } from '@/data/Content/_AllowableShippingModes';
import { useCheckoutProfileCreateEdit } from '@/data/Content/_CheckoutProfileCreateEdit';
import { useLocalization } from '@/data/Localization';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Paper, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { FC, useContext } from 'react';

type InputContextType = ReturnType<typeof useCheckoutProfiles> &
	ReturnType<typeof useAllowableShippingModes> &
	ReturnType<typeof useAllowablePaymentMethods>;

export const CheckoutProfilesCreateEdit: FC = () => {
	const localization = useLocalization('CheckoutProfile');
	const {
		modifyState,
		setModifyState,
		mutateCheckoutProfiles,
		onCreateCheckoutProfileSuccess,
		...rest
	} = useContext(ContentContext) as InputContextType;
	const addrBook = useAddressBook();
	const createEditValues = useCheckoutProfileCreateEdit({
		modifyState,
		setModifyState,
		mutateCheckoutProfiles,
		onCreateCheckoutProfileSuccess,
	});
	const { activeStep } = createEditValues;

	return (
		<Stack spacing={2}>
			<Paper sx={checkoutProfileCreateEditStepperPaperSX}>
				<Stepper activeStep={activeStep} sx={checkoutProfileCreateEditStepperSX}>
					<Step key="Shipping">
						<StepLabel sx={checkoutProfileCreateEditStepLabelSX}>
							{localization.ShippingInformation.t()}
						</StepLabel>
					</Step>
					<Step key="Billing">
						<StepLabel sx={checkoutProfileCreateEditStepLabelSX}>
							{localization.BillingInformation.t()}
						</StepLabel>
					</Step>
				</Stepper>
			</Paper>

			<ContentProvider
				value={{
					modifyState,
					setModifyState,
					mutateCheckoutProfiles,
					...rest,
					...addrBook,
					...createEditValues,
				}}
			>
				{activeStep === 0 ? (
					<CheckoutProfilesCreateEditShipping />
				) : (
					<CheckoutProfilesCreateEditBilling />
				)}
			</ContentProvider>
		</Stack>
	);
};
