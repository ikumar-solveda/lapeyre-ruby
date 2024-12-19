/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { productCardInventoryTextSX } from '@/components/blocks/ProductCard/styles/inventoryText';
import { AVAILABLE_STATUS_ONLY, INVENTORY_PBC_STATUS } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useLocalization } from '@/data/Localization';
import type { ProductType } from '@/data/types/Product';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import type { ProductCardContextValue } from '@/data/types/ProductCard';
import type { StoreDetails } from '@/data/types/Store';
import { Typography } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import type { FC } from 'react';

type Props = {
	showCount: boolean;
	offlineCount: string;
	offline: ProductAvailabilityData;
	physicalStore: StoreDetails;
	entity: ProductType;
	onSelectStore: ProductCardContextValue['onSelectStore'];
};
export const ProductCardPickupStatus: FC<Props> = ({
	showCount,
	offline,
	offlineCount,
	physicalStore,
	entity,
	onSelectStore,
}) => {
	const nls = useLocalization('Inventory');
	const status = `${offline?.inventoryStatus}`;
	return (
		<LocalizationWithComponent
			text={
				isEmpty(physicalStore)
					? nls.ByWay.Pickup.SelectAStoreLinkable.t()
					: AVAILABLE_STATUS_ONLY[status]
					? showCount
						? nls.ByWay.Pickup.Available.t({
								count: offlineCount,
								store: physicalStore.physicalStoreName,
						  })
						: nls.ByWay.Pickup.NoInventoryShow.t({
								store: physicalStore.physicalStoreName,
						  })
					: status === INVENTORY_PBC_STATUS.backorder
					? nls.ByWay.Pickup.AvailableForBackorder.t({ store: physicalStore.physicalStoreName })
					: status === INVENTORY_PBC_STATUS.out_of_stock
					? nls.ByWay.Pickup.OOS.t({ store: physicalStore.physicalStoreName })
					: EMPTY_STRING
			}
			components={[
				<Typography key="0" component="span" sx={productCardInventoryTextSX}>
					<Linkable
						type="inline"
						data-testid="button-change-store"
						id="button-change-store"
						onClick={onSelectStore(entity.partNumber)}
					/>
				</Typography>,
			]}
		/>
	);
};
