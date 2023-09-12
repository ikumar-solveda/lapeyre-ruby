/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AccountOrgAndContract } from '@/components/blocks/AccountOrgAndContract';
import { B2B } from '@/components/blocks/B2B';
import { Linkable } from '@/components/blocks/Linkable';
import { headerAccountItemSX } from '@/components/content/Header/styles/account/item';
import { headerAccountMenuSX } from '@/components/content/Header/styles/account/menu';
import { headerAccountOrgAndContractReadonlySX } from '@/components/content/Header/styles/account/orgAndContractReadonly';
import { useLogout } from '@/data/Content/Logout';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import { combineSX } from '@/utils/combineSX';
import { ExitToAppOutlined, ManageAccountsOutlined } from '@mui/icons-material';
import { Divider, Stack, Typography } from '@mui/material';
import { FC } from 'react';

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
				<B2B>
					<Stack
						divider={<Divider />}
						direction="row"
						alignItems="center"
						justifyContent="flex-start"
						spacing={1}
						sx={combineSX([headerAccountItemSX, headerAccountOrgAndContractReadonlySX])}
					>
						<AccountOrgAndContract />
					</Stack>
				</B2B>
				<Stack
					divider={<Divider />}
					direction="row"
					alignItems="center"
					justifyContent="flex-start"
					spacing={1}
					sx={headerAccountItemSX}
				>
					<ManageAccountsOutlined />
					<Linkable
						href={`/${RouteLocal.Account.route.t()}`}
						id={RouteLocal.Account.route.t()}
						data-testid={RouteLocal.Account.route.t()}
					>
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
