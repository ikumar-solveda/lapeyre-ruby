/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export const UNSUPPORTED_PAYMENTS = ['ApplePay', 'Check'];

// checkout profiles are (currently) shipping-specific, so no BOPIS-type payment methods
export const UNSUPPORTED_PAYMENTS_CHECKOUT_PROFILES = [...UNSUPPORTED_PAYMENTS, 'PayInStore'];
