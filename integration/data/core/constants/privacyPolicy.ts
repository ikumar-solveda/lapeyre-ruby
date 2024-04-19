/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CustomizeLabelKey, PrivacyPolicy } from '@/data/types/PrivacyPolicy';

export const PRIVACY_POLICY_STATE_KEY = 'privacyPolicy';
export const PRIVACY_POLICY_SESSION_KEY = 'privacyPolicyUpdateSession';
export const PRIVACY_POLICY_MODAL_CONTENT = 'PrivacyPolicyModal_Content';
export const COOKIE_MARKETING_TRACKING_CONSENT = 'MarketingTrackingConsent';
export const COOKIE_PRIVACY_NOTICE_VERSION = 'PrivacyNoticeVersion';
export const MARKETING_TRACKING_CONSENT_KEY = 'marketingTrackingConsent';
export const PRIVACY_NOTICE_VERSION_KEY = 'privacyNoticeVersion';

export const COOKIE_GDPR_MANAGEMENT = [
	COOKIE_PRIVACY_NOTICE_VERSION,
	COOKIE_MARKETING_TRACKING_CONSENT,
];

export const PRIVACY_POLICY_CUSTOMIZE_LIST = [
	{
		id: 'NecessaryFunctional' as CustomizeLabelKey,
		disabled: true,
	},
	{
		id: 'MarketingAnalytics' as CustomizeLabelKey,
		key: MARKETING_TRACKING_CONSENT_KEY,
		on: '1',
		off: '0',
	},
];

export const PRIVACY_POLICY_CUSTOMIZE_LIST_MARKETING_CONSENT_OFF =
	PRIVACY_POLICY_CUSTOMIZE_LIST.filter((e) => !e.key || e.key !== MARKETING_TRACKING_CONSENT_KEY);

export const PRIVACY_POLICY_CUSTOMIZE_ALL: PrivacyPolicy = PRIVACY_POLICY_CUSTOMIZE_LIST.filter(
	(e): e is Required<(typeof PRIVACY_POLICY_CUSTOMIZE_LIST)[number]> => !!e.key
)
	.map(({ key, on }) => ({ [key]: on }))
	.reduce((agg, v) => ({ ...agg, ...v }), {} as PrivacyPolicy);

export const PRIVACY_POLICY_CUSTOMIZE_ALL_MARKETING_CONSENT_OFF: PrivacyPolicy =
	PRIVACY_POLICY_CUSTOMIZE_LIST.filter(
		(e): e is Required<(typeof PRIVACY_POLICY_CUSTOMIZE_LIST)[number]> =>
			!!e.key && e.key !== MARKETING_TRACKING_CONSENT_KEY
	)
		.map(({ key, on }) => ({ [key]: on }))
		.reduce((agg, v) => ({ ...agg, ...v }), {} as PrivacyPolicy);
