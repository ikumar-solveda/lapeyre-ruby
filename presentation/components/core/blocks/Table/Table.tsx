/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, ComponentPropsWithRef } from 'react';
import { Table as MUITable } from '@mui/material';
import { combineSX } from '@/utils/combineSX';
import { tableSX } from '@/components/blocks/Table/styles/table';

export const Table: FC<ComponentPropsWithRef<typeof MUITable>> = ({ sx, ...otherProps }) => (
	<MUITable {...otherProps} sx={combineSX([tableSX, sx])} />
);
