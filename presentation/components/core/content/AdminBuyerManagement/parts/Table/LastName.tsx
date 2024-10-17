/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { AdminBuyerManagementContextValues } from '@/components/content/AdminBuyerManagement/parts/Table';
import { adminBuyerManagementTableCellTypography } from '@/components/content/AdminBuyerManagement/styles/Table/cellTypography';
import { ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans } from '@/data/Content/Admin_BuyerManagement';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { FC, useContext } from 'react';

export const AdminBuyerManagementTableLastName: FC = () => {
	const labels = useLocalization('BuyerManagement');
	const { buyer } = useContext(ContentContext) as AdminBuyerManagementContextValues & {
		buyer: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans;
	};
	const { lastName } = buyer as Required<typeof buyer>;
	return (
		<TableCellResponsiveContent
			label={labels.lastName.t()}
			sx={adminBuyerManagementTableCellTypography}
		>
			{lastName}
		</TableCellResponsiveContent>
	);
};
