/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { BASE_PATH as basePath } from '@/data/constants/common';
import { ImageProps } from 'next/image';
import { useMemo } from 'react';

export const useImagePath = (originalSrc: string) => {
	const src = useMemo(() => {
		if (
			basePath &&
			originalSrc &&
			!originalSrc.startsWith('http') &&
			!originalSrc.startsWith(basePath)
		) {
			return `${basePath}/${originalSrc}`.replaceAll('//', '/');
		} else return originalSrc;
	}, [originalSrc]);

	return src;
};

export const useNextImagePath = (originalSrc: ImageProps['src']) => {
	const src = useMemo(() => {
		if (basePath && typeof originalSrc === 'string' && !originalSrc.startsWith(basePath)) {
			return `${basePath}/${originalSrc}`.replaceAll('//', '/');
		} else return originalSrc;
	}, [originalSrc]);

	return src;
};
