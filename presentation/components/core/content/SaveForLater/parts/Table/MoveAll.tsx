/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { useSaveForLater } from '@/data/Content/SaveForLaterList';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { ProductType } from '@/data/types/Product';
import { FC, useContext, useMemo } from 'react';

const EMPTY_PRODUCTS: ProductType[] = [];
export const SaveForLaterTableMoveAll: FC = () => {
	const localization = useLocalization('SaveForLaterTable');
	const { products = EMPTY_PRODUCTS } = useContext(ContentContext) as { products: ProductType[] };
	const disabled = useMemo(
		() => products.some((product) => !product?.productPrice?.min),
		[products]
	);
	const { onMoveAll } = useSaveForLater();

	return (
		<OneClick variant="contained" onClick={onMoveAll} disabled={disabled}>
			{localization.Labels.MoveAll.t()}
		</OneClick>
	);
};
