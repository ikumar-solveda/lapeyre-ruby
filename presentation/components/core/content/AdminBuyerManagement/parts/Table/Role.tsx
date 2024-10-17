/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { AdminBuyerManagementContextValues } from '@/components/content/AdminBuyerManagement/parts/Table';
import { adminBuyerManagementTableRoleItemSX } from '@/components/content/AdminBuyerManagement/styles/Table/roleItem';
import { adminBuyerManagementTableRoleListSX } from '@/components/content/AdminBuyerManagement/styles/Table/roleList';
import { ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans } from '@/data/Content/Admin_BuyerManagement';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { List, ListItem } from '@mui/material';
import { Dictionary } from 'lodash';
import { FC, useContext, useMemo } from 'react';

const EMPTY_ORGS = {} as Dictionary<any>;

export const AdminBuyerManagementTableRole: FC = () => {
	const labels = useLocalization('BuyerManagement');
	const { buyerManagementValue, buyer } = useContext(
		ContentContext
	) as AdminBuyerManagementContextValues & {
		buyer: ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetailsUserDataBeans;
	};
	const { rolesDescriptions, organizations = EMPTY_ORGS } = buyerManagementValue;

	const roles = useMemo(
		() =>
			buyer.userRoles
				?.filter(({ orgId = '' }) => !!organizations[orgId])
				.map(({ roleId = '', orgId = '' }) => ({
					key: `${roleId}-${orgId}`,
					description: `${rolesDescriptions[roleId]?.displayName} - ${organizations[orgId]?.displayName}`,
				})),
		[buyer, rolesDescriptions, organizations]
	);
	return (
		<TableCellResponsiveContent label={labels.role.t()}>
			<List sx={adminBuyerManagementTableRoleListSX}>
				{roles?.map(({ key, description }) => (
					<ListItem
						key={key}
						sx={adminBuyerManagementTableRoleItemSX}
						id="buyer-management-role"
						data-testid="buyer-management-role"
					>
						{description}
					</ListItem>
				))}
			</List>
		</TableCellResponsiveContent>
	);
};
