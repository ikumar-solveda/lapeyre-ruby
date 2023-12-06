/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { ContentContext } from '@/data/context/content';
import { Pagination } from '@mui/material';
import { ChangeEvent, FC, useCallback, useContext } from 'react';

export const CatalogEntryListPagination: FC = () => {
	const { pageCount, pageNumber, onPageChange } = useContext(ContentContext) as ReturnType<
		typeof useCatalogEntryList
	>;
	const onChange = useCallback(
		(_: ChangeEvent<unknown>, page: number) => onPageChange(page),
		[onPageChange]
	);

	return pageCount && pageCount > 1 ? (
		<Pagination count={pageCount} shape="rounded" page={pageNumber} onChange={onChange} />
	) : null;
};
