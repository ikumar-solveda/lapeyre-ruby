/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { requisitionListsCreateListDetailsSX } from '@/components/content/RequisitionLists/styles/createListDetails';
import { RequisitionListsUploadLogsTableFailedSkuTable } from '@/components/content/RequisitionListsUploadLogs/parts/Table/FailedSkuTable';
import { useRequisitionListsViewUploadDetails } from '@/data/Content/RequisitionListsViewUploadDetails';
import { useLocalization } from '@/data/Localization';
import { UPLOAD_LOG_STATUS } from '@/data/constants/requisitionLists';
import {
	FailedSku,
	ProcessInfo,
	UploadLogProcessFile,
	UploadLogsData,
} from '@/data/types/RequisitionLists';
import { dAdd, dMul } from '@/utils/floatingPoint';
import { Paper, Stack, Typography } from '@mui/material';
import { Row } from '@tanstack/react-table';
import { FC, useMemo } from 'react';

export const RequisitionListsUploadLogsTableDetailPanel: FC<{ row: Row<UploadLogsData> }> = ({
	row,
}) => {
	const { fileUploadJobId } = row?.original;
	const { data } = useRequisitionListsViewUploadDetails(fileUploadJobId ?? '');
	const { UpdNofM, PartialCompleteStatusTop, FailedStatusBottom, PartialCompleteStatusBottom } =
		useLocalization('RequisitionLists');

	const processInfoInit: ProcessInfo = {
		FileName: '',
		ProcessedItemsNumber: 0,
		FailedPartNumbers: [],
		RequisitionListId: -1,
	};
	const processLogInfo: UploadLogProcessFile =
		data?.resultList?.at(0) || ({} as UploadLogProcessFile);
	const logInfo = processLogInfo?.processFile?.at(0);
	const info = logInfo?.processInfo;
	const processLogFile: ProcessInfo = info ? JSON.parse(info) : processInfoInit;
	const total = processLogFile?.ProcessedItemsNumber + processLogFile?.FailedPartNumbers.length;
	const success = dAdd(total, dMul(-1, processLogFile?.FailedPartNumbers.length));
	const status = logInfo?.status;
	const { FailedPartNumbers } = processLogFile;

	const tableData: FailedSku[] = useMemo(
		() =>
			FailedPartNumbers.map((sku) => {
				const pair = sku.split(',');
				return {
					lineNumber: pair[0],
					sku: pair[1],
				};
			}),
		[FailedPartNumbers]
	);

	return info ? (
		<Paper>
			<Stack spacing={2}>
				<Typography sx={requisitionListsCreateListDetailsSX}>
					{UpdNofM.t({ n: success, m: total })}
				</Typography>
				<Typography>{PartialCompleteStatusTop.t()}</Typography>

				{status !== UPLOAD_LOG_STATUS.Complete ? (
					status === UPLOAD_LOG_STATUS.Failed ? (
						<Typography>{FailedStatusBottom.t()}</Typography>
					) : (
						<Typography>{PartialCompleteStatusBottom.t()}</Typography>
					)
				) : null}

				{status !== UPLOAD_LOG_STATUS.Complete ? (
					<RequisitionListsUploadLogsTableFailedSkuTable data={...tableData} />
				) : null}
			</Stack>
		</Paper>
	) : null;
};
