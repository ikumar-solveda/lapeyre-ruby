/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

/** {
 *		enabled: false,
 *  }
 */
type ConfigEntry = Record<string, boolean | string>;

/** {
 *     guestShopping: {
 *				enabled: false,
 *		},
 *  }
 */
type StoreConfigEntry = {
	[configId: string]: ConfigEntry;
};
/**
 * Store specific config.
 * e.g. {
 *    '12': {
 *      guestShopping: {
					enabled: false,
				},
 *    },
 *  default: {
*     guestShopping: {
				enabled: false,
			},
*   },
 * }
 */
export type StoreConfig = {
	[storeId: string]: StoreConfigEntry;
	default: StoreConfigEntry;
};

export type StoreEnablementConfig = {
	enabled: boolean;
};
