/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AdminBuyerManagementStepperActions } from '@/components/content/AdminBuyerManagement/parts/Stepper/Actions';
import { AdminBuyerManagementStepperContactInformation } from '@/components/content/AdminBuyerManagement/parts/Stepper/ContactInformation';
import { AdminBuyerManagementStepperMemberGroup } from '@/components/content/AdminBuyerManagement/parts/Stepper/MemberGroup';
import { AdminBuyerManagementStepperOrganization } from '@/components/content/AdminBuyerManagement/parts/Stepper/Organization';
import { AdminBuyerManagementStepperRoles } from '@/components/content/AdminBuyerManagement/parts/Stepper/Roles';
import { adminBuyerManagementStepperButtonSX } from '@/components/content/AdminBuyerManagement/styles/Stepper/button';
import { useAdmin_BuyerManagementAddBuyer } from '@/data/Content/Admin_BuyerManagementAddBuyer';
import { useAdmin_BuyerManagementBuyerDetails } from '@/data/Content/Admin_BuyerManagementBuyerDetails';
import { useAdmin_BuyerManagementStepper } from '@/data/Content/Admin_BuyerManagementStepper';
import { useLocalization } from '@/data/Localization';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { BUYER_MANAGEMENT_STEPS_TYPE } from '@/data/types/Admin_BuyerManagement';
import { AdminBuyerRegistrationValueType } from '@/data/types/Admin_BuyerRegistration';
import { Switch } from '@/utils/switch';
import { useForm } from '@/utils/useForm';
import { Button, Divider, Stack, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import { FC, useContext, useEffect, useMemo } from 'react';

const defaultValidator = () => true;

type AdminBuyerManagementStepperContextValue = {
	useBuyerManagementAddOrDetailsValue: ReturnType<
		typeof useAdmin_BuyerManagementAddBuyer & typeof useAdmin_BuyerManagementBuyerDetails
	>;
	actionTitle: string;
	steps: BUYER_MANAGEMENT_STEPS_TYPE;
	stepperFormValue: ReturnType<typeof useForm<AdminBuyerRegistrationValueType>>;
	initialAdminBuyerValue: AdminBuyerRegistrationValueType;
	preValidated?: boolean;
};

export const AdminBuyerManagementStepper: FC = () => {
	const localization = useLocalization('BuyerManagement');
	const {
		useBuyerManagementAddOrDetailsValue,
		initialAdminBuyerValue,
		steps,
		actionTitle,
		preValidated,
	} = useContext(ContentContext) as unknown as AdminBuyerManagementStepperContextValue;

	const { onValidateSubmit } = useBuyerManagementAddOrDetailsValue;
	const stepperFormValue = useForm(initialAdminBuyerValue);
	const {
		handleSubmit,
		formRef,
		submitting = false,
		validate = defaultValidator,
	} = stepperFormValue;
	const { activeStep, onStep, validateStepper } = useAdmin_BuyerManagementStepper({
		steps,
		preValidated,
	});
	const contextValue = useMemo(
		() => ({ useBuyerManagementAddOrDetailsValue, stepperFormValue, actionTitle }),
		[actionTitle, stepperFormValue, useBuyerManagementAddOrDetailsValue]
	);

	useEffect(() => {
		if (activeStep === 0) {
			scrollTo(0, 0);
		} else {
			formRef.current?.scrollIntoView(true);
		}
	}, [activeStep, formRef]);

	return (
		<ContentProvider value={contextValue}>
			<Stack
				spacing={1}
				divider={<Divider />}
				component="form"
				ref={formRef}
				noValidate
				onSubmit={handleSubmit(onValidateSubmit(validateStepper))}
			>
				<AdminBuyerManagementStepperActions />
				<Stepper activeStep={activeStep} orientation="vertical">
					{steps.map(({ step }, index) => (
						<Step key={index}>
							<StepLabel onClick={onStep(validate, 0, index)}>
								{localization.StepperLabels[step].t()}
							</StepLabel>
							<StepContent>
								{Switch(index)
									.case(0, () => <AdminBuyerManagementStepperOrganization />)
									.case(1, () => <AdminBuyerManagementStepperContactInformation />)
									.case(2, () => <AdminBuyerManagementStepperRoles />)
									.case(3, () => <AdminBuyerManagementStepperMemberGroup />)
									.defaultTo(() => null)}
								{index > 0 ? (
									<Button
										variant="outlined"
										onClick={onStep(validate, -1)}
										sx={adminBuyerManagementStepperButtonSX}
									>
										{localization.Actions.Back.t()}
									</Button>
								) : null}
								{index < steps.length - 1 ? (
									<Button
										variant="contained"
										onClick={onStep(validate, 1)}
										disabled={submitting}
										sx={adminBuyerManagementStepperButtonSX}
									>
										{localization.Actions.Next.t()}
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
