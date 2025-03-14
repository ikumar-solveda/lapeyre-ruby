/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { PropertyOpenGraphMap } from '@/data/constants/openGraph';
import type { OpenGraphDataType, OpenGraphImageType } from '@/data/types/OpenGraph';

export const getOpenGraphTags = (data: OpenGraphDataType) =>
	Object.entries(data)
		.map(([key, value]) => {
			if (key === 'images') {
				return (value as OpenGraphImageType[]).map(({ image, alt }) => {
					const rc = [];
					rc.push(`<meta property="${PropertyOpenGraphMap.image}" content="${image}" />`);
					if (alt) {
						rc.push(`<meta property="${PropertyOpenGraphMap.imageAlt}" content="${alt}" />`);
					}
					return rc.join('');
				});
			}
			return `<meta property="${
				PropertyOpenGraphMap[key as keyof typeof PropertyOpenGraphMap]
			}" content="${value}" />`;
		})
		.flat()
		.join('');
