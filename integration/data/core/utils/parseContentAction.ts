/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SLASH } from '@/data/constants/language';
import { CONTENT_ACTIONS, URL_ACTIONS } from '@/data/constants/marketing';
import { ParsedContentURL } from '@/data/types/Marketing';

type Props = {
	link?: string;
	route?: Record<string, Record<string, Record<string, () => string>>>;
};

export const parseContentAction = ({ link }: Props) => {
	let rc: ParsedContentURL | undefined;

	/**
	 * case 1: add to cart
	 * OrderItemAdd?partNumber=LR-DECO-0001-0001&URL=OrderCalculate?URL=OrderItemDisplay&calculationUsageId=-1&quantity=1&catalogId=#catalogId#&storeId=#storeId#
	 */
	if (link?.indexOf(URL_ACTIONS.orderItemAdd) === 0) {
		const components = link.replace(URL_ACTIONS.orderItemAdd, '').split('&');
		rc = {
			action: CONTENT_ACTIONS.addToCartAction,
			partNumber: components[0].split('=')[1],
			quantity: components[3].split('=')[1],
			parsedContentUrl: SLASH,
		};
	} else if (link?.indexOf(URL_ACTIONS.interestItemAdd) === 0) {
		/**
		 * case 2: add to wish list
		 * InterestItemAdd?partNumber=LR-DECO-0002-0001&URL=InterestItemDisplay&catalogId=#catalogId#&storeId=#storeId#
		 */
		const components = link.replace(URL_ACTIONS.interestItemAdd, '').split('&');
		rc = {
			action: CONTENT_ACTIONS.addToWishListAction,
			partNumber: components[0].split('=')[1],
			parsedContentUrl: SLASH,
		};
	}

	return rc;
};
