/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { accountOrgAndContractCollapseListSX } from '@/components/blocks/AccountOrgAndContract/styles/collapseList';
import { accountOrgAndContractExpandSX } from '@/components/blocks/AccountOrgAndContract/styles/expand';
import { ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Typography, Collapse } from '@mui/material';
import { FC, MouseEvent, useEffect, useState } from 'react';

export const AccountOrgAndContractList: FC<{
	label: string;
	children: JSX.Element | JSX.Element[] | undefined;
	compact: boolean;
	editing: boolean;
}> = ({ label, children, compact, editing }) => {
	const [open, setOpen] = useState<boolean>(true);
	const toggleOpen = (_event: MouseEvent) => setOpen((prev) => !prev);
	useEffect(() => {
		if (!editing) {
			setOpen(true);
		} else if (compact) {
			setOpen(false);
		}
	}, [editing]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<List dense={true} disablePadding>
			<ListItemButton onClick={editing ? toggleOpen : undefined}>
				<ListItemText>
					<Typography variant={compact ? 'body2' : 'h5'}>{label}</Typography>
				</ListItemText>
				{editing ? <ExpandMore sx={accountOrgAndContractExpandSX(open)} /> : null}
			</ListItemButton>
			<Collapse in={open} unmountOnExit>
				<List disablePadding dense={true} sx={accountOrgAndContractCollapseListSX}>
					{children}
				</List>
			</Collapse>
		</List>
	);
};
