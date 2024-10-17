/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { tableCellResponsiveContentSX } from '@/components/blocks/Table/styles/tableCellResponsiveContent';
import { tableCellResponsiveContentLabelSX } from '@/components/blocks/Table/styles/tableCellResponsiveContentLabel';
import { combineSX } from '@/utils/combineSX';
import { Grid } from '@mui/material';
import { ComponentProps, FC, ReactNode } from 'react';

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
		<Grid item xs md={12}>
			{children}
		</Grid>
	</Grid>
);
