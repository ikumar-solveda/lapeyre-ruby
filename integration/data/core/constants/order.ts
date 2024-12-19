/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

/**
 * The default Quantity Unit, as so called unitless unit, opposite to
 * kilogram, meter, liter, pound, foot, quart
 * See [QuantityUnit](https://help.hcltechsw.com/commerce/9.0.0/database/database/qtyunit.html)
 */
export const UNITLESS_UNIT_ONE = 'C62';
export const ORDER_CONFIGS = {
	calculationUsage: '-1,-2,-3,-4,-5,-6,-7',
	calculateOrder: '1',
	inventoryValidation: true,
	inventoryValidationForFulfillmentCenter: true,
	allocate: '***',
	backOrder: '***',
	remerge: '***',
	check: '*n',
};
export const SHIP_MODE_CODE_PICKUP = 'PickupInStore';
export const PART_NUMBER_MAX_LENGTH = 70;
export const QUICK_ORDER_INITIAL_VALUES = 4;
export const QUICK_ORDER_MAX_VALUES = 10;
export const ORDER_STATUS = {
	BackOrdered: 'B',
	Submitted: 'I',
	Approved: 'M',
	NoInventory: 'L',
	ApprovalDenied: 'N',
	PendingOrder: 'P',
	Released: 'R',
	Shipped: 'S',
	PendingApproval: 'W',
	Canceled: 'X',
	Closed: 'D',
	LockedByReturn: 'RTN',
	LockedByAppeasement: 'APP',
};

export const ORDER_HISTORY_REVALIDATION_INTERVAL = 45000;
export const ORDER_TYPE = {
	RECURRING: 'REC',
};

export const QUANTITY_FIELD_MAX_LENGTH = 12;

export const PROMOTION_STATUS_ACTIVE = '1';
export const COUPON_STATUS_ACTIVE = '0';
export const MAX_DISPLAYED_COUPONS = 5;
