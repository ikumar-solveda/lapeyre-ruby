/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AdminOrganizationManagementStepperActions } from '@/components/content/AdminOrganizationManagement/parts/Stepper/Actions';
import { AdminOrganizationManagementStepperApprovals } from '@/components/content/AdminOrganizationManagement/parts/Stepper/Approvals';
import { AdminOrganizationManagementStepperContactInformation } from '@/components/content/AdminOrganizationManagement/parts/Stepper/ContactInformation';
import { AdminOrganizationManagementStepperOrganization } from '@/components/content/AdminOrganizationManagement/parts/Stepper/Organization';
import { AdminOrganizationManagementStepperRoles } from '@/components/content/AdminOrganizationManagement/parts/Stepper/Roles';
import { adminOrganizationManagementStepperButtonSX } from '@/components/content/AdminOrganizationManagement/styles/Stepper/button';
import { useAdmin_OrganizationManagementCreate } from '@/data/Content/Admin_OrganizationManagementCreate';
import { useAdmin_OrganizationManagementDetails } from '@/data/Content/Admin_OrganizationManagementDetails';
import { useAdmin_OrganizationManagementStepper } from '@/data/Content/Admin_OrganizationManagementStepper';
import { useLocalization } from '@/data/Localization';
import { ContentContext, ContentProvider } from '@/data/context/content';
import {
	AdminOrganizationRegistration,
	OrganizationManagementStepsType,
} from '@/data/types/Admin_OrganizationManagement';
import { Switch } from '@/utils/switch';
import { useForm } from '@/utils/useForm';
import { Button, Divider, Stack, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import { FC, useContext, useEffect, useMemo } from 'react';

export type AdminOrganizationManagementStepperContextValue = {
	useAdmin_OrganizationManagementCreateOrDetailsValue: ReturnType<
		typeof useAdmin_OrganizationManagementDetails & typeof useAdmin_OrganizationManagementCreate
	>;
	actionTitle: string;
	steps: OrganizationManagementStepsType;
	stepperFormValue: ReturnType<typeof useForm<AdminOrganizationRegistration>>;
	initialFieldValues: AdminOrganizationRegistration;
	preValidated?: boolean;
};

export const OrganizationManagementStepper: FC = () => {
	const localization = useLocalization('OrganizationManagement');
	const fullValue = useContext(ContentContext) as AdminOrganizationManagementStepperContextValue;
	const {
		steps,
		initialFieldValues,
		useAdmin_OrganizationManagementCreateOrDetailsValue,
		preValidated,
	} = fullValue;
	const { activeStep, onStep, validateStepper } = useAdmin_OrganizationManagementStepper({
		steps,
		preValidated,
	});
	const { onValidateSubmit } = useAdmin_OrganizationManagementCreateOrDetailsValue;
	const stepperFormValue = useForm(initialFieldValues);
	const { formRef, handleSubmit, validate } = stepperFormValue as Required<typeof stepperFormValue>;
	const value = useMemo(() => ({ ...fullValue, stepperFormValue }), [stepperFormValue, fullValue]);

	useEffect(() => {
		if (activeStep === 0) {
			scrollTo(0, 0);
		} else {
			formRef.current?.scrollIntoView(true);
		}
	}, [activeStep, formRef]);

	return (
		<ContentProvider value={value}>
			<Stack
				spacing={1}
				divider={<Divider />}
				component="form"
				ref={formRef}
				noValidate
				onSubmit={handleSubmit(onValidateSubmit(validateStepper))}
			>
				<AdminOrganizationManagementStepperActions />
				<Stepper activeStep={activeStep} orientation="vertical">
					{steps.map(({ step }, index) => (
						<Step key={index}>
							<StepLabel onClick={onStep(validate, 0, index)}>{localization[step].t()}</StepLabel>
							<StepContent>
								{Switch(index)
									.case(0, () => <AdminOrganizationManagementStepperOrganization />)
									.case(1, () => <AdminOrganizationManagementStepperContactInformation />)
									.case(2, () => <AdminOrganizationManagementStepperRoles />)
									.case(3, () => <AdminOrganizationManagementStepperApprovals />)
									.defaultTo(() => null)}
								{index > 0 ? (
									<Button
										variant="outlined"
										onClick={onStep(validate, -1)}
										sx={adminOrganizationManagementStepperButtonSX}
									>
										{localization.BackButton.t()}
									</Button>
								) : null}
								{index < steps.length - 1 ? (
									<Button
										variant="contained"
										onClick={onStep(validate, 1)}
										sx={adminOrganizationManagementStepperButtonSX}
									>
										{localization.NextButton.t()}
									</Button>
								) : null}
							</StepContent>
						</Step>
					))}
				</Stepper>
			</Stack>
		</ContentProvider>
	);
};
