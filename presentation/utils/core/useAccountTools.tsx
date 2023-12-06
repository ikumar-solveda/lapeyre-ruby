/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import { isB2BStore, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import {
	History,
	LibraryBooks,
	List as ListIcon,
	PeopleAlt as OrganizationIcon,
	PersonAdd,
	Repeat as RepeatIcon,
	ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useMemo } from 'react';

export type AccountTool = {
	title: string;
	description: string;
	href: string;
	icon: JSX.Element;
};

type ToolSection = {
	title: string;
	tools: AccountTool[];
};

export type AccountTools = ToolSection[];

export const useAccountTools = () => {
	const AccountLabels = useLocalization('AccountLinksGridView');
	const AdminToolsLabels = useLocalization('BuyerOrganizationAdminTools');
	const routes = useLocalization('Routes');
	const { settings } = useSettings();
	const { user: { buyerAdmin = false, buyerApprover = false } = {} } = useUser();

	const approvalLabels = useMemo(
		() => ({
			title: buyerAdmin
				? AdminToolsLabels.BuyerOrderApproval.t()
				: AdminToolsLabels.OrderApproval.t(),
			description: buyerAdmin
				? AdminToolsLabels.BuyerOrderApprovalDesc.t()
				: AdminToolsLabels.OrderApprovalDesc.t(),
		}),
		[AdminToolsLabels, buyerAdmin]
	);

	const tools = useMemo<AccountTools>(
		() =>
			[
				{
					title: AccountLabels.Title.t(),
					tools: [
						{
							title: AccountLabels.AddressBookText.t(),
							description: AccountLabels.AddressBookDescription.t(),
							href: routes.AddressBook.route.t(),
							icon: <LibraryBooks />,
						},
						{
							title: AccountLabels.OrderHistoryText.t(),
							description: AccountLabels.OrderHistoryDescription.t(),
							href: routes.OrderHistory.route.t(),
							icon: <History />,
						},
						{
							title: AccountLabels.CheckoutProfilesText.t(),
							description: AccountLabels.CheckoutProfilesDescription.t(),
							href: routes.CheckoutProfiles.route.t(),
							icon: <ShoppingCartIcon />,
						},
						!isB2BStore(settings) && {
							title: AccountLabels.WishListText.t(),
							description: AccountLabels.WishListDescription.t(),
							href: routes.WishLists.route.t(),
							icon: <ListIcon />,
						},
						isB2BStore(settings) && {
							title: AccountLabels.RequisitionListsText.t(),
							description: AccountLabels.RequisitionListsDescription.t(),
							href: routes.RequisitionLists.route.t(),
							icon: <ListIcon />,
						},
						isB2BStore(settings) && {
							title: AccountLabels.RecurringOrdersText.t(),
							description: AccountLabels.RecurringOrdersDescription.t(),
							href: routes.RecurringOrders.route.t(),
							icon: <RepeatIcon />,
						},
					].filter(Boolean) as AccountTool[],
				},
				isB2BStore(settings) &&
					(buyerAdmin || buyerApprover) && {
						title: AdminToolsLabels.AdminTools.t(),
						tools: [
							buyerAdmin && {
								title: AdminToolsLabels.OrgManagement.t(),
								description: AdminToolsLabels.OrgManagementDesc.t(),
								href: routes.OrganizationManagement.route.t(),
								icon: <OrganizationIcon />,
							},
							buyerAdmin && {
								title: AdminToolsLabels.BuyerManagement.t(),
								description: AdminToolsLabels.BuyerManagementDesc.t(),
								href: routes.BuyerManagement.route.t(),
								icon: <OrganizationIcon />,
							},
							{
								title: approvalLabels.title,
								description: approvalLabels.description,
								href: routes.ApprovalsManagement.route.t(),
								icon: <PersonAdd />,
							},
						].filter(Boolean) as AccountTool[],
					},
			].filter(Boolean) as AccountTools,
		[AccountLabels, routes, settings, buyerAdmin, buyerApprover, AdminToolsLabels, approvalLabels]
	);

	return tools;
};
