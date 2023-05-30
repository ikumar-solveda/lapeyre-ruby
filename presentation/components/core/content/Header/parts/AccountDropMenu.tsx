/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import { Linkable } from '@/components/blocks/Linkable';
import { Stack, Divider, Typography } from '@mui/material';
import { ExitToAppOutlined, ManageAccountsOutlined } from '@mui/icons-material';
import { headerAccountItemSX } from '@/components/content/Header/styles/account/item';
import { headerAccountMenuSX } from '@/components/content/Header/styles/account/menu';
import { useLogout } from '@/data/Content/Logout';

export const HeaderAccountDropMenu: FC = () => {
	const AccountLabels = useLocalization('Header');
	const RouteLocal = useLocalization('Routes');
	const { handleLogout, settings } = useLogout();
	const { user } = useUser();

	return (
		<Stack spacing={1} divider={<Divider />}>
			<Stack divider={<Divider />} sx={headerAccountMenuSX}>
				<Typography variant="h6" align="center" sx={headerAccountItemSX}>
					{AccountLabels.AccountPopper.Welcome.t({
						firstName: user?.firstName ?? '',
						lastName: user?.lastName ?? '',
					})}
				</Typography>
				<Stack
					divider={<Divider />}
					direction="row"
					alignItems="center"
					justifyContent="flex-start"
					spacing={1}
					sx={headerAccountItemSX}
				>
					<ManageAccountsOutlined />
					<Linkable href={`/${RouteLocal.Account.route.t()}`}>
						<Typography variant="body2">
							{AccountLabels.AccountPopper.AccountSetting.t()}
						</Typography>
					</Linkable>
				</Stack>
				{settings?.csrSession ? null : (
					<Stack
						divider={<Divider />}
						direction="row"
						alignItems="center"
						justifyContent="flex-start"
						spacing={1}
						sx={headerAccountItemSX}
					>
						<ExitToAppOutlined />
						<Linkable href="/" onClick={handleLogout}>
							<Typography variant="body2">{AccountLabels.AccountPopper.SignOut.t()}</Typography>
						</Linkable>
					</Stack>
				)}
			</Stack>
		</Stack>
	);
};
