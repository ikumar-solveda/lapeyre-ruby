/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quotesTableActionsSX } from '@/components/content/Quotes/styles/Table/actions';
import type { useQuotes } from '@/data/Content/Quotes';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Search as SearchIcon } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { useContext, type FC } from 'react';

export const QuotesTableSearch: FC = () => {
	const quotesTableNLS = useLocalization('QuotesTable');
	const quotesContent = useContext(ContentContext) as ReturnType<typeof useQuotes>;
	const { onSearch } = quotesContent;
	return (
		<TextField
			data-testid="quotes-table-search"
			id="quotes-table-search"
			name="quotesTableSearch"
			placeholder={quotesTableNLS.Search.t()}
			fullWidth
			sx={quotesTableActionsSX}
			inputProps={{ maxLength: 128 }}
			onChange={onSearch}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Tooltip title={quotesTableNLS.Search.t()}>
							<IconButton edge="end">
								<SearchIcon />
							</IconButton>
						</Tooltip>
					</InputAdornment>
				),
			}}
		/>
	);
};
