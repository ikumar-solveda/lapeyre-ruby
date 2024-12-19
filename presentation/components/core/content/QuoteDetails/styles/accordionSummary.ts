/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps } from '@mui/material';

export const quoteDetailsAccordionSummarySX: SxProps = {
	p: 2,
	'& .MuiAccordionSummary-expandIconWrapper': {
		transition: 'none',
		'&.Mui-expanded': {
			transform: 'none',
		},
	},
};
