/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */
import { useBuyerOrganizationRegistration } from '@/data/Content/BuyerOrganizationRegistration';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Paper, Stepper, Step, StepLabel, Button } from '@mui/material';
import { FC, useContext } from 'react';
import { buyerOrganizationRegistrationStepperPaperSX } from '@/components/content/BuyerOrganizationRegistration/styles/stepperPaper';
import { buyerOrganizationRegistrationStepperSX } from '@/components/content/BuyerOrganizationRegistration/styles/stepper';
import { buyerOrganizationRegistrationStepLabelSX } from '@/components/content/BuyerOrganizationRegistration/styles/stepLabel';
import { buyerOrganizationRegistrationStepLabelButtonSX } from '@/components/content/BuyerOrganizationRegistration/styles/stepLabelButton';

export const BuyerOrganizationRegistrationStepper: FC = () => {
	const { activeStep, setActiveStep, steps } = useContext(ContentContext) as ReturnType<
		typeof useBuyerOrganizationRegistration
	>;
	const { OrganizationRegistration, BuyerAdminRegistration } = useLocalization(
		'BuyerOrganizationRegistration'
	);
	const localization = [OrganizationRegistration, BuyerAdminRegistration];
	const onClick = (step: number) => () => setActiveStep(step);

	return (
		<Paper sx={buyerOrganizationRegistrationStepperPaperSX}>
			<Stepper
				activeStep={activeStep}
				sx={buyerOrganizationRegistrationStepperSX}
				id="checkout-stepper"
				data-testid="checkout-stepper"
			>
				{steps?.map((key) => (
					<Step
						key={key}
						id={`checkout-stepper-step-${key}`}
						data-testid={`checkout-stepper-step-${key}`}
					>
						<StepLabel sx={buyerOrganizationRegistrationStepLabelSX}>
							{key < activeStep ? (
								<Button
									sx={buyerOrganizationRegistrationStepLabelButtonSX}
									onClick={onClick(key)}
									id={`checkout-stepper-step-${key}-button`}
									data-testid={`checkout-stepper-step-${key}-button`}
								>
									{localization[key].t()}
								</Button>
							) : (
								localization[key].t()
							)}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Paper>
	);
};
