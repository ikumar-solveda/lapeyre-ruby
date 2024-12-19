/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import type { useCart } from '@/data/Content/Cart';
import type {
	CartAssignedCoupon,
	CartRewardOption,
	ComIbmCommerceWalletFacadeDatatypesCouponDescriptionType,
} from 'integration/generated/transactions/data-contracts';
import { MouseEvent } from 'react';

export type CartItem = {
	name: string;
	quant: number;
};

export type Cart = {
	items: CartItem[];
};

type OrderAdjustment = {
	code?: string;
	description?: string;
	displayLevel?: string;
	currency?: string;
	amount?: string;
	usage?: string;
	userDataField?: { value?: string; key: string }[];
	descriptionLanguage?: string;
	xadju_calUsageId?: string;
};

type StoreIdentifier = {
	uniqueID?: string;
	externalIdentifier?: { ownerID?: string; nameIdentifier?: string };
};

type AssociatedPromotion = {
	description?: { value?: string; language?: string };
	promotionIdentifier?: {
		calculationCodeIdentifier?: {
			calculationCodeExternalIdentifier?: {
				calculationUsageID?: string;
				code?: string;
				storeIdentifier?: StoreIdentifier;
			};
			uniqueID?: string;
		};
		uniqueID?: string;
		externalIdentifier?: {
			storeIdentifier?: StoreIdentifier;
			version?: number;
			name: string;
			revision?: number;
		};
	};
};

export type { CartRewardOption };

export type Order = {
	adjustment?: OrderAdjustment[];
	buyerDistinguishedName: string;
	buyerId: string;
	buyerPONumber?: string;
	channel: Channel;
	contracts?: {
		list: Record<string, string>[];
		byId: Record<string, any>;
	};
	orderEditor?: {
		distinguishedName: string;
		externalIdentifier: { identifier: string };
		uniqueID: string;
	};
	grandTotal: string;
	grandTotalCurrency: string;
	lastUpdateDate: string;
	locked: string;
	orderId: string;
	orderItem: OrderItem[];
	orderStatus: string;
	orderDescription: string;
	orderTypeCode: string;
	orgDistinguishedName: string;
	orgUniqueID: string;
	paymentInstruction: PaymentInstruction[];
	placedDate: string;
	prepareIndicator: string;
	promotionCode?: {
		userData?: { userDataField?: { value?: string; key: string }[] };
		associatedPromotion?: AssociatedPromotion[];
		code?: string;
		reason?: {
			reasonCode?: string;
			valid?: boolean;
			description?: { value?: string; language?: string };
			userData?: { userDataField?: { value?: string; key: string }[] };
		};
	}[];
	recordSetComplete: string;
	recordSetCount: string;
	recordSetStartNumber: string;
	recordSetTotal: string;
	resourceId: string;
	resourceName: string;
	shipAsComplete: string;
	storeNameIdentifier: string;
	storeUniqueID: string;
	totalAdjustment: string;
	totalAdjustmentCurrency: string;
	totalProductPrice: string;
	totalProductPriceCurrency: string;
	totalSalesTax: string;
	totalSalesTaxCurrency: string;
	totalShippingCharge: string;
	totalShippingChargeCurrency: string;
	totalShippingTax: string;
	totalShippingTaxCurrency: string;
	x_firstName: string;
	x_isPersonalAddressesAllowedForShipping: string;
	x_isPurchaseOrderNumberRequired: string;
	x_lastName: string;
	x_trackingIds: string;
	rewardOption?: CartRewardOption[];
};

export type UserDataField = {
	value: string;
	key: string;
};

export type Channel = {
	channelIdentifer: {
		channelName: string;
		uniqueID: string;
	};
	userData?: { userDataField: UserDataField[] };
	description: {
		language: string;
		value: string;
	};
};

export type BasicAddress = {
	addressLine: string[];
	city: string;
	country: string;
	email1: string;
	email2: string;
	fax1: string;
	firstName: string;
	lastName: string;
	middleName: string;
	nickName: string;
	personTitle: string;
	phone1: string;
	phone2: string;
	state: string;
	zipCode: string;
};

type UsableShippingChargePolicy = {
	name: string;
	type: string;
	uniqueID: string;
};

type Adjustment = { currency: string; value: string };

type OrderItemAddress = BasicAddress & {
	addressId: string;
	fax2: string;
	phone1Publish: string;
	phone2Publish: string;
	postalCode: string;
	stateOrProvinceName: string;
	xitem_firstName: string;
	xitem_lastName: string;
};

