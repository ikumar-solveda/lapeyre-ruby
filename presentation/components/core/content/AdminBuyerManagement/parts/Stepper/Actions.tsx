/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { adminBuyerManagementStepperActionsStack } from '@/components/content/AdminBuyerManagement/styles/Stepper/actionsStack';
import { adminBuyerManagementStepperTypographySX } from '@/components/content/AdminBuyerManagement/styles/Stepper/typography';
import { useAdmin_BuyerManagementAddBuyer } from '@/data/Content/Admin_BuyerManagementAddBuyer';
import { useAdmin_BuyerManagementBuyerDetails } from '@/data/Content/Admin_BuyerManagementBuyerDetails';
import { useLocalization } from '@/data/Localization';
import { BUYER_MANAGEMENT } from '@/data/constants/admin_buyerManagement';
import { ContentContext } from '@/data/context/content';
import { Button, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const AdminBuyerManagementStepperActions: FC = () => {
	const localization = useLocalization('BuyerManagement');
	const { useBuyerManagementAddOrDetailsValue, actionTitle } = useContext(
		ContentContext
	) as unknown as {
		useBuyerManagementAddOrDetailsValue: ReturnType<
			typeof useAdmin_BuyerManagementAddBuyer & typeof useAdmin_BuyerManagementBuyerDetails
		>;
		actionTitle: string;
	};
	const { onCancel } = useBuyerManagementAddOrDetailsValue;
	return (
		<Stack {...adminBuyerManagementStepperActionsStack}>
			<Typography variant="h4" sx={adminBuyerManagementStepperTypographySX}>
				{actionTitle}
			</Typography>
			<Stack direction="row" spacing={2}>
				<Button
					id={`${BUYER_MANAGEMENT}-cancel`}
					data-testid={`${BUYER_MANAGEMENT}-cancel`}
					variant="outlined"
					color="secondary"
					onClick={onCancel}
				>
					{localization.Actions.Cancel.t()}
				</Button>
				<Button
					id={`${BUYER_MANAGEMENT}-finish-button`}
					data-testid={`${BUYER_MANAGEMENT}-finish-button`}
					variant="contained"
					type="submit"
				>
					{localization.Actions.Finish.t()}
				</Button>
			</Stack>
		</Stack>
	);
};
