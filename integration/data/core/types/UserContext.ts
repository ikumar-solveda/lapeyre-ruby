/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import type {
	ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity,
	ComIbmCommerceRestMemberHandlerUserContextHandlerUserContext,
} from 'integration/generated/transactions/data-contracts';

export type UserContext = ComIbmCommerceRestMemberHandlerUserContextHandlerUserContext;
export type Globalization = UserContext['globalization'];
export type LoginResponse = ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity & {
	privacyNoticeVersion?: string;
	marketingTrackingConsent?: string;
};
