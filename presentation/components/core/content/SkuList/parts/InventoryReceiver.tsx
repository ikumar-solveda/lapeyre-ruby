/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ProductImage } from '@/components/blocks/ProductImage';
import { storeInventoryDialogDetailsImageSX } from '@/components/blocks/StoreInventoryDialog/styles/details/image';
import { storeInventoryDialogDetailsPaperSX } from '@/components/blocks/StoreInventoryDialog/styles/details/paper';
import { storeInventoryDialogDetailsProductSX } from '@/components/blocks/StoreInventoryDialog/styles/details/product';
import { SkuListTable } from '@/components/content/SkuList/parts/Table';
import { useSkuListTable } from '@/data/Content/SkuListTable';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { SkuListTableAuxiliaryContextValue } from '@/data/types/SkuListTable';
import { StoreInventoryDialogContextValue } from '@/data/types/StoreInventoryDialog';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

type Props = {
	partNumber: string;
};

export const SkuListInventoryReceiver: FC<Props> = ({ partNumber }) => {
	const dialogContextValue = useContext(ContentContext) as StoreInventoryDialogContextValue;
	const { candidate } = dialogContextValue;
	const embedded = true;

	// refetch SKU data (to show candidate's availability instead of selected store's)
	const skuListData = useSkuListTable({ embedded, partNumber, physicalStore: candidate });
	const ctxValue = useMemo(
		() =>
			({
				...dialogContextValue,
				...skuListData,
				embedded,
				physicalStore: candidate,
				store: candidate.physicalStoreName,
			} as SkuListTableAuxiliaryContextValue & StoreInventoryDialogContextValue),
		[candidate, dialogContextValue, embedded, skuListData]
	);
	const { product } = ctxValue;
	const { thumbnail: src, name, shortDescription } = product;

	return (
		<ContentProvider value={ctxValue}>
			<Paper variant="outlined" sx={storeInventoryDialogDetailsPaperSX}>
				<Stack sx={storeInventoryDialogDetailsProductSX}>
					<ProductImage src={src} alt={name} sx={storeInventoryDialogDetailsImageSX} />
					<Stack>
						<Typography variant="h6" color="primary">
							{name}
						</Typography>
						<Typography>{shortDescription}</Typography>
					</Stack>
				</Stack>
				<Divider />
				<SkuListTable />
			</Paper>
		</ContentProvider>
	);
};
