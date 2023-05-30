/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React, { FC } from 'react';
import { useLocalization } from '@/data/Localization';
import { Sidebar } from '@/components/blocks/SideBar';
import { AccountSidebarContent } from '@/components/content/AccountSidebar/Content';
import { Breakpoint } from '@mui/material';
import { ID } from '@/data/types/Basic';
import { useAccountTools } from '@/utils/useAccountTools';

const mobileBreakpoint: Breakpoint = 'md';

export const AccountSidebar: FC<{ id: ID }> = () => {
	const localization = useLocalization('MyAccount');
	const routes = useLocalization('Routes');
	const title = localization.Title.t();
	const titleLink = routes.Account.route.t();
	const tools = useAccountTools();

	return (
		<Sidebar title={title} href={titleLink} mobileBreakpoint={mobileBreakpoint} scrollable={true}>
			<AccountSidebarContent tools={tools} />
		</Sidebar>
	);
};

export default AccountSidebar;
