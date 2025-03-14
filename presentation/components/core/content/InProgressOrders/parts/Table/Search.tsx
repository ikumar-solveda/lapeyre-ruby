/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { inProgressOrdersTableSearchBoxSX } from '@/components/content/InProgressOrders/styles/Table/searchBox';
import { AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE } from '@/data/constants/inProgressOrders';
import { IN_PROGRESS_ORDERS_SEARCH_LEN } from '@/data/constants/order';
import type { useInProgressOrders } from '@/data/Content/InProgressOrders';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { Search } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { useContext, type FC } from 'react';

export const InProgressOrdersTableSearch: FC = () => {
	const inProgressOrdersNLS = useLocalization('InProgressOrdersNew');
	const inProgressOrdersContent = useContext(ContentContext) as ReturnType<
		typeof useInProgressOrders
	>;
	const { onSearch } = inProgressOrdersContent;
	return (
		<TextField
			data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-search`}
			id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-search`}
			name="inProgressOrdersTableSearch"
			placeholder={inProgressOrdersNLS.Search.t()}
			fullWidth
			sx={inProgressOrdersTableSearchBoxSX}
			inputProps={{ maxLength: IN_PROGRESS_ORDERS_SEARCH_LEN }}
			onChange={onSearch}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Tooltip title={inProgressOrdersNLS.Search.t()}>
							<IconButton edge="end">
								<Search />
							</IconButton>
						</Tooltip>
					</InputAdornment>
				),
			}}
		/>
	);
};
