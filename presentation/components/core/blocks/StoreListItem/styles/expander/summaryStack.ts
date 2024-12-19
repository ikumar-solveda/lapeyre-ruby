/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { StackProps } from '@mui/material';

export const storeListItemExpanderSummaryStack = (spaceContent: boolean): StackProps => ({
	sx: { width: '100%' },
	direction: { xs: spaceContent ? 'column' : 'row', md: 'row' },
	alignItems: { xs: spaceContent ? 'flex-start' : 'center', md: 'center' },
	justifyContent: spaceContent ? 'space-between' : 'flex-end',
});
