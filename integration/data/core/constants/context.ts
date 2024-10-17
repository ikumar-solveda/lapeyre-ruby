/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { STORE_ID } from '@/data/config/STORE_ID';
import { AppContextWrapper } from '@/data/types/AppRouter';

export const mockContext = {
	locale: 'en-us',
	query: { storeId: STORE_ID } as Record<string, string>,
	req: { headers: {} },
} as AppContextWrapper;
