/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Paper } from '@mui/material';
import { FC } from 'react';

export const AccountOrgAndContractWrap: FC<{
	compact: boolean;
	children: JSX.Element | JSX.Element[];
}> = ({ compact, children }) =>
	compact ? <>{children}</> : <Paper sx={{ p: 2 }}>{children}</Paper>;
