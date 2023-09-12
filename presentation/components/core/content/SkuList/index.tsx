/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductDetailsAddToCart } from '@/components/blocks/ProductDetails/AddToCart';
import { SkuListTable } from '@/components/content/SkuList/parts/Table';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentProvider } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ID } from '@/data/types/Basic';
import { Paper, Stack, useTheme } from '@mui/material';
import { FC, useEffect, useState } from 'react';

export const SkuList: FC<{ id: ID }> = ({ id }) => {
	const { storeLocator } = useStoreLocatorState();
	const [store, setStore] = useState<string>('');
	const skuListData = useSkuListTable({ partNumber: id.toString(), physicalStoreName: store });
	const {
		dimensions: { contentSpacing },
	} = useTheme();

	useEffect(() => {
		setStore(storeLocator.selectedStore?.physicalStoreName ?? '');
	}, [storeLocator.selectedStore]);

	return skuListData.product?.partNumber ? (
		<Stack gap={contentSpacing}>
			<ContentProvider value={{ ...skuListData, store }}>
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
