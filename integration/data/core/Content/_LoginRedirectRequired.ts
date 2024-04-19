/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { useCallback } from 'react';

export const useLoginRedirectRequired = () => {
	const { user } = useUser();
	const router = useNextRouter();
	const routes = useLocalization('Routes');
	const loginRoute = routes.Login.route.t();
	const { data: guestShopping, loading } = useFlexFlowStoreFeature({
		id: EMS_STORE_FEATURE.GUEST_SHOPPING,
	});
	const guestShoppingEnabled = guestShopping.featureEnabled;
	const loginStatus = user?.isLoggedIn;
	const redirectToLoginIfNeed = useCallback(async () => {
		if (!loginStatus && !guestShoppingEnabled) {
			await router.push(loginRoute);
			return true;
		} else {
			return false;
		}
	}, [guestShoppingEnabled, loginStatus, router, loginRoute]);

	return {
		redirectToLoginIfNeed,
		loginStatus,
		guestShoppingEnabled,
		storeFeatureLoading: loading,
	};
};
