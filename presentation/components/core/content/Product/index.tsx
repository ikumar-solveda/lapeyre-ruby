/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ProductCard } from '@/components/blocks/ProductCard';
import { useProduct } from '@/data/Content/Product';
import { useUser } from '@/data/User';
import { ContentContext } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { ProductType } from '@/data/types/Product';
import { getContractIdFromContext } from '@/utils/getContractIdFromContext';
import { FC, useContext, useEffect } from 'react';

export const Product: FC<{
	partNumber: string;
	clickAction?: () => void;
}> = ({ partNumber, clickAction }) => {
	const { rawData, product, loading } = useProduct({ id: partNumber });
	const { user } = useUser();
	const contract = getContractIdFromContext(user?.context);
	const { onNotify } = useContext(ContentContext) as {
		onNotify: (id: ID, contract: string, product?: ProductType) => void;
	};

	useEffect(() => {
		if (onNotify && rawData) {
			onNotify(partNumber, contract, product);
		}
	}, [loading, rawData, product]); // eslint-disable-line react-hooks/exhaustive-deps

	return loading || !product ? null : (
		<ProductCard product={product} clickAction={clickAction}></ProductCard>
	);
};
