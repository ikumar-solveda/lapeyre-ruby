/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useLocalization } from '@/data/Localization';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { StoreDetails } from '@/data/types/Store';
import { dFix } from '@/utils/floatingPoint';
import { getInventoryStatusV2 } from '@/utils/getInventoryStatusV2';

type AvailabilityTranslation = ReturnType<typeof useLocalization<'Inventory'>>['ByCount'];
type ComparePropsItem = {
	partNumber?: string;
	availability: ProductAvailabilityData[];
};
type CommonProps = {
	physicalStore?: StoreDetails;
	showCount: boolean;
	locale?: string;
	nls: AvailabilityTranslation;
	defaultText?: string;
};
type GetSortableDataProps = CommonProps & ComparePropsItem;
type CompareProps = CommonProps & {
	a: ComparePropsItem;
	b: ComparePropsItem;
	pickupOnly?: boolean;
};

const EMPTY = { count: 0, inStock: false };
const getEmptySortableData = (text: string) => ({
	pickup: { ...EMPTY, text },
	delivery: { ...EMPTY, text },
});

const getSortableData = ({
	partNumber,
	availability,
	locale,
	physicalStore,
	showCount,
	nls,
	defaultText = '',
}: GetSortableDataProps) => {
	if (!partNumber) {
		return getEmptySortableData(defaultText);
	}

	const { offlineStatus, offlineCount, onlineCount, onlineStatus } = getInventoryStatusV2(
		partNumber,
		availability,
		physicalStore as StoreDetails,
		showCount,
		locale
	);
	const pickup = !offlineStatus
		? nls.ForPickup.OOS.t()
		: showCount
		? nls.ForPickup.Available.t({ count: offlineCount })
		: nls.ForPickup.NoInventoryShow.t();
	const delivery = !onlineStatus
		? nls.ForDelivery.OOS.t()
		: showCount
		? nls.ForDelivery.Available.t({ count: onlineCount })
		: nls.ForDelivery.NoInventoryShow.t();

	return {
		pickup: { text: pickup, count: offlineCount, inStock: offlineStatus },
		delivery: { text: delivery, count: onlineCount, inStock: onlineStatus },
	};
};

export const compareAvailability = ({
	a,
	b,
	locale,
	physicalStore,
	showCount,
	nls,
	pickupOnly,
	defaultText,
}: CompareProps) => {
	const left = getSortableData({ ...a, locale, nls, physicalStore, showCount, defaultText });
	const right = getSortableData({ ...b, locale, nls, physicalStore, showCount, defaultText });

	let rc =
		showCount && left.pickup.inStock && right.pickup.inStock
			? dFix(left.pickup.count) - dFix(right.pickup.count)
			: left.pickup.text.localeCompare(right.pickup.text);
	if (!pickupOnly && 0 === rc) {
		rc =
			showCount && left.delivery.inStock && right.delivery.inStock
				? dFix(left.delivery.count) - dFix(right.delivery.count)
				: left.delivery.text.localeCompare(right.delivery.text);
	}
	return rc;
};
