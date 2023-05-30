/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const storeLocatorInfoBoxSX = (isExpanded: boolean): SxProps => ({
	marginTop: '-4px',
	display: isExpanded ? 'none' : 'block',
});
