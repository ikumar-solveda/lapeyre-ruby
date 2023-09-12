/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, ComponentPropsWithRef } from 'react';
import { TableHead as Head } from '@mui/material';
import { combineSX } from '@/utils/combineSX';
import { tableHeadSX } from '@/components/blocks/Table/styles/tableHead';
import { tableHeadResponsiveSX } from '@/components/blocks/Table/styles/tableHeadResponsive';

export const TableHead: FC<ComponentPropsWithRef<typeof Head> & { responsive?: boolean }> = ({
	sx,
	responsive = false,
	...otherProps
}) => (
	<Head
		{...otherProps}
		sx={combineSX([...[tableHeadSX, responsive && tableHeadResponsiveSX], sx])}
		role={undefined}
	/>
);
