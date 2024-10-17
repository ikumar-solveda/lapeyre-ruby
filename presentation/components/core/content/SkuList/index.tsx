/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductDetailsAddToCart } from '@/components/blocks/ProductDetails/AddToCart';
import { StoreInventoryDialogSelectStore } from '@/components/blocks/StoreInventoryDialog/parts/SelectStore';
import { SkuListInventoryReceiver } from '@/components/content/SkuList/parts/InventoryReceiver';
import { SkuListTable } from '@/components/content/SkuList/parts/Table';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { UNINITIALIZED_STORE } from '@/data/constants/inventory';
import { ContentProvider } from '@/data/context/content';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { ID } from '@/data/types/Basic';
import { SkuListTableAuxiliaryContextValue } from '@/data/types/SkuListTable';
import { StoreDetails } from '@/data/types/Store';
import { StoreInventoryDialogStateContextValue } from '@/data/types/StoreInventoryDialog';
import { Paper, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

export const SkuList: FC<{ id: ID }> = ({ id }) => {
	const { storeLocator } = useStoreLocatorState();
	const [store, setStore] = useState<StoreDetails>(UNINITIALIZED_STORE);

	const skuListData = useSkuListTable({
		partNumber: id.toString(),
		physicalStoreName: store?.physicalStoreName ?? '',
		physicalStore: store,
	});
	const { product, isLoading } = skuListData;
	const {
		dimensions: { contentSpacing },
	} = useTheme();
	const [dialogState, setDialogState] = useState<boolean>(false);
	const onDialog = useCallback(() => setDialogState((prev) => !prev), []);

	useEffect(() => {
		setStore(storeLocator.selectedStore);
	}, [storeLocator.selectedStore]);

	const ctxValue = useMemo(
		() =>
			({
				...skuListData,
				physicalStore: store,
				store: store.physicalStoreName,
				dialogState,
				onDialog,
			} as SkuListTableAuxiliaryContextValue & StoreInventoryDialogStateContextValue),
		[dialogState, onDialog, skuListData, store]
	);

	return skuListData.product?.partNumber ? (
		<Stack gap={contentSpacing}>
			<StoreInventoryDialogSelectStore
				isLoading={isLoading}
				current={store}
				product={product}
				dialogState={dialogState}
				onDialog={onDialog}
			>
				<SkuListInventoryReceiver partNumber={id as string} />
			</StoreInventoryDialogSelectStore>
			<ContentProvider value={ctxValue}>
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
