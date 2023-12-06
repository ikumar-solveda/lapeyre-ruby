/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { adminBuyerManagementHeaderActionsStack } from '@/components/content/AdminBuyerManagement/styles/Header/actionsStack';
import { adminBuyerManagementHeaderAddButtonSX } from '@/components/content/AdminBuyerManagement/styles/Header/addButton';
import { useAdmin_BuyerManagement } from '@/data/Content/Admin_BuyerManagement';
import { useLocalization } from '@/data/Localization';
import { BUYER_MANAGEMENT } from '@/data/constants/admin_buyerManagement';
import { ContentContext } from '@/data/context/content';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Stack } from '@mui/material';
import { FC, useContext } from 'react';

export const AdminBuyerManagementHeaderActions: FC = () => {
	const localization = useLocalization('BuyerManagement');
	const addBuyerRoute = useLocalization('Routes').BuyerManagementCreate.route;
	const { buyerManagementValue } = useContext(ContentContext) as {
		buyerManagementValue: ReturnType<typeof useAdmin_BuyerManagement>;
	};
	const { onToggleOptions, showOptions } = buyerManagementValue;

	return (
		<Stack {...adminBuyerManagementHeaderActionsStack}>
			<Button
				id={`${BUYER_MANAGEMENT}-search-options`}
				data-testid={`${BUYER_MANAGEMENT}-search-options`}
				sx={adminBuyerManagementHeaderAddButtonSX}
				variant="outlined"
				onClick={onToggleOptions}
				endIcon={showOptions ? <RemoveIcon /> : <AddIcon />}
			>
				{localization.SearchOptions.t()}
			</Button>
			<Linkable
				type="button"
				id={`${BUYER_MANAGEMENT}-add-new`}
				data-testid={`${BUYER_MANAGEMENT}-add-new`}
				sx={adminBuyerManagementHeaderAddButtonSX}
				variant="contained"
				href={addBuyerRoute.t()}
			>
				{localization.Title.t()}
			</Linkable>
		</Stack>
	);
};
