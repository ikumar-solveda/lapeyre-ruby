/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { useProduct } from '@/data/Content/Product';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { DataProps, OpenGraphDataType } from '@/data/types/OpenGraph';
import { useMemo } from 'react';

export const useOpenGraphForProductPage = ({ data }: DataProps) => {
	const { settings } = useSettings();
	const partNumber = data?.tokenExternalValue;
	const { product } = useProduct({ id: partNumber });

	const openGraph = useMemo(() => {
		if (!product) {
			return undefined;
		} else {
			const {
				name,
				fullImage,
				thumbnail,
				images = [],
				shortDescription,
				seo,
				productPrice,
				components = [],
			} = product;
			const rc: OpenGraphDataType = {
				type: 'product',
				title: data?.page.title || EMPTY_STRING,
				description: shortDescription,
				images: [
					{ image: fullImage || thumbnail, alt: name },
					...images.map(({ fullImage, thumbnail, name: alt }) => ({
						image: fullImage || thumbnail,
						alt,
					})),
					...components
						.map(({ fullImage, thumbnail, name: alt, images = [] }) => [
							{ image: fullImage || thumbnail, alt },
							...images.map(({ fullImage, thumbnail, name: alt }) => ({
								image: fullImage || thumbnail,
								alt,
							})),
						])
						.flat(),
				],
				url: seo?.href || EMPTY_STRING,
				currency: productPrice?.currency || EMPTY_STRING,
				price: productPrice?.min?.toString() || EMPTY_STRING,
				locale: data?.language || EMPTY_STRING,
				site: settings?.storeName || EMPTY_STRING,
			};
			return rc;
		}
	}, [product, data, settings]);

	return {
		data: openGraph,
	};
};
