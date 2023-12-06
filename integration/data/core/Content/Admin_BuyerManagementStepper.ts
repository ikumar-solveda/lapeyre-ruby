/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { dFix } from '@/data/Settings';
import { BUYER_MANAGEMENT_STEPS_TYPE } from '@/data/types/Admin_BuyerManagement';
import { useCallback, useState } from 'react';

const mapStepsToValidations = (steps: BUYER_MANAGEMENT_STEPS_TYPE, preValidated = false) =>
	steps.reduce((agg, step, index) => ({ ...agg, [index]: preValidated }), {});

export const useAdmin_BuyerManagementStepper = ({
	steps,
	preValidated,
}: {
	steps: BUYER_MANAGEMENT_STEPS_TYPE;
	preValidated?: boolean;
}) => {
	const [validated, setValidated] = useState<Record<number, boolean>>(
		mapStepsToValidations(steps, preValidated)
	);
	const [activeStep, setActiveStep] = useState<number>(0);

	const onStep = useCallback(
		(validator: () => boolean, delta: number, value = -1) =>
			() => {
				let rc = true;
				if (delta > 0 || value > activeStep) {
					rc = validator();
					if (rc) {
						setValidated((prev) => ({ ...prev, [activeStep]: true }));
					}
				} else {
					// we are moving back one or more steps and no longer know validity of current step, so
					//   check it and set validity and then do the move (we are allowed to move back while
					//   invalid)
					const value = validator();
					setValidated((prev) => ({ ...prev, [activeStep]: value }));
				}
				if (rc) {
					setActiveStep((prev) => (value === -1 ? prev + delta : value));
				}
			},
		[activeStep]
	);

	const validateStepper = useCallback(() => {
		// first add current step for next time
		setValidated((prev) => ({ ...prev, [activeStep]: true }));

		// now check
		const current = { ...validated, [activeStep]: true };
		const rc = Object.values(current).every((value) => !!value);
		if (!rc) {
			const keys = Object.keys(current).sort();
			const idx = keys.findIndex((k) => !validated[dFix(k, 0)]);
			setActiveStep(() => dFix(idx, 0));
		}

		return rc;
	}, [activeStep, validated]);

	return {
		activeStep,
		setActiveStep,
		onStep,
		steps,
		validateStepper,
	};
};
