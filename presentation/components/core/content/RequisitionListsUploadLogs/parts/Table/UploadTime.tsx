/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { DATE_TIME_FORMAT_OPTION } from '@/data/constants/dateTime';
import { UploadLogsData } from '@/data/types/RequisitionLists';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const RequisitionListsUploadLogsTableUploadTime: FC<CellContext<UploadLogsData, string>> = ({
	getValue,
}) => {
	const { UploadTime } = useLocalization('RequisitionLists');
	const dateFormatter = useDateTimeFormat(DATE_TIME_FORMAT_OPTION);
	return (
		<TableCellResponsiveContent label={UploadTime.t()}>
			<Typography>{dateFormatter.format(new Date(getValue() as string))}</Typography>
		</TableCellResponsiveContent>
	);
};
