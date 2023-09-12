/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ComponentProps, FC, ReactNode } from 'react';
import { Grid } from '@mui/material';
import { tableCellResponsiveContentLabelSX } from '@/components/blocks/Table/styles/tableCellResponsiveContentLabel';
import { tableCellResponsiveContentSX } from '@/components/blocks/Table/styles/tableCellResponsiveContent';
import { combineSX } from '@/utils/combineSX';

export const TableCellResponsiveContent: FC<ComponentProps<typeof Grid> & { label: ReactNode }> = ({
	label,
	sx,
	children,
	...props
}) => (
	<Grid container sx={combineSX([tableCellResponsiveContentSX, sx])} {...props}>
		<Grid item xs={6} sx={tableCellResponsiveContentLabelSX}>
			{label}
		</Grid>
		<Grid item xs={6} md={12}>
			{children}
		</Grid>
	</Grid>
);
