/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { headerMiniCartItemSX } from '@/components/content/Header/styles/miniCart/item';
import { StackProps } from '@mui/material';

export const headerMiniCartItemStack: StackProps = {
	direction: 'row',
	spacing: 1,
	justifyContent: 'center',
	alignItems: 'center',
	sx: headerMiniCartItemSX,
};
