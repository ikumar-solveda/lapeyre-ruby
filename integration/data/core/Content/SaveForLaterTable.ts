/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { USAGE_DISPLAY, USAGE_OFFER } from '@/data/constants/catalog';
import { ResponseProductType } from '@/data/types/Product';
import { useMemo } from 'react';

export type ColumnWithKey = {
	key: string;
	numeric?: boolean;
	[extra: string]: any;
};

export const useSaveForLaterTable = (products: ResponseProductType[]) => {
	const data = useMemo(
		() =>
			products
				? products.map((product) => {
						const { partNumber, price } = product || {};
						return {
							itemDetails: {
								partNumber,
								currency: price?.[0].currency,
								unitPrice:
									price?.find((p) => p.usage === USAGE_OFFER)?.value ||
									price?.find((p) => p.usage === USAGE_DISPLAY)?.value,
								key: 'partNumber',
							},
							price: {
								itemPrice:
									price?.find((p) => p.usage === USAGE_OFFER)?.value ||
									price?.find((p) => p.usage === USAGE_DISPLAY)?.value,
								currency: price?.[1].currency,
								key: 'itemPrice',
								numeric: true,
							},
						};
				  })
				: [],
		[products]
	);

	return {
		data,
	};
};
