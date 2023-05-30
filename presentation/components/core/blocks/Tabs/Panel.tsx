/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { panelSX } from '@/components/blocks/Tabs/styles/panel';
import { Box } from '@mui/material';
import { FC } from 'react';

type Props = {
	children: JSX.Element | JSX.Element[];
	name: string;
	[key: string]: any;
};

export const TabPanel: FC<Props> = ({ children, name, index, ...props }) => (
	<Box
		role="tabpanel"
		data-testid={`${name}-tabpanel-${index}`}
		id={`${name}-tabpanel-${index}`}
		aria-labelledby={`${name}-tab-${index}`}
		sx={panelSX}
		{...props}
	>
		{children}
	</Box>
);
