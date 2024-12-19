/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { ATTACHMENTS_TABLE } from '@/data/constants/quotes';
import { useLocalization } from '@/data/Localization';
import type { FileAttachment } from '@/data/types/Quote';
import { Checkbox } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuoteAttachmentsTableCheckboxCell: FC<CellContext<FileAttachment, unknown>> = ({
	row,
}) => {
	const localization = useLocalization('QuoteAttachmentsTable');

	return (
		<TableCellResponsiveContent label={localization.Select.t()}>
			<Checkbox
				id={`${ATTACHMENTS_TABLE}-select-item-${row.id}`}
				data-testid={`${ATTACHMENTS_TABLE}-select-item-${row.id}`}
				aria-label={localization.Select.t()}
				checked={row.getIsSelected()}
				onChange={row.getToggleSelectedHandler()}
			/>
		</TableCellResponsiveContent>
	);
};
