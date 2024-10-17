/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { TableMeta } from '@tanstack/react-table';

export type OrderTableData = {
	itemDetails: {
		partNumber: string;
		orderItemId: string;
		contractId: string;
		currency: string;
		unitPrice: string;
		key: string;
	};
	availability: {
		availability: Omit<ProductAvailabilityData, 'partNumber'>[] | null;
		loading: boolean;
		error: any;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
		key: string;
	};
	quantity: {
		quantity: number;
		onChange: (quantity: number | null) => Promise<void>;
		key: string;
		numeric: boolean;
		min?: number;
		isControlled?: boolean; // controlled value for NumberInput compo
	};
	fulfillment: {
		type: 'pickup' | 'delivery';
		physicalStoreExternalId?: string;
	};
	price: { orderItemPrice: string; currency: string; key: string; numeric: boolean };
	physicalStoreId: string | undefined;
	freeGift: boolean;
};

export type ColumnWithKey = {
	key: string;
	numeric?: boolean;
	[extra: string]: any;
};
export interface OrderTableMeta extends TableMeta<OrderTableData> {
	readonly: boolean;
	isShippingGroup: boolean;
	orderStatus?: string;
}
