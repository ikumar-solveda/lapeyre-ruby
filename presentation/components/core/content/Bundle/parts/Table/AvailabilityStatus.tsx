/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { Availability } from '@/components/blocks/Availability';
import {
	OfflineInventoryType,
	OfflineInventoryTypeKeyType,
	OnlineInventoryType,
	OnlineInventoryTypeKeyType,
} from '@/components/content/Bundle/parts/Table/Availability';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { FC } from 'react';

type Props = {
	status?: boolean;
	localization: OnlineInventoryType | OfflineInventoryType;
	inventory?: ProductAvailabilityData;
	translationKey?: OnlineInventoryTypeKeyType | OfflineInventoryTypeKeyType;
	store?: string;
};

/**
 * @deprecated in favour of `<AvailabilityStatusV2>`
 */
export const BundleTableAvailabilityStatus: FC<Props> = ({ status, inventory }) =>
	status !== undefined ? <Availability availability={inventory} /> : null;
