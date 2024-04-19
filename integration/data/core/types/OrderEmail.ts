/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { getTypedLocalization } from '@/data/Localization-Server';
import { AppContextWrapper } from '@/data/types/AppRouter';
import { Cache } from '@/data/types/Cache';
import { Order, OrderItem } from '@/data/types/Order';

export type OrderEmailRow = {
	order: Order;
	localization: Awaited<ReturnType<typeof getTypedLocalization<'EmailTemplate'>>>['Order'];
	context: AppContextWrapper;
	cache: Cache;
};

export type OrderEmailShippingRow = {
	orderItems: OrderItem[];
} & OrderEmailRow;

export type StringBoolean = 'String_true' | 'String_false';
