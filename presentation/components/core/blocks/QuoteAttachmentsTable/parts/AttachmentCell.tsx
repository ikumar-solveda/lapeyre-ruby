/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quoteAttachmentsTableAttachmentCellNameSX } from '@/components/blocks/QuoteAttachmentsTable/styles/attachmentCellName';
import { quoteAttachmentsTableAttachmentCellStack } from '@/components/blocks/QuoteAttachmentsTable/styles/attachmentCellStack';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { TypeIcon } from '@/components/blocks/TypeIcon';
import { useLocalization } from '@/data/Localization';
import type { FileAttachment } from '@/data/types/Quote';
import { getFileSize } from '@/utils/getFileSize';
import { Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { type FC } from 'react';

export const QuoteAttachmentsTableAttachmentCell: FC<CellContext<FileAttachment, unknown>> = ({
	row,
}) => {
	const localization = useLocalization('QuoteAttachmentsTable');
	return (
		<TableCellResponsiveContent label={localization.Attachment.t()}>
			<Stack {...quoteAttachmentsTableAttachmentCellStack}>
				<TypeIcon name={row.original.name as string} />
				<Stack sx={quoteAttachmentsTableAttachmentCellNameSX}>
					<Typography>{row.original.name}</Typography>
					<Typography>{getFileSize(row.original.size)}</Typography>
				</Stack>
			</Stack>
		</TableCellResponsiveContent>
	);
};
