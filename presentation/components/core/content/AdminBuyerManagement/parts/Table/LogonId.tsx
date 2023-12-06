/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { adminBuyerManagementTableCellTypography } from '@/components/content/AdminBuyerManagement/styles/Table/cellTypography';
import { ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans } from '@/data/Content/Admin_BuyerManagement';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const AdminBuyerManagementTableLogonId: FC = () => {
	const detailsRoute = useLocalization('Routes').BuyerManagementEdit.route;
	const labels = useLocalization('BuyerManagement');
	const { buyer } = useContext(ContentContext) as {
		buyer: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans;
	};
	const { userId } = buyer as Required<typeof buyer>;
	return (
		<TableCellResponsiveContent
			label={<Typography variant="overline">{labels.logonId.t()}</Typography>}
		>
			<Linkable
				href={{ pathname: detailsRoute.t(), query: { buyerId: userId } }}
				data-testid="buyer-management-buyerName"
				id="buyer-management-buyerName"
				sx={adminBuyerManagementTableCellTypography}
			>
				{buyer.logonId}
			</Linkable>
		</TableCellResponsiveContent>
	);
};
