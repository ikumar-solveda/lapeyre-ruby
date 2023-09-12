/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { ListCreator, RequisitionListsItem } from '@/data/types/RequisitionLists';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
export const RequisitionListsTableCreatedByCell = (
	info: CellContext<RequisitionListsItem, ListCreator | undefined>
) => {
	const { getValue, column } = info;
	const localization = useLocalization('RequisitionLists');
	return (
		<TableCellResponsiveContent
			label={<Typography variant="overline">{column.columnDef.header as string}</Typography>}
		>
			<Typography>
				{localization.CreatedBy.t({
					firstName: getValue()?.firstName || '',
					lastName: getValue()?.lastName || '',
				})}
			</Typography>
		</TableCellResponsiveContent>
	);
};
