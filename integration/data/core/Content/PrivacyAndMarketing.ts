/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { COOKIES } from '@/data/constants/cookie';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { CookiesSingletonContext } from '@/data/cookie/cookiesSingletonProvider';
import { useCallback, useContext, useMemo } from 'react';

export const usePrivacyAndMarketing = () => {
	const { data: sessionFeature } = useFlexFlowStoreFeature({ id: EMS_STORE_FEATURE.SESSION });
	const { setCookie, getCookie } = useContext(CookiesSingletonContext);
	const { privacyNoticeVersion, marketingTrackingConsent } = useMemo(() => {
		const privacyNoticeVersion = getCookie<number>(COOKIES.privacy);
		const marketingTrackingConsent = getCookie<number>(COOKIES.marketing);
		return { privacyNoticeVersion, marketingTrackingConsent };
	}, [getCookie]);
	const isSession = sessionFeature.featureEnabled;

	const setPrivacyNoticeVersion = useCallback(
		(version?: number) => setCookie<number>(COOKIES.privacy, version, isSession),
		[isSession, setCookie]
	);

	const setMarketingTrackingConsent = useCallback(
		(version?: number) => setCookie(COOKIES.marketing, version, isSession),
		[isSession, setCookie]
	);

	return {
		privacyNoticeVersion,
		marketingTrackingConsent,
		setPrivacyNoticeVersion,
		setMarketingTrackingConsent,
	};
};
