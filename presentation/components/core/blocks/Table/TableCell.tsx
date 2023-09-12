/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, ComponentPropsWithRef } from 'react';
import { TableCell as Cell } from '@mui/material';
import { combineSX } from '@/utils/combineSX';
import { tableCellSX } from '@/components/blocks/Table/styles/tableCell';
import { tableCellResponsiveSX } from '@/components/blocks/Table/styles/tableCellResponsive';

export const TableCell: FC<ComponentPropsWithRef<typeof Cell> & { responsive?: boolean }> = ({
	sx,
	responsive = false,
	...otherProps
}) => (
	<Cell
		{...otherProps}
		sx={combineSX([...[tableCellSX, responsive && tableCellResponsiveSX], sx])}
		role={undefined}
	/>
);
