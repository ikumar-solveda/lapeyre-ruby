/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { productCardBackorderMarkerStack } from '@/components/blocks/ProductCard/styles/backorderMarkerStack';
import { productCardInventoryTextSX } from '@/components/blocks/ProductCard/styles/inventoryText';
import { INVENTORY_PBC_STATUS, UNINITIALIZED_STORE } from '@/data/constants/inventory';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ProductType } from '@/data/types/Product';
import { ProductCardContextValue } from '@/data/types/ProductCard';
import { StoreDetails } from '@/data/types/Store';
import { getInventoryStatusV2 } from '@/utils/getInventoryStatusV2';
import { AccessAlarm } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

type Props = {
	product: ProductType;
};

export const ProductCardBackorderMarker: FC<Props> = ({ product }) => {
	const { localeName: locale } = useStoreLocale();
	const { sku, availability } = useContext(ContentContext) as ProductCardContextValue;
	const nls = useLocalization('Inventory');
	const { storeLocator } = useStoreLocatorState();
	const [physicalStore, setPhysicalStore] = useState<StoreDetails>(UNINITIALIZED_STORE);
	const entity = sku ?? product;
	const { online, offline } = useMemo(
		() => getInventoryStatusV2(entity?.partNumber, availability, physicalStore, false, locale),
		[availability, locale, physicalStore, entity?.partNumber]
	);
	const hasBackorder = useMemo(
		() =>
			online?.inventoryStatus === INVENTORY_PBC_STATUS.backorder ||
			offline?.inventoryStatus === INVENTORY_PBC_STATUS.backorder,
		[online, offline]
	);

	useEffect(() => {
		setPhysicalStore(storeLocator.selectedStore);
	}, [storeLocator.selectedStore]);

	return hasBackorder ? (
		<Stack {...productCardBackorderMarkerStack}>
			<AccessAlarm fontSize="small" />
			<Typography variant="caption" sx={productCardInventoryTextSX}>
				{nls.AvailableForBackorder.t()}
			</Typography>
		</Stack>
	) : null;
};
