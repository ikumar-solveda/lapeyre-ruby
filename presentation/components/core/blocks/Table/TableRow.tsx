/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, ComponentPropsWithRef } from 'react';
import { TableRow as Row } from '@mui/material';
import { combineSX } from '@/utils/combineSX';
import { tableRowSX } from '@/components/blocks/Table/styles/tableRow';
import { tableRowResponsiveSX } from '@/components/blocks/Table/styles/tableRowResponsive';

export const TableRow: FC<
	ComponentPropsWithRef<typeof Row> & {
		responsive?: boolean;
		expanded?: boolean;
		expandedContent?: boolean;
	}
> = ({ sx, responsive = false, expanded = false, expandedContent = false, ...otherProps }) => (
	<Row
		{...otherProps}
		sx={combineSX([
			...[tableRowSX, responsive && tableRowResponsiveSX({ expanded, expandedContent })],
			sx,
		])}
		role={undefined}
	/>
);
