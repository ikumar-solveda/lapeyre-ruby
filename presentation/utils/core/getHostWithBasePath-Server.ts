/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BASE_PATH, HCL_DOT_IMAGE_PATH, HEADER_HOST_KEY } from '@/data/constants/common';
import { concatPathComponents } from '@/utils/concatPathComponent';
import { headers } from 'next/headers';

export const getHostWithBasePath = (storeConf: Record<string, any>) => {
	const host = headers().get(HEADER_HOST_KEY) ?? '';
	const hclImagePath = storeConf[HCL_DOT_IMAGE_PATH] ?? '';
	const path = concatPathComponents(BASE_PATH, hclImagePath);
	const basePath = host ? `https://${concatPathComponents(host, path)}` : path;
	return { basePath };
};
