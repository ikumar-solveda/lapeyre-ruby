/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, ComponentPropsWithRef } from 'react';
import { TableHead as Head } from '@mui/material';
import { combineSX } from '@/utils/combineSX';
import { tableHeadSX } from '@/components/blocks/Table/styles/tableHead';

export const TableHead: FC<ComponentPropsWithRef<typeof Head>> = ({ sx, ...otherProps }) => (
	<Head {...otherProps} sx={combineSX([tableHeadSX, sx])} role={undefined} />
);
