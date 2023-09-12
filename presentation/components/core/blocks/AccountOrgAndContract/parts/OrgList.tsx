/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AccountOrgAndContractList } from '@/components/blocks/AccountOrgAndContract/parts/List';
import { accountOrgAndContractStaticSX } from '@/components/blocks/AccountOrgAndContract/styles/static';
import { useOrganization } from '@/data/Content/Organization';
import { getActiveOrganizationId } from '@/data/Settings';
import { User } from '@/data/User';
import { ListItemButton, ListItemText, Typography } from '@mui/material';
import { FC } from 'react';

export const AccountOrgAndContractOrgList: FC<{
	label: string;
	compact: boolean;
	editing: boolean;
	user: User | undefined;
}> = ({ label, compact, user, editing }) => {
	const { organizations, byId, onOrgSwitch } = useOrganization();
	const organizationId = getActiveOrganizationId(user?.context)?.organizationId ?? '';

	return (
		<AccountOrgAndContractList {...{ label, compact, editing }}>
			{editing ? (
				organizations?.map(({ organizationId: org, displayName }) => (
					<ListItemButton
						key={org}
						onClick={onOrgSwitch(`${org}`, compact)}
						selected={`${org}` === organizationId}
					>
						<ListItemText>
							<Typography>{displayName}</Typography>
						</ListItemText>
					</ListItemButton>
				))
			) : (
				<ListItemText sx={accountOrgAndContractStaticSX}>
					<Typography>{byId?.[organizationId]?.displayName}</Typography>
				</ListItemText>
			)}
		</AccountOrgAndContractList>
	);
};
