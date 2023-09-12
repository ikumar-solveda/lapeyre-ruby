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

export const RequisitionListsUploadLogsTableUploadedFile: FC<
	CellContext<UploadLogsData, string>
> = ({ getValue }) => {
	const { UploadedFile } = useLocalization('RequisitionLists');
	return (
		<TableCellResponsiveContent label={UploadedFile.t()}>
			<Typography>{getValue() ?? ''}</Typography>
		</TableCellResponsiveContent>
	);
};
