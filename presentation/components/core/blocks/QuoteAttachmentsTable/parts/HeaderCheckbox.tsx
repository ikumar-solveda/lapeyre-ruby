/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ATTACHMENTS_TABLE } from '@/data/constants/quotes';
import type { FileAttachment } from '@/data/types/Quote';
import { Checkbox } from '@mui/material';
import type { HeaderContext } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuoteAttachmentsTableHeaderCheckbox: FC<HeaderContext<FileAttachment, unknown>> = ({
	table,
}) => (
	<Checkbox
		checked={table.getIsAllRowsSelected()}
		indeterminate={table.getIsSomeRowsSelected()}
		onChange={table.getToggleAllRowsSelectedHandler()}
		id={`${ATTACHMENTS_TABLE}-header-checkbox`}
		data-testid={`${ATTACHMENTS_TABLE}-header-checkbox`}
	/>
);
