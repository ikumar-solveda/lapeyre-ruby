/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getProduct, getProductByKeyType } from '@/data/Content/Product';
import { getVolumePrice } from '@/data/Content/VolumePrice-Server';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { getAttrsByIdentifier } from '@/data/utils/mapProductDetailsData';
export { getAttrsByIdentifier };

export const getSkuListTable = async ({ cache, id, context }: ContentProps) => {
	const partNumber = id.toString();
	let product = await getProduct(cache, partNumber, context);
	if (product?.type === 'item' && product.parentCatalogEntryID) {
		// get parent product
		product = await getProductByKeyType(cache, 'id', product.parentCatalogEntryID, context);
	}
	const partNumbers = product?.items ? product.items.map((item) => item.partNumber) : partNumber;
	await getVolumePrice({ cache, id: partNumbers as ID, context });
};
