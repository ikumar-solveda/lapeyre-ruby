/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const accordionSummarySX: SxProps = () => ({
	py: 2.5,
	'& .MuiAccordionSummary-expandIconWrapper': {
		transition: 'none',
		'&.Mui-expanded': {
			transform: 'none',
		},
	},
});
