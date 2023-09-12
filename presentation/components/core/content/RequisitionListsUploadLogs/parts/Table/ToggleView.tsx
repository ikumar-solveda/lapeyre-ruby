/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { requisitionListDetailsTableToggleAttributesIconSX } from '@/components/content/RequisitionListDetails/styles/Table/toggleAttributesIcon';
import { useLocalization } from '@/data/Localization';
import { UPLOAD_LOGS_VIEW_TABLE } from '@/data/constants/requisitionLists';
import { UploadLogsData } from '@/data/types/RequisitionLists';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const RequisitionListsUploadLogsTableToggleView: FC<
	CellContext<UploadLogsData, unknown>
> = ({ row }) => {
	const { ViewLog } = useLocalization('RequisitionLists');
	const open = row.getIsExpanded();

	return (
		<TableCellResponsiveContent label={ViewLog.t()}>
			<IconButton
				id={`${UPLOAD_LOGS_VIEW_TABLE}-${row.id}-quantity`}
				data-testid={`${UPLOAD_LOGS_VIEW_TABLE}-${row.id}-quantity`}
				aria-expanded={row.getIsExpanded()}
				aria-label="row"
				size="medium"
				color="primary"
				onClick={row.getToggleExpandedHandler()}
			>
				<Typography>{ViewLog.t()}</Typography>
				<KeyboardArrowRightIcon sx={requisitionListDetailsTableToggleAttributesIconSX(open)} />
			</IconButton>
		</TableCellResponsiveContent>
	);
};
