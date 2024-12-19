/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BREADCRUMB_TRAIL } from '@/data/constants/schemaOrg';
import { useCatalogEntryList } from '@/data/Content/CatalogEntryList';
import { DataProps } from '@/data/types/SchemaOrg';
import { findSlotWithWidget } from '@/data/utils/findSlotWithWidget';
import { useMemo } from 'react';
import { ItemList, ListItem } from 'schema-dts';
import { createSchemaOrgMetaDataForProduct } from '@/data/utils/createSchemaOrgMetaDataForProduct';
import { EMPTY_STRING } from '@/data/constants/marketing';

export const useSchemaOrgForProductListingPage = ({ data }: DataProps) => {
	const { products } = useCatalogEntryList(data?.tokenValue as string);
	const requiresCrumb = useMemo(() => !!findSlotWithWidget(data, BREADCRUMB_TRAIL), [data]);

	const schema = useMemo(() => {
		const list = products.map(
			(product, index) =>
				({
					'@type': 'ListItem',
					position: index + 1,
					item: createSchemaOrgMetaDataForProduct(product),
				} as ListItem)
		);

		const s: ItemList = {
			'@type': 'ItemList',
			name: data?.tokenExternalValue || EMPTY_STRING,
			numberOfItems: list?.length,
			itemListElement: list,
		};

		return JSON.stringify(s);
	}, [products, data?.tokenExternalValue]);

	return { schema, requiresCrumb };
};
