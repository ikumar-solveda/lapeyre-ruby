/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { UploadLogsData } from '@/data/types/RequisitionLists';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const RequisitionListsUploadLogsTableStatus: FC<CellContext<UploadLogsData, string>> = ({
	getValue,
}) => {
	const { Status } = useLocalization('RequisitionLists');
	return (
		<TableCellResponsiveContent label={Status.t()}>
			<Typography>{getValue() ?? ''}</Typography>
		</TableCellResponsiveContent>
	);
};
