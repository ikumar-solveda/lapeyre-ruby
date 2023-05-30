/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { AccountPersonal } from '@/components/content/Account/parts/Personal';
import { AccountRecentOrders } from '@/components/content/Account/parts/RecentOrders';
import { AccountTools } from '@/components/content/Account/parts/Tools';
import { useLogout } from '@/data/Content/Logout';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { useUser } from '@/data/User';
import { Stack, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

export const Account: FC<{ id: ID }> = () => {
	const WelcomeUser = useLocalization('WelcomeUserSection');
	const AccountLabels = useLocalization('PersonalInformation');
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const { user } = useUser();
	const { handleLogout, settings } = useLogout();
	return (
		<Stack spacing={contentSpacing}>
			<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
				<Typography variant="h3" component="h2">
					{WelcomeUser.Title.t()}
					{user?.firstName}
				</Typography>
				{settings?.csrSession ? null : (
					<Linkable href="/" type="button" variant="contained" onClick={handleLogout}>
						{AccountLabels.SignOutButton.t()}
					</Linkable>
				)}
			</Stack>
			<AccountPersonal />
			<AccountRecentOrders />
			<AccountTools />
		</Stack>
	);
};
