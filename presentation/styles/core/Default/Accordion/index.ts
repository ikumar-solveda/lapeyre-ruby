/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getStyleOverrides } from '@/utils/getStyleOverrides';
import { ThemeOptions } from '@mui/material';

export const Accordion: ThemeOptions = {
	components: {
		MuiAccordion: {
			styleOverrides: {
				root: getStyleOverrides({
					styles: {
						'&.MuiAccordion-root.Mui-expanded': {
							margin: 0,
							'&:before': {
								opacity: 1,
							},
						},
					},
				}),
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: getStyleOverrides({
					styles: {
						minHeight: 'initial',
						'&.Mui-expanded': {
							minHeight: 'initial',
						},
						'.MuiAccordionSummary-expandIconWrapper': {
							py: 1.5,
							px: 0,
						},
						'.MuiAccordionSummary-content': {
							margin: 0,
							'&.Mui-expanded': {
								minHeight: 'initial',
								margin: 0,
							},
						},
					},
				}),
			},
		},
	},
};
