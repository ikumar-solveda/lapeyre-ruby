/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { StackProps } from '@mui/material';

export const storeListItemExpanderSummaryStack = (spaceContent: boolean): StackProps => ({
	sx: { width: '100%' },
	direction: 'row',
	alignItems: 'flex-end',
	justifyContent: spaceContent ? 'space-between' : 'flex-end',
});
