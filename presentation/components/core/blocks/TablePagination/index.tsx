/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { tablePaginationSX } from '@/components/blocks/TablePagination/style';
import { PAGINATION } from '@/data/constants/tablePagination';
import { useLocalization } from '@/data/Localization';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowBackIcon from '@mui/icons-material/NavigateBefore';
import ArrowForwardIcon from '@mui/icons-material/NavigateNext';
import { FormControl, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import { isNil } from 'lodash';
import { FC, useEffect } from 'react';

interface PaginationProps {
	pageSize: number;
	setPageSize: (pageSize: number) => void;
	gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
	canPreviousPage: boolean;
	canNextPage: boolean;
	nextPage: () => void;
	pageIndex: number;
	pageOptions?: number[];
	previousPage: () => void;
	pageCount: number;
	totalCount?: number;
}

export const TablePagination: FC<PaginationProps> = (props: PaginationProps) => {
	const {
		pageSize,
		setPageSize,
		gotoPage,
		canPreviousPage,
		canNextPage,
		nextPage,
		pageIndex,
		previousPage,
		pageCount,
		totalCount,
	} = props;
	const pageSizeNLS = useLocalization('commonTable');
	useEffect(() => {
		if (pageIndex >= pageCount) {
			gotoPage(pageCount - 1);
		}
	}, [pageCount, pageIndex, gotoPage]);

	return isNil(totalCount) || totalCount > PAGINATION.sizes[0] ? (
		<Stack direction="row" sx={tablePaginationSX}>
			<FormControl sx={{ marginBottom: 1 }}>
				<Select
					data-testid="page-size"
					id="page-size"
					fullWidth
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
					variant="standard"
				>
					{PAGINATION.sizes.map((size) => (
						<MenuItem key={size} value={size}>
							<Typography component="span">
								{size} {pageSizeNLS.rows.t()}
							</Typography>
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<IconButton
				data-testid="first-page"
				id="first-page"
				size="small"
				onClick={() => gotoPage(0)}
				disabled={!canPreviousPage}
				color="primary"
			>
				<FirstPageIcon fontSize="small" />
			</IconButton>
			<IconButton
				data-testid="previous-page"
				id="previous-page"
				onClick={previousPage}
				size="small"
				disabled={!canPreviousPage}
				color="primary"
			>
				<ArrowBackIcon fontSize="small" />
			</IconButton>
			<Typography component="span">
				{pageSizeNLS.paginationText.t({ from: pageCount ? pageIndex + 1 : 0, total: pageCount })}
			</Typography>
			<IconButton
				data-testid="next-page"
				id="next-page"
				color="primary"
				onClick={nextPage}
				size="small"
				disabled={!canNextPage}
			>
				<ArrowForwardIcon fontSize="small" />
			</IconButton>
			<IconButton
				data-testid="last-page"
				id="last-page"
				color="primary"
				onClick={() => gotoPage(pageCount - 1)}
				size="small"
				disabled={!canNextPage}
			>
				<LastPageIcon fontSize="small" />
			</IconButton>
		</Stack>
	) : null;
};
