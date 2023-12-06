/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SxProps } from '@mui/material';
import { RefObject } from 'react';

export const adminOrganizationListItemDisplaySX = (
	anchorRef?: RefObject<HTMLDivElement>
): SxProps => ({
	maxWidth: anchorRef?.current ? `${anchorRef.current.clientWidth}px` : '100%',
	overflowX: 'hidden',
	textOverflow: 'ellipsis',
});
