/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quoteCreateEditStepLabelSX } from '@/components/content/QuoteCreateEdit/styles/stepLabel';
import { quoteCreateEditStepLabelButtonSX } from '@/components/content/QuoteCreateEdit/styles/stepLabelButton';
import { quoteCreateEditStepperSX } from '@/components/content/QuoteCreateEdit/styles/stepper';
import { CREATE_QUOTE_STEPS, STEP_LABELS, STEP_OPTIONAL } from '@/data/constants/quotes';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Button, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { type FC, useCallback, useContext } from 'react';

export const QuoteCreateEditStepper: FC = () => {
	const localization = useLocalization('CreateQuoteSections');
	const { activeStep, setActiveStep } = useContext(ContentContext) as ReturnType<
		typeof useQuoteCreateEdit
	>;
	const onClick = useCallback((step: number) => () => setActiveStep(step), [setActiveStep]);

	return CREATE_QUOTE_STEPS.length > 1 ? (
		<Paper>
			<Stepper
				activeStep={activeStep}
				sx={quoteCreateEditStepperSX}
				id="quote-stepper"
				data-testid="quote-stepper"
			>
				{CREATE_QUOTE_STEPS.map((key, i) => (
					<Step
						key={key}
						id={`quote-stepper-step-${key}`}
						data-testid={`quote-stepper-step-${key}`}
					>
						<StepLabel
							sx={quoteCreateEditStepLabelSX}
							optional={
								STEP_OPTIONAL[key] ? (
									<Typography variant="caption">{localization.optional.t()}</Typography>
								) : null
							}
						>
							{i < activeStep ? (
								<Button
									sx={quoteCreateEditStepLabelButtonSX}
									onClick={onClick(i)}
									id={`quote-stepper-step-${key}-button`}
									data-testid={`quote-stepper-step-${key}-button`}
								>
									{localization[STEP_LABELS[key] as keyof typeof localization].t()}
								</Button>
							) : (
								localization[STEP_LABELS[key] as keyof typeof localization].t()
							)}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Paper>
	) : null;
};
