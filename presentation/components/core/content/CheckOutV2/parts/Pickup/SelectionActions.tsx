/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useForm } from '@/utils/useForm';
import { Button, Stack } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const CheckOutV2PickupSelectionActions: FC = () => {
	const checkoutNLS = useLocalization('Checkout');
	const { back, steps, activeStep, form } = useContext(ContentContext) as {
		form: ReturnType<typeof useForm>;
	} & ReturnType<typeof useCheckOutV2>;
	const nextStep = steps[activeStep + 1] as keyof typeof checkoutNLS.Actions.Continue;
	const previousStep =
		activeStep > 0 ? (steps[activeStep - 1] as keyof typeof checkoutNLS.Actions.Back) : null;
	const actionContinueLabel = useMemo(
		() => checkoutNLS.Actions.Continue[nextStep].t(),
		[checkoutNLS, nextStep]
	);
	const actionBackLabel = useMemo(
		() => (previousStep ? checkoutNLS.Actions.Back[previousStep].t() : ''),
		[checkoutNLS, previousStep]
	);

	return (
		<Stack
			direction={{ xs: 'column', sm: 'row' }}
			justifyContent={activeStep === 0 ? 'flex-end' : 'space-between'}
			spacing={1}
		>
			{activeStep !== 0 ? (
				<Button
					variant="outlined"
					id="pickup-details-back"
					data-testid="pickup-details-back"
					onClick={back}
					button-name="pickup-details-back"
				>
					{actionBackLabel}
				</Button>
			) : null}

			<Button
				variant="contained"
				id="pickup-details-submit"
				data-testid="pickup-details-submit"
				type="submit"
				button-name="pickup-details-submit"
				disabled={form.submitting}
			>
				{actionContinueLabel}
			</Button>
		</Stack>
	);
};
