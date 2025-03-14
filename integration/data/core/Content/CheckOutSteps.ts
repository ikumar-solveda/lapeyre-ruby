/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CHECK_OUT_STEPS, STEPS } from '@/data/constants/checkout';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useCart } from '@/data/Content/Cart';
import { validateProfileUsage } from '@/data/utils/validateProfileUsage';
import { useMemo } from 'react';

export const useCheckOutSteps = () => {
	const { pickupOnly, deliveryOnly, data } = useCart();
	const router = useNextRouter();
	const profileId = useMemo(() => router.query.profile as string, [router.query.profile]);
	const profileUsed = useMemo(() => validateProfileUsage(profileId, data), [profileId, data]);

	const steps = useMemo(
		() =>
			profileUsed
				? deliveryOnly
					? [STEPS.review]
					: [STEPS.pickup, STEPS.review]
				: pickupOnly
				? CHECK_OUT_STEPS.filter((s) => s !== STEPS.shipping)
				: deliveryOnly
				? CHECK_OUT_STEPS.filter((s) => s !== STEPS.pickup)
				: CHECK_OUT_STEPS,
		[profileUsed, pickupOnly, deliveryOnly]
	);
	return {
		steps,
		profileUsed,
		profileId,
	};
};
