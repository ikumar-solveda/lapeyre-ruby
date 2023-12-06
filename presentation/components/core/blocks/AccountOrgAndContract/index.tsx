/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AccountOrgAndContractContractList } from '@/components/blocks/AccountOrgAndContract/parts/ContractList';
import { AccountOrgAndContractOrgList } from '@/components/blocks/AccountOrgAndContract/parts/OrgList';
import { AccountOrgAndContractWrap } from '@/components/blocks/AccountOrgAndContract/parts/Wrap';
import { accountOrgAndContractEditSX } from '@/components/blocks/AccountOrgAndContract/styles/edit';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import { Button, Grid, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, MouseEvent, useState } from 'react';

export const AccountOrgAndContract: FC<{ compact?: boolean }> = ({ compact = true }) => {
	const { user } = useUser();
	const labels = useLocalization('Header').AccountPopper;
	const [editing, setEditing] = useState<boolean>(false);
	const onEdit = (_event: MouseEvent<HTMLButtonElement>) => setEditing((prev) => !prev);
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down('md'));

	return compact || isSm ? (
		<AccountOrgAndContractWrap compact={compact}>
			<Grid
				container
				alignItems="flex-start"
				spacing={1}
				component="form"
				noValidate
				name="header-org-contract-form"
				id="header-org-contract-form"
				data-testid="header-org-contract-form"
			>
				<Grid item xs={12} sm={compact ? 12 : 5}>
					<AccountOrgAndContractOrgList
						{...{ user, label: labels.Organization.t(), compact, editing }}
					/>
				</Grid>

				<Grid item xs={12} sm={compact ? 12 : 5}>
					<AccountOrgAndContractContractList
						{...{ user, label: labels.Contract.t(), compact, editing }}
					/>
				</Grid>

				<Grid item xs={12} sm>
					<Stack alignItems={compact ? 'flex-start' : { xs: 'flex-start', sm: 'flex-end' }}>
						<Button
							data-testid="header-org-contract-edit"
							id="header-org-contract-edit"
							variant="outlined"
							size="small"
							sx={accountOrgAndContractEditSX}
							onClick={onEdit}
						>
							{editing ? labels.Done.t() : labels.Edit.t()}
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</AccountOrgAndContractWrap>
	) : null;
};
