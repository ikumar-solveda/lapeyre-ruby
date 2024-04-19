/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductDetailsAddToCart } from '@/components/blocks/ProductDetails/AddToCart';
import { SkuListTable } from '@/components/content/SkuList/parts/Table';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { UNINITIALIZED_STORE } from '@/data/constants/inventory';
import { ContentProvider } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ID } from '@/data/types/Basic';
import { StoreDetails } from '@/data/types/Store';
import { Paper, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';

export const SkuList: FC<{ id: ID }> = ({ id }) => {
	const { storeLocator } = useStoreLocatorState();
	const [store, setStore] = useState<StoreDetails>(UNINITIALIZED_STORE);
	const skuListData = useSkuListTable({
		partNumber: id.toString(),
		physicalStoreName: store?.physicalStoreName ?? '',
		physicalStore: store,
	});
	const {
		dimensions: { contentSpacing },
	} = useTheme();

	useEffect(() => {
		setStore(storeLocator.selectedStore);
	}, [storeLocator.selectedStore]);

	return skuListData.product?.partNumber ? (
		<Stack gap={contentSpacing}>
			<ContentProvider
				value={{ ...skuListData, store: store?.physicalStoreName, physicalStore: store }}
			>
				<Paper>
					<SkuListTable />
				</Paper>
				<Stack direction="row" justifyContent="flex-end">
					<ProductDetailsAddToCart />
				</Stack>
			</ContentProvider>
		</Stack>
	) : null;
};
