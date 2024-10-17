/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OneClick } from '@/components/blocks/OneClick';
import { SaveForLaterTableRowData } from '@/components/content/SaveForLater/parts/Table';
import { saveForLaterMoveToCartButtonWidthSX } from '@/components/content/SaveForLater/styles/moveToCartButtonWidth';
import { useSaveForLater } from '@/data/Content/SaveForLaterList';
import { useSaveForLaterTableRow } from '@/data/Content/SaveForLaterTableRow';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { FC, useContext } from 'react';

export const SaveForLaterTableMoveToCart: FC = () => {
	const localization = useLocalization('SaveForLaterTable');
	const { product } = useContext(ContentContext) as SaveForLaterTableRowData &
		ReturnType<typeof useSaveForLaterTableRow>;
	const { partNumber, productPrice } = product;

	const { onMoveToCart } = useSaveForLater();

	return (
		<OneClick
			sx={saveForLaterMoveToCartButtonWidthSX}
			variant="outlined"
			onClick={onMoveToCart(partNumber)}
			disabled={!productPrice?.min}
		>
			{localization.Labels.MoveToCart.t()}
		</OneClick>
	);
};
