/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { findSkuAvailability } from '@/components/content/SkuList/parts/Table';
import { useLocalization } from '@/data/Localization';
import { STRING_TRUE } from '@/data/constants/catalog';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { SKU_LIST_TABLE_PREFIX } from '@/data/constants/product';
import { ContentContext } from '@/data/context/content';
import { useProductInfoState } from '@/data/state/useProductInfoState';
import { SkuListTableData } from '@/data/types/Product';
import { SkuListTableAuxiliaryContextValue } from '@/data/types/SkuListTable';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext } from 'react';

export const SkuListTableQuantity: FC<CellContext<SkuListTableData, unknown>> = ({ row }) => {
	const { QUANTITY } = useLocalization('productDetail');
	const { productPrice, buyable, partNumber } = row.original;
	const { store, onQuantityChange } = useContext(
		ContentContext
	) as SkuListTableAuxiliaryContextValue;
	const {
		productInfoData: {
			productInfo: { skuAndQuantities },
		},
	} = useProductInfoState();
	const { onlineStatus, offlineStatus } = findSkuAvailability(row.original, store as string);
	const priceValue = productPrice?.offer ?? 0;
	const disabled = priceValue <= 0 || buyable !== STRING_TRUE;

	return (
		<TableCellResponsiveContent label={QUANTITY.t()}>
			<NumberInput
				id={`${SKU_LIST_TABLE_PREFIX}-${partNumber}-quantity`}
				data-testid={`${SKU_LIST_TABLE_PREFIX}-${partNumber}-quantity`}
				onChange={onQuantityChange(partNumber, onlineStatus, offlineStatus)}
				value={skuAndQuantities?.[partNumber] ?? EMPTY_STRING}
				disabled={disabled}
			/>
		</TableCellResponsiveContent>
	);
};
