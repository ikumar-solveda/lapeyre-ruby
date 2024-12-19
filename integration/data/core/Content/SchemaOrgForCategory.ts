/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { useCategory } from '@/data/Content/Category';
import { useChildCategoryGrid } from '@/data/Content/ChildCategoryGrid';
import { CategoryDataProps } from '@/data/types/SchemaOrg';
import { useMemo } from 'react';
import { CategoryCode, ItemList } from 'schema-dts';

export const useSchemaOrgForCategory = ({ id, parentCategoryId }: CategoryDataProps) => {
	const { category } = useCategory(id as string);
	const { root, categories } = useChildCategoryGrid(parentCategoryId as string);

	const { identifier, hierarchical, schema } = useMemo(() => {
		let hierarchical: string | undefined;
		let schema: string | undefined;
		let identifier: string | undefined;

		if (parentCategoryId) {
			const list = categories?.map(
				(category) =>
					({
						'@type': 'CategoryCode',
						identifier: category.identifier,
						name: category.name,
						url: category.seo.href,
					} as CategoryCode)
			);

			hierarchical = JSON.stringify({
				'@type': 'ItemList',
				identifier: root?.identifier || EMPTY_STRING,
				name: root?.name || EMPTY_STRING,
				url: root?.seo.href || EMPTY_STRING,
				numberOfItems: list?.length,
				itemListElement: list,
			} as ItemList);

			identifier = root?.identifier;
		} else if (id) {
			schema = JSON.stringify({
				'@type': 'CategoryCode',
				identifier: category?.identifier || EMPTY_STRING,
				name: category?.name || EMPTY_STRING,
				url: category?.seo.href || EMPTY_STRING,
			} as CategoryCode);
			identifier = category?.identifier;
		}

		return { identifier, hierarchical, schema };
	}, [parentCategoryId, id, categories, root, category]);

	return { hierarchical, schema, identifier };
};
