/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AccountOrgAndContractList } from '@/components/blocks/AccountOrgAndContract/parts/List';
import { accountOrgAndContractStaticSX } from '@/components/blocks/AccountOrgAndContract/styles/static';
import { useContract } from '@/data/Content/Contract';
import { getContractIdParamFromContext } from '@/data/Settings';
import { User } from '@/data/User';
import { ListItemButton, ListItemText, Typography } from '@mui/material';
import { FC } from 'react';

const EMPTY_CONTRACTS: Record<string, string> = {};
export const AccountOrgAndContractContractList: FC<{
	label: string;
	compact: boolean;
	editing: boolean;
	user: User | undefined;
}> = ({ label, compact, user, editing }) => {
	const { contracts = EMPTY_CONTRACTS, onContractSwitch } = useContract();
	const contractId = getContractIdParamFromContext(user?.context)?.contractId?.at(0) ?? '';

	return (
		<AccountOrgAndContractList {...{ label, compact, editing }}>
			{editing ? (
				Object.entries(contracts).map(([k, c]) => (
					<ListItemButton
						key={k}
						onClick={onContractSwitch(k, compact)}
						selected={k === contractId}
					>
						<ListItemText>
							<Typography>{c}</Typography>
						</ListItemText>
					</ListItemButton>
				))
			) : (
				<ListItemText sx={accountOrgAndContractStaticSX}>
					<Typography>{contracts[contractId]}</Typography>
				</ListItemText>
			)}
		</AccountOrgAndContractList>
	);
};
