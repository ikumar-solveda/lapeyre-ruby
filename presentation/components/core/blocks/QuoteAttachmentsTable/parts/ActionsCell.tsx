/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quoteAttachmentsTableActionsCellStack } from '@/components/blocks/QuoteAttachmentsTable/styles/actionsCellStack';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import type { useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { FileAttachment } from '@/data/types/Quote';
import { Delete } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useContext, type FC } from 'react';

export const QuoteAttachmentsTableActionsCell: FC<CellContext<FileAttachment, unknown>> = ({
	row,
}) => {
	const localization = useLocalization('QuoteAttachmentsTable');
	const { deleteAttachment } = useContext(ContentContext) as ReturnType<typeof useQuoteCreateEdit>;

	return (
		<TableCellResponsiveContent label={localization.Actions.t()}>
			<Stack {...quoteAttachmentsTableActionsCellStack}>
				<IconButton
					id={`delete-attachment-${row.original.id}`}
					data-testid={`delete-attachment-${row.original.id}`}
					onClick={deleteAttachment(row.original.id as number)}
					color="primary"
					title={localization.delete.t({ fileName: row.original.name ?? '' })}
				>
					<Delete />
				</IconButton>
			</Stack>
		</TableCellResponsiveContent>
	);
};
