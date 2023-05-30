/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { checkOutStepLabelSX } from '@/components/content/CheckOut/styles/stepLabel';
import { checkOutStepLabelButtonSX } from '@/components/content/CheckOut/styles/stepLabelButton';
import { checkOutStepperSX } from '@/components/content/CheckOut/styles/stepper';
import { checkOutStepperPaperSX } from '@/components/content/CheckOut/styles/stepperPaper';
import { useCheckOut } from '@/data/Content/CheckOut';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Paper, Stepper, Step, StepLabel, Button } from '@mui/material';
import { FC, useContext } from 'react';

export const CheckOutStepper: FC = () => {
	const { activeStep, setActiveStep, steps } = useContext(ContentContext) as ReturnType<
		typeof useCheckOut
	>;
	const localization = useLocalization('Checkout');
	const onClick = (step: number) => () => setActiveStep(step);

	return (
		<Paper sx={checkOutStepperPaperSX}>
			<Stepper
				activeStep={activeStep}
				sx={checkOutStepperSX}
				id="checkout-stepper"
				data-testid="checkout-stepper"
			>
				{steps.map((key, i) => (
					<Step
						key={key}
						id={`checkout-stepper-step-${key}`}
						data-testid={`checkout-stepper-step-${key}`}
					>
						<StepLabel sx={checkOutStepLabelSX}>
							{i < activeStep ? (
								<Button
									sx={checkOutStepLabelButtonSX}
									onClick={onClick(i)}
									id={`checkout-stepper-step-${key}-button`}
									data-testid={`checkout-stepper-step-${key}-button`}
								>
									{localization.Labels[key].t()}
								</Button>
							) : (
								localization.Labels[key].t()
							)}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Paper>
	);
};
