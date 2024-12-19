/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quotesTableActionsSX } from '@/components/content/Quotes/styles/Table/actions';
import { type useQuoteProducts } from '@/data/Content/QuoteProducts';
import { useLocalization } from '@/data/Localization';
import { Search as SearchIcon } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { type FC } from 'react';

type Props = {
	onSearch: ReturnType<typeof useQuoteProducts>['onSearch'];
};
export const QuoteProductsTableSearch: FC<Props> = ({ onSearch }) => {
	const localization = useLocalization('QuoteProductsTable');

	return (
		<TextField
			data-testid="products-table-search"
			id="products-table-search"
			name="productsTableSearch"
			placeholder={localization.SearchProduct.t()}
			fullWidth
			sx={quotesTableActionsSX}
			inputProps={{ maxLength: 128 }}
			onChange={onSearch}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Tooltip title={localization.SearchProduct.t()}>
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
