/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useProduct } from '@/data/Content/Product';
import { ProductType } from '@/data/types/Product';
import { ProductDataProps } from '@/data/types/SchemaOrg';
import { createSchemaOrgMetaDataForProduct } from '@/data/utils/createSchemaOrgMetaDataForProduct';
import { useMemo } from 'react';

export const useSchemaOrgForProduct = ({ partNumber }: ProductDataProps) => {
	const { product } = useProduct({ id: partNumber });

	// inventory is currently only fetched client-side -- including it here would require a server
	//   fetch and without the server-fetch, this memoized value (when different at client) would
	//   likely generate a hydration error -- we can revisit this if we really need to
	/*
	const { availability } = useInventoryV2({ partNumber: product?.partNumber });
	const status = availability?.find((a) => a.status)?.status;
	*/

	const schema = useMemo(
		() => JSON.stringify(createSchemaOrgMetaDataForProduct(product as ProductType)),
		[product]
	);

	return { schema };
};