export type OrderItemAdjustment = {
	amount: string;
	code: string;
	currency: string;
	description: string;
	descriptionLanguage: string;
	displayLevel: string;
	language: string;
	usage: string;
};

export type OrderItem = OrderItemAddress & {
	availableDate: string;
	carrier: string;
	contractId: string;
	correlationGroup: string;
	createDate: string;
	currency: string;
	expectedShipDate: string;
	freeGift: string;
	fulfillmentCenterId: string;
	fulfillmentCenterName: string;
	fulfillmentCenterOwnerId: string;
	isExpedited: string;
	lastUpdateDate: string;
	offerID: string;
	orderItemFulfillmentStatus: string;
	orderItemId: string;
	orderItemInventoryStatus: string;
	orderItemPrice: string;
	orderItemStatus: string;
	partNumber: string;
	productId: string;
	quantity: string;
	salesTax: string;
	salesTaxCurrency: string;
	shipModeCode: string;
	shipModeDescription: string;
	shipModeId: string;
	shipModeLanguage: string;
	shippingCharge: string;
	shippingChargeCurrency: string;
	shippingTax: string;
	shippingTaxCurrency: string;
	totalAdjustment: Adjustment;
	unitPrice: string;
	unitQuantity: string;
	unitUom: string;
	UOM: string;
	physicalStoreExternalId?: string;
	physicalStoreId?: string;
	usableShippingChargePolicy: UsableShippingChargePolicy[];
	xitem_isPersonalAddressesAllowedForShipping: string;
	xitem_memberId: string;
	shipInstruction?: string;
	requestedShipDate?: string;
	adjustment?: OrderItemAdjustment[];
};
export type PaymentAddress = BasicAddress & {
	billing_address_id: string;
	fax2: string;
	phone1Publish: string;
	phone2Publish: string;
	postalCode: string;
	stateOrProvinceName: string;
};

export type Protocol = {
	name: string;
	value: string;
};

export type PaymentInstruction = PaymentAddress & {
	payMethodId: string;
	piAmount: string;
	piCurrency: string;
	piDescription: string;
	piId: string;
	piLanguage: string;
	piStatus: string;
	protocolData: Protocol[];
	xpaym_policyId: string;
	xpaym_punchoutPayment: string;
	xpaym_tokenization: string;
	paymentTermConditionId?: string;
};

export type CreditCardAccount = {
	account: string;
	expire_month: string;
	expire_year: string;
	cc_cvc: string;
	cc_brand: string;
};

export type PaymentInfo = {
	piId?: string;
	payMethodId?: string;
	piCurrency?: string;
	piDescription?: string;
	billing_address_id: string;
	piAmount: string;
	policyId: string;
	account?: string;
	expire_month?: string;
	expire_year?: string;
	cc_cvc?: string;
	cc_brand?: string;
	paymentTermConditionId?: string;
	valueFromPaymentTC?: string;
};

export type PaymentToEdit = PaymentInfo & {
	nickName: string;
	action: PIAction;
	dirty: boolean;
};

/**
 * PI action indicator,
 * 'none': not touched, no call to server needed.
 * 'delete': need to call delete by piId
 * 'add': need to call add pi. Note: we can call add to add a batch(different request payload)
 * 'update': call update PI, the update PI call will update current pi and returning a new piId.
 */
export type PIAction = 'none' | 'delete' | 'add' | 'update';

export type CartAppliedCoupon = CartAssignedCoupon & {
	couponId: string;
	description: ComIbmCommerceWalletFacadeDatatypesCouponDescriptionType[];
	xcpcd_promotionAdministrativeDescription: string;
	couponDescription: string;
	xcpcd_promotionStatus: string;
};

export type OrderSummaryContextValues = {
	activeIssuedCoupons: ReturnType<typeof useCart>['activeIssuedCoupons'];
	activeAppliedCoupons: ReturnType<typeof useCart>['activeAppliedCoupons'];
};

export type OrderAvailableCouponsContextValues = OrderSummaryContextValues & {
	onAssignedCouponRemoved: (couponId: string) => (_event: MouseEvent<HTMLElement>) => Promise<void>;
	onCouponApply: (
		couponId: string | undefined
	) => (_event: MouseEvent<HTMLElement>) => Promise<void>;
};

export type DateRange = {
	minDate: Date;
	maxDate: Date;
};
