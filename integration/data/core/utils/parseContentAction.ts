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
	} else if (link?.indexOf(URL_ACTIONS.couponIssue) === 0) {
		/*
		 * case 3: issue coupon
		 * CouponsIssue?promotionName=#promotionName#&catalogId=11501&storeId=#storeId#&URL=OrderCalculate?URL=OrderItemDisplay&calculationUsageId=#langId#
		 */
		const components = link.replace(URL_ACTIONS.couponIssue, '').split('&');

		// the promotion name is "+"-encoded (spaces) and suffixed with a unique identifier using "-"
		const promotionName = decodeURIComponent(components[0].split('=')[1]).replace(/\+/g, ' ');
		rc = {
			action: CONTENT_ACTIONS.issueCouponAction,
			promotionName,
			parsedContentUrl: SLASH,
		};
	} else if (link?.indexOf(URL_ACTIONS.addOrderItemWithPromotionCodeOrCoupon) === 0) {
		/**
		 * case 2: add to cart and apply promotion
		 * AddOrderItemWithPromotionCodeOrCoupon?partNumber=LR-DECO-0001-0001&promoCode=#promoCode#&
		 * catalogId=#catalogId#&storeId=#storeId#&quantity=1&URL=OrderCalculate?URL=OrderItemDisplay&
		 * calculationUsageId=#calUsageId#
		 */
		const components = link
			.replace(URL_ACTIONS.addOrderItemWithPromotionCodeOrCoupon, '')
			.split('&');
		rc = {
			action: CONTENT_ACTIONS.addToCartAndApplyPromotionAction,
			partNumber: components[0].split('=')[1],
			promoCode: components[1].split('=')[1],
			quantity: components[4].split('=')[1],
			parsedContentUrl: SLASH,
		};
	} else if (link?.indexOf(URL_ACTIONS.discountDetailsDisplayView) === 0) {
		/**
		 * case 5: display promotion details
		 * DiscountDetailsDisplayView?code=#promoName#&catalogId=#catalogId#&storeId=#storeId#&pStoreId=#pStoreId#
		 */
		const components = link.replace(URL_ACTIONS.discountDetailsDisplayView, '').split('&');
		rc = {
			action: CONTENT_ACTIONS.displayDiscountDetailsAction,
			code: components[0].split('=')[1],
			parsedContentUrl: SLASH,
		};
	}

	return rc;
};
