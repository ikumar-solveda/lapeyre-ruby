/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useAllowableShippingModesByContract } from '@/data/Content/AllowableShippingModesByContract';
import { useProduct } from '@/data/Content/Product';
import { CatSEO } from '@/data/types/Category';
import { ProductDisplayPrice, ProductType, ResponseProductAttribute } from '@/data/types/Product';
import { get, partition } from 'lodash';
import { useMemo } from 'react';

const EMPTY_SEO = {} as CatSEO;
const EMPTY_PRICE = {} as ProductDisplayPrice;
const EMPTY_PROD = {} as ProductType;
const EMPTY_ATTRS: ResponseProductAttribute[] = [];
const EMPTY_CONTRACT = {} as any;

export const useOrderItemTableRow = (
	partNumber: string,
	contractId?: string | string[],
	_orderItemId = ''
) => {
	const {
		product = EMPTY_PROD,
		loading,
		isValidating,
	} = useProduct({ id: partNumber, contractId });
	const {
		id,
		attributes = EMPTY_ATTRS,
		name = '',
		productPrice = EMPTY_PRICE,
		seo: { href = '' } = EMPTY_SEO,
		manufacturer = '',
		thumbnail = '',
		sellerId,
		seller,
	} = product;
	const normalizedContractId = [contractId].flat().filter(Boolean).at(0);
	const contractParam = useMemo(
		() => (normalizedContractId ? { contractId: normalizedContractId } : EMPTY_CONTRACT),
		[normalizedContractId]
	);
	const { pickupInStoreShipMode, deliveryShipMode } =
		useAllowableShippingModesByContract(contractParam); // shipping modes use order item level contract
	const [colorAttributes, otherAttributes] = partition(
		attributes,
		({ identifier }) => identifier === 'Color'
	);
	const color = get(colorAttributes[0], 'values[0].value', '');

	return {
		details: {
			id,
			partNumber,
			name,
			color,
			thumbnail,
			href,
			prices: productPrice,
			attributes: otherAttributes,
			manufacturer,
			seller,
			sellerId,
			loading,
			contractId,
			isValidating,
			pickupInStoreShipMode,
			deliveryShipMode,
		},
	};
};
