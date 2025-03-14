/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { useCategory } from '@/data/Content/Category';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { DataProps, OpenGraphDataType } from '@/data/types/OpenGraph';
import { useMemo } from 'react';

export const useOpenGraphForCategoryPage = ({ data }: DataProps) => {
	const { settings } = useSettings();
	const id = data?.tokenValue;
	const { category } = useCategory(id as string);

	const openGraph = useMemo(() => {
		if (!category) {
			return undefined;
		} else {
			const { name, description, thumbnail, seo } = category;
			const rc: OpenGraphDataType = {
				type: 'product.group',
				title: data?.page.title || EMPTY_STRING,
				description,
				images: [{ image: thumbnail, alt: name }],
				url: seo?.href || EMPTY_STRING,
				locale: data?.language || EMPTY_STRING,
				site: settings?.storeName || EMPTY_STRING,
			};
			return rc;
		}
	}, [category, data, settings]);

	return {
		data: openGraph,
	};
};
