/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { AdminBuyerManagementContextValues } from '@/components/content/AdminBuyerManagement/parts/Table';
import { adminBuyerManagementTableActionButtonSX } from '@/components/content/AdminBuyerManagement/styles/Table/actionButton';
import { ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans } from '@/data/Content/Admin_BuyerManagement';
import { useLocalization } from '@/data/Localization';
import { ENABLED_STATUS } from '@/data/constants/admin_buyerManagement';
import { ContentContext } from '@/data/context/content';
import { Cancel, CheckCircle, LockReset } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { FC, useCallback, useContext, useMemo } from 'react';

export const AdminBuyerManagementTableActions: FC = () => {
	const labels = useLocalization('BuyerManagement');
	const { buyer, buyerManagementValue } = useContext(
		ContentContext
	) as AdminBuyerManagementContextValues & {
		buyer: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans;
	};
	const { updateUserAccountStatus, onResetPassword } = buyerManagementValue;
	const { userId, logonId } = buyer;
	const onMenuClick = useCallback(
		(enable = true) =>
			(_event: React.MouseEvent<HTMLElement>) =>
				updateUserAccountStatus(userId as string, enable, logonId as string),
		[userId, logonId, updateUserAccountStatus]
	);

	const enabled = useMemo(() => buyer.userRegistry?.status === ENABLED_STATUS, [buyer]);

	return (
		<TableCellResponsiveContent label={labels.actions.t()}>
			<Stack direction="row" columnGap={1} alignItems="flex-start">
				<Tooltip title={labels.enableUser.t()}>
					<Box component="span">
						<IconButton
							data-testid="buyer-management-enable"
							id="buyer-management-enable"
							sx={adminBuyerManagementTableActionButtonSX}
							color="primary"
							disabled={enabled}
							onClick={onMenuClick()}
						>
							<CheckCircle />
						</IconButton>
					</Box>
				</Tooltip>
				<Tooltip title={labels.disableUser.t()}>
					<Box component="span">
						<IconButton
							data-testid="buyer-management-disable"
							id="buyer-management-disable"
							sx={adminBuyerManagementTableActionButtonSX}
							color="primary"
							disabled={!enabled}
							onClick={onMenuClick(false)}
						>
							<Cancel />
						</IconButton>
					</Box>
				</Tooltip>
				<Tooltip title={labels.resetPassword.t()}>
					<Box component="span">
						<IconButton
							data-testid="buyer-management-reset-password"
							id="buyer-management-reset-password"
							sx={adminBuyerManagementTableActionButtonSX}
							color="primary"
							onClick={onResetPassword(logonId as string)}
						>
							<LockReset />
						</IconButton>
					</Box>
				</Tooltip>
			</Stack>
		</TableCellResponsiveContent>
	);
};
