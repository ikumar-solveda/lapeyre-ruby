/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { requisitionListsUploadLogsTableFailedSkuTableSX } from '@/components/content/RequisitionListsUploadLogs/styles/Table/failedSkuTable';
import { requisitionListsUploadLogsTableFailedSkuTableBodyLineNumberSX } from '@/components/content/RequisitionListsUploadLogs/styles/Table/failedSkuTableBodyLineNumber';
import { requisitionListsUploadLogsTableFailedSkuTableBodySkuSX } from '@/components/content/RequisitionListsUploadLogs/styles/Table/failedSkuTableBodySku';
import { requisitionListsUploadLogsTableFailedSkuTableHeadLineNumberSX } from '@/components/content/RequisitionListsUploadLogs/styles/Table/failedSkuTableHeadLineNumber';
import { requisitionListsUploadLogsTableFailedSkuTableHeadSkuSX } from '@/components/content/RequisitionListsUploadLogs/styles/Table/failedSkuTableHeadSku';
import { useLocalization } from '@/data/Localization';
import {
	REQUISITION_LIST_DETAILS_TABLE,
	UPLOAD_LOGS_VIEW_TABLE,
} from '@/data/constants/requisitionLists';
import { FailedSku } from '@/data/types/RequisitionLists';
import { Paper } from '@mui/material';
import { FC } from 'react';

export const RequisitionListsUploadLogsTableFailedSkuTable: FC<{ data: FailedSku[] }> = ({
	data,
}) => {
	const requisitionListsNLS = useLocalization('RequisitionLists');
	return (
		<Paper>
			<Table sx={requisitionListsUploadLogsTableFailedSkuTableSX}>
				<TableHead>
					<TableRow
						key="headerRow"
						id={`${UPLOAD_LOGS_VIEW_TABLE}-header-row`}
						data-testid={`${UPLOAD_LOGS_VIEW_TABLE}-header-row`}
					>
						<TableCell
							key="lineNumber"
							sx={requisitionListsUploadLogsTableFailedSkuTableHeadLineNumberSX}
						>
							{requisitionListsNLS.LineNumber.t()}
						</TableCell>
						<TableCell key="sku" sx={requisitionListsUploadLogsTableFailedSkuTableHeadSkuSX}>
							{requisitionListsNLS.SKU.t()}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((element: FailedSku, index) => (
						<TableRow
							key="createdBy"
							id={`${REQUISITION_LIST_DETAILS_TABLE}-${index}`}
							data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-${index}`}
						>
							<TableCell
								key={`lineNumber-${index}`}
								sx={requisitionListsUploadLogsTableFailedSkuTableBodyLineNumberSX}
							>
								{element.lineNumber}
							</TableCell>
							<TableCell
								key={`sku-${index}`}
								sx={requisitionListsUploadLogsTableFailedSkuTableBodySkuSX}
							>
								{element.sku}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
};
