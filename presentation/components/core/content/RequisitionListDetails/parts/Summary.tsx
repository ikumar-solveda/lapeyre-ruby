/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { requisitionListDetailsSummarySX } from '@/components/content/RequisitionListDetails/styles/summary';
import { requisitionListDetailsSummaryNameSX } from '@/components/content/RequisitionListDetails/styles/summaryName';
import { requisitionListDetailsSummaryValueSX } from '@/components/content/RequisitionListDetails/styles/summaryValue';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { REQUISITION_LIST_DETAILS_TABLE } from '@/data/constants/requisitionLists';
import { FC } from 'react';

type SummaryProps = {
	x_firstName?: string;
	x_lastName?: string;
	lastUpdateDate?: string;
	orderStatus?: string;
};

export const RequisitionListDetailsSummary: FC<SummaryProps> = ({
	x_firstName: firstName = '',
	x_lastName: lastName = '',
	lastUpdateDate,
	orderStatus,
}) => {
	const dateFormatter = useDateTimeFormat();
	const requisitionListsNLS = useLocalization('RequisitionLists');
	return (
		<Table sx={requisitionListDetailsSummarySX}>
			<TableBody>
				<TableRow
					key="createdBy"
					id={`${REQUISITION_LIST_DETAILS_TABLE}-summary-created-by`}
					data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-summary-created-by`}
				>
					<TableCell key="name" sx={requisitionListDetailsSummaryNameSX}>
						{requisitionListsNLS.Columns.CreatedBy.t()}
					</TableCell>
					<TableCell key="value" sx={requisitionListDetailsSummaryValueSX}>
						{requisitionListsNLS.CreatedBy.t({ firstName, lastName })}
					</TableCell>
				</TableRow>
				<TableRow
					key="lastUpdated"
					id={`${REQUISITION_LIST_DETAILS_TABLE}-summary-last-updated`}
					data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-summary-last-updated`}
				>
					<TableCell key="name" sx={requisitionListDetailsSummaryNameSX}>
						{requisitionListsNLS.Columns.LastUpdate.t()}
					</TableCell>
					<TableCell key="value" sx={requisitionListDetailsSummaryValueSX}>
						{lastUpdateDate ? dateFormatter.format(new Date(lastUpdateDate)) : ''}
					</TableCell>
				</TableRow>
				<TableRow
					key="visibility"
					id={`${REQUISITION_LIST_DETAILS_TABLE}-summary-type`}
					data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-summary-type`}
				>
					<TableCell key="name" sx={requisitionListDetailsSummaryNameSX}>
						{'Visibility'}
					</TableCell>
					<TableCell key="value" sx={requisitionListDetailsSummaryValueSX}>
						{orderStatus
							? requisitionListsNLS.Type[orderStatus as keyof typeof requisitionListsNLS.Type].t()
							: null}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};
