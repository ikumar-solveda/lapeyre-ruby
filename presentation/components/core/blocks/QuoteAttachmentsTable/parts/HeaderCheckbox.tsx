/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

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
	/>
);
