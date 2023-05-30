/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const compareProductsTableInnerBorderSX: SxProps = {
	textAlign: 'left',
	fontSize: '14px',
	height: '100%',
	borderCollapse: 'collapse',

	tr: {
		':last-child': {
			td: {
				borderBottom: 0,
			},
		},
	},
	'td, th': {
		borderBottom: `1px solid lightGray`,
		borderRight: '1px solid gray',

		':last-child': {
			borderRight: 0,
		},
	},
};
