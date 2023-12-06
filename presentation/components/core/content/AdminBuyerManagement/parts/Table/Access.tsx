/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { adminBuyerManagementTableCircleIconSX } from '@/components/content/AdminBuyerManagement/styles/Table/circleIcon';
import { ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans } from '@/data/Content/Admin_BuyerManagement';
import { useLocalization } from '@/data/Localization';
import { ENABLED_STATUS } from '@/data/constants/admin_buyerManagement';
import { ContentContext } from '@/data/context/content';
import { Circle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

export const AdminBuyerManagementTableAccess: FC = () => {
	const { enabled, disabled, access } = useLocalization('BuyerManagement');
	const { buyer } = useContext(ContentContext) as {
		buyer: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans;
	};
	const status = useMemo(() => buyer.userRegistry?.status, [buyer]);

	return (
		<TableCellResponsiveContent label={<Typography variant="overline">{access.t()}</Typography>}>
			<Typography data-testid="buyer-management-access" id="buyer-management-access">
				<Circle
					sx={adminBuyerManagementTableCircleIconSX(status === ENABLED_STATUS ? true : false)}
				/>
				{status === ENABLED_STATUS ? enabled.t() : disabled.t()}
			</Typography>
		</TableCellResponsiveContent>
	);
};
