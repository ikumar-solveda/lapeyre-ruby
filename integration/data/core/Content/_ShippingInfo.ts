/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { ID } from '@/data/types/Basic';
import { BopisRequestBody } from '@/data/types/CheckOut';
import { transactionsShippingInfo } from 'integration/generated/transactions';
import {
	CartUsableShippingInfo,
	ComIbmCommerceRestOrderHandlerShippingInfoHandlerUpdateShippingInfoBodyDescription,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { intersectionBy } from 'lodash';

/**
 * This REST service method returns
 * 1. order level shipping addresses allowed for this order(current cart) as a single shipment shipping address. The single shipping
 * address means the whole order ships to one address instead of different addresses by order items.
 * 2. order item level of usable shipping addresses associated with the particular order item (product)
 */
export const shippingInfoFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		params: RequestParams
	) =>
		await transactionsShippingInfo(pub).cartGetUsableShippingInfo(storeId, query, params);
const emptyData = {} as
	| ComIbmCommerceRestOrderHandlerShippingInfoHandlerUpdateShippingInfoBodyDescription
	| BopisRequestBody;
export const shippingInfoUpdateFetcher = async (
	storeId: string,
	query: {
		[key: string]: string | boolean | ID[] | number;
	} = {},
	data:
		| ComIbmCommerceRestOrderHandlerShippingInfoHandlerUpdateShippingInfoBodyDescription
		| BopisRequestBody = emptyData,
	params: RequestParams
) =>
	await transactionsShippingInfo(true).shippingInfoUpdateOrderShippingInfo(
		storeId,
		query,
		data as any,
		params
	);

export const getUniqueShippingMethods = (usableShipping: CartUsableShippingInfo | undefined) => {
	const shipModes =
		usableShipping?.orderItem?.map(({ usableShippingMode }) => usableShippingMode ?? []) ?? [];
	return intersectionBy(...shipModes, 'shipModeId').filter(
		(mode) => mode.shipModeCode !== SHIP_MODE_CODE_PICKUP
	);
};
