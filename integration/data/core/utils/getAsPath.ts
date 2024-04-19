/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { useSearchParams } from 'next/navigation';

export const getAsPath = (path: string | null, params: ReturnType<typeof useSearchParams>) => {
	const asPath = `${path ?? ''}${params ? '?' : ''}${params?.toString()}`;
	return asPath;
};
