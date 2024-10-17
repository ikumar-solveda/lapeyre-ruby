/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const orderTableSectionAccordionSX: SxProps<Theme> = {
	border: `1px solid`,
	borderColor: `grey.300`,
	'& .MuiAccordionSummary-root': {
		bgcolor: 'grey.300',
		'.MuiAccordionSummary-expandIconWrapper': {
			'svg:first-of-type': {
				display: 'none',
			},
			'svg:last-of-type': {
				display: 'block',
			},
			'&.Mui-expanded': {
				'svg:first-of-type': {
					display: 'block',
				},
				'svg:last-of-type': {
					display: 'none',
				},
			},
		},
	},
	'& .MuiAccordionDetails-root': {
		padding: 0,
	},
};
