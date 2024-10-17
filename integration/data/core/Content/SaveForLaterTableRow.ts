/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useProduct } from '@/data/Content/Product';
import { ProductType, ResponseProductAttribute } from '@/data/types/Product';
import { get, partition } from 'lodash';

const EMPTY_PROD = {} as ProductType;
const EMPTY_ATTRS: ResponseProductAttribute[] = [];

export const useSaveForLaterTableRow = (partNumber: string) => {
	const { product = EMPTY_PROD, loading, isValidating } = useProduct({ id: partNumber });
	const { attributes = EMPTY_ATTRS } = product;
	const [colorAttributes, otherAttributes] = partition(
		attributes,
		({ identifier }) => identifier === 'Color'
	);
	const color = get(colorAttributes[0], 'values[0].value', '');

	return {
		product,
		color,
		loading,
		isValidating,
		attributes: otherAttributes,
	};
};
