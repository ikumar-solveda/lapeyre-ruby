/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalization } from '@/data/Localization';
import {
	History,
	LibraryBooks,
	List as ListIcon,
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
	const routes = useLocalization('Routes');
	const tools = useMemo<AccountTools>(
		() => [
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
					{
						title: AccountLabels.WishListText.t(),
						description: AccountLabels.WishListDescription.t(),
						href: routes.WishLists.route.t(),
						icon: <ListIcon />,
					},
				],
			},
		],
		[AccountLabels, routes]
	);

	return tools;
};
