/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { ContentContext } from '@/data/context/content';
import { Pagination } from '@mui/material';
import { FC, useContext } from 'react';

export const CatalogEntryListPagination: FC = () => {
	const { pageCount, pageNumber, onPageChange } = useContext(ContentContext) as ReturnType<
		typeof useCatalogEntryList
	>;
	return pageCount && pageCount > 1 ? (
		<Pagination
			count={pageCount}
			shape="rounded"
			page={pageNumber}
			onChange={(_: React.ChangeEvent<unknown>, page: number) => onPageChange(page)}
		/>
	) : null;
};
