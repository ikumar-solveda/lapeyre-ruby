/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { checkOutV2StepLabelSX } from '@/components/content/CheckOutV2/styles/stepLabel';
import { checkOutV2StepLabelButtonSX } from '@/components/content/CheckOutV2/styles/stepLabelButton';
import { checkOutV2StepperSX } from '@/components/content/CheckOutV2/styles/stepper';
import { checkOutV2StepperPaperSX } from '@/components/content/CheckOutV2/styles/stepperPaper';
import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Button, Paper, Step, StepLabel, Stepper } from '@mui/material';
import { FC, useContext } from 'react';

export const CheckOutV2Stepper: FC = () => {
	const { activeStep, setActiveStep, steps } = useContext(ContentContext) as ReturnType<
		typeof useCheckOutV2
	>;
	const localization = useLocalization('Checkout');
	const onClick = (step: number) => () => setActiveStep(step);

	return steps.length > 1 ? (
		<Paper sx={checkOutV2StepperPaperSX}>
			<Stepper
				activeStep={activeStep}
				sx={checkOutV2StepperSX}
				id="checkout-stepper"
				data-testid="checkout-stepper"
			>
				{steps.map((key, i) => (
					<Step
						key={key}
						id={`checkout-stepper-step-${key}`}
						data-testid={`checkout-stepper-step-${key}`}
					>
						<StepLabel sx={checkOutV2StepLabelSX}>
							{i < activeStep ? (
								<Button
									sx={checkOutV2StepLabelButtonSX}
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
	) : null;
};
