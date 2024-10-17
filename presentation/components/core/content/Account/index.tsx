/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AccountOrgAndContract } from '@/components/blocks/AccountOrgAndContract';
import { B2B } from '@/components/blocks/B2B';
import { Linkable } from '@/components/blocks/Linkable';
import { AccountPersonal } from '@/components/content/Account/parts/Personal';
import { AccountRecentOrders } from '@/components/content/Account/parts/RecentOrders';
import { AccountTools } from '@/components/content/Account/parts/Tools';
import { accountStack } from '@/components/content/Account/styles/stack';
import { useLogout } from '@/data/Content/Logout';
import { usePersonInfo } from '@/data/Content/PersonInfo';
import { useLocalization } from '@/data/Localization';
import { ID } from '@/data/types/Basic';
import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';

export const Account: FC<{ id: ID }> = () => {
	const WelcomeUser = useLocalization('WelcomeUserSection');
	const AccountLabels = useLocalization('PersonalInformation');
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const { personInfo } = usePersonInfo();
	const { handleLogout, settings } = useLogout();
	return (
		<Stack spacing={contentSpacing}>
			<Stack {...accountStack}>
				<Typography variant="h4" component="h2">
					{WelcomeUser.Title.t()}
					{personInfo?.firstName}
				</Typography>
				{settings?.csrSession ? null : (
					<Linkable
						href="/"
						type="button"
						variant="contained"
						onClick={handleLogout}
						data-testid="button-sign-out-personal-info"
						id="button-sign-out-personal-info"
					>
						{AccountLabels.SignOutButton.t()}
					</Linkable>
				)}
			</Stack>
			<B2B>
				<AccountOrgAndContract compact={false} />
			</B2B>
			<AccountPersonal />
			<AccountRecentOrders />
			<AccountTools />
		</Stack>
	);
};
