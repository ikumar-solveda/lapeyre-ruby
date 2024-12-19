/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps } from '@mui/material';

export const quoteProductsTableProposedPriceCellInputSX = (dataLength: number): SxProps => ({
	minWidth: `${16 + (dataLength < 3 ? 0 : dataLength - 3)}ch`, // keep enough for 2-ch digits always
	maxWidth: `${18 + (dataLength < 3 ? 0 : dataLength - 3)}ch`,
	'& input': { p: 1 },
});
