/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { QuoteAttachmentsTableActionsCell } from '@/components/blocks/QuoteAttachmentsTable/parts/ActionsCell';
import { QuoteAttachmentsTableAttachmentCell } from '@/components/blocks/QuoteAttachmentsTable/parts/AttachmentCell';
import { QuoteAttachmentsTableCheckboxCell } from '@/components/blocks/QuoteAttachmentsTable/parts/CheckboxCell';
import { QuoteAttachmentsTableHeaderCheckbox } from '@/components/blocks/QuoteAttachmentsTable/parts/HeaderCheckbox';
import { QuoteAttachmentsTableHeaderRow } from '@/components/blocks/QuoteAttachmentsTable/parts/HeaderRow';
import { QuoteAttachmentsTableRow } from '@/components/blocks/QuoteAttachmentsTable/parts/Row';
import { QuoteAttachmentsTableToolbar } from '@/components/blocks/QuoteAttachmentsTable/parts/Toolbar';
import { quoteAttachmentsTableLoadMoreSX } from '@/components/blocks/QuoteAttachmentsTable/styles/loadMore';
import { Table } from '@/components/blocks/Table/Table';
import { TableBody } from '@/components/blocks/Table/TableBody';
import { TableHead } from '@/components/blocks/Table/TableHead';
import { ATTACHMENTS_TABLE, State } from '@/data/constants/quotes';
import { type useQuoteCreateEdit } from '@/data/Content/QuoteCreateEdit';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { FileAttachment } from '@/data/types/Quote';
import {
	Box,
	Button,
	CircularProgress,
	Paper,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
	type HeaderGroup,
	type Row,
	type RowSelectionState,
	type VisibilityState,
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { type FC, useContext, useEffect, useMemo, useState } from 'react';

type QuoteAttachmentsTableProps = {
	detailsView?: boolean;
};
const INIT_ROW_SELECTION = {};

export const QuoteAttachmentsTable: FC<QuoteAttachmentsTableProps> = ({ detailsView }) => {
	const localization = useLocalization('QuoteAttachmentsTable');
	const {
		quoteById: quoteData,
		dataAttachments,
		onAttachmentLoadMore,
		isAttachmentsLoading: isFetching,
		hasMoreAttachment,
	} = useContext(ContentContext) as ReturnType<typeof useQuoteCreateEdit>;
	const theme = useTheme();
	const sm = useMediaQuery(theme.breakpoints.down('md'));

	const [rowSelection, setRowSelection] = useState<RowSelectionState>(() => ({}));
	const columns = useMemo(() => {
		const columnHelper = createColumnHelper<FileAttachment>();
		return [
			columnHelper.display({
				id: 'select',
				header: QuoteAttachmentsTableHeaderCheckbox,
				cell: QuoteAttachmentsTableCheckboxCell,
				enableSorting: false,
				meta: { width: 42 },
			}),
			columnHelper.accessor((row) => row.id, {
				header: localization.Attachment.t(),
				id: 'attachment',
				cell: QuoteAttachmentsTableAttachmentCell,
			}),
			columnHelper.accessor((row) => row.id, {
				id: 'actions',
				header: '',
				cell: QuoteAttachmentsTableActionsCell,
				enableSorting: false,
			}),
		];
	}, [localization]);

	const columnVisibility = useMemo<VisibilityState>(
		() =>
			(detailsView
				? quoteData?.status === State.READY
					? { select: false }
					: { select: false, actions: false }
				: { select: !sm }) as VisibilityState,
		[detailsView, quoteData, sm]
	);

	const { getHeaderGroups, getRowModel } = useReactTable<FileAttachment>({
		columns,
		data: dataAttachments,
		getRowId: (row: FileAttachment, _index: number, _parent?: Row<FileAttachment>) =>
			`${row.id ?? ''}`,
		getCoreRowModel: getCoreRowModel(),
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		state: { columnVisibility, rowSelection },
	});

	const { rows } = getRowModel();
	const headers: HeaderGroup<FileAttachment> | undefined = getHeaderGroups().at(-1);
	useEffect(() => {
		setRowSelection(INIT_ROW_SELECTION);
	}, [dataAttachments]);

	return (
		<TableContainer component={Paper} variant="outlined">
			{!isEmpty(rowSelection) ? <QuoteAttachmentsTableToolbar rowSelection={rowSelection} /> : null}
			<Table id={ATTACHMENTS_TABLE} data-testid={ATTACHMENTS_TABLE}>
				{!detailsView ? (
					<TableHead
						id={`${ATTACHMENTS_TABLE}-head`}
						data-testid={`${ATTACHMENTS_TABLE}-head`}
						responsive
					>
						{getHeaderGroups().map((headerGroup) => (
							<QuoteAttachmentsTableHeaderRow
								key={`${ATTACHMENTS_TABLE}-header-${headerGroup.id}`}
								headerGroup={headerGroup}
							/>
						))}
					</TableHead>
				) : null}
				<TableBody id={`${ATTACHMENTS_TABLE}-body`} data-testid={`${ATTACHMENTS_TABLE}-body`}>
					{rows.length > 0 ? (
						rows.map((row) => (
							<QuoteAttachmentsTableRow key={`${ATTACHMENTS_TABLE}-row-${row.id}`} row={row} />
						))
					) : (
						<TableRow>
							<TableCell colSpan={headers?.headers.length}>
								<Typography textAlign="center">{localization.NoAttachments.t()}</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{hasMoreAttachment ? (
				<Box sx={quoteAttachmentsTableLoadMoreSX}>
					{isFetching ? (
						<CircularProgress size={25} />
					) : (
						<Button variant="inline" onClick={onAttachmentLoadMore}>
							{localization.LoadMore.t()}
						</Button>
					)}
				</Box>
			) : null}
		</TableContainer>
	);
};
