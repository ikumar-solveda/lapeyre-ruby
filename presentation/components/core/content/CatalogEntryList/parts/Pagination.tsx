/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { ContentContext } from '@/data/context/content';
import { Pagination, PaginationItem, PaginationRenderItemParams } from '@mui/material';
import { FC, useCallback, useContext } from 'react';

const EMPTY_OBJECT = {};

export const CatalogEntryListPagination: FC = () => {
	const { pageCount, pageNumber, getPageLink } = useContext(ContentContext) as ReturnType<
		typeof useCatalogEntryList
	>;

	const renderItem = useCallback(
		(item: PaginationRenderItemParams) => {
			const { page } = item;
			const href = page !== null ? { href: getPageLink(page) } : EMPTY_OBJECT;
			return <PaginationItem component={Linkable} {...href} {...item} legacyBehavior={false} />;
		},
		[getPageLink]
	);

	return pageCount && pageCount > 1 ? (
		<Pagination count={pageCount} shape="rounded" page={pageNumber} renderItem={renderItem} />
	) : null;
};
