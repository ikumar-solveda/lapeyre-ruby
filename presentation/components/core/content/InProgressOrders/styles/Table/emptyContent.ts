/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { emptyContentDefaultSX } from '@/components/blocks/EmptyContent/styles/default';
import { SxProps } from '@mui/material';

export const inProgressOrdersTableEmptyContentSX: SxProps = {
	...emptyContentDefaultSX,
	borderStyle: 'none', // override borderStyle
};
