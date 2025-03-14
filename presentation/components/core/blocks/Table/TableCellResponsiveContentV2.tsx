/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { tableCellResponsiveContentV2SX } from '@/components/blocks/Table/styles/tableCellResponsiveContentV2';
import { tableCellResponsiveContentV2MenuSX } from '@/components/blocks/Table/styles/tableCellResponsiveContentV2Menu';
import { combineSX } from '@/utils/combineSX';
import { Grid } from '@mui/material';
import type { ComponentProps, FC, ReactNode } from 'react';

export const TableCellResponsiveContentV2: FC<
	ComponentProps<typeof Grid> & { menu: ReactNode }
> = ({ menu, sx, children, ...props }) => (
	<Grid container sx={combineSX([tableCellResponsiveContentV2SX, sx])} {...props}>
		<Grid item xs md={12}>
			{children}
		</Grid>
		<Grid item xs md={6} sx={tableCellResponsiveContentV2MenuSX}>
			{menu}
		</Grid>
	</Grid>
);
