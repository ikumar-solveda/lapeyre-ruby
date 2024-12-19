/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { findPrice } from '@/components/content/Bundle/parts/Table';
import { bundleTableQuantityCancelSX } from '@/components/content/Bundle/styles/Table/quantityCancel';
import { bundleTableQuantityInputSX } from '@/components/content/Bundle/styles/Table/quantityInput';
import { bundleTableQuantityStack } from '@/components/content/Bundle/styles/Table/quantityStack';
import { bundleTableRemoveSelectionSX } from '@/components/content/Bundle/styles/Table/removeSelection';
import { useLocalization } from '@/data/Localization';
import { dFix } from '@/data/Settings';
import { STRING_TRUE } from '@/data/constants/catalog';
import { ContentContext } from '@/data/context/content';
import type { BundleDetailsTableAuxiliaryContextValue } from '@/data/types/BundleDetailsTable';
import type { BundleTableRowData } from '@/data/types/Product';
import { AddCircle, Cancel } from '@mui/icons-material';
import { Button, IconButton, Stack, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { CellContext } from '@tanstack/react-table';
import { type FC, type MouseEvent, useContext } from 'react';

export const BundleTableQuantity: FC<CellContext<BundleTableRowData, unknown>> = ({ row }) => {
	const { QUANTITY, removeFromSelection, chooseQuantity } = useLocalization('productDetail');
	const { index } = row;
	const rowData = row.original;
	const { onQuantity } = useContext(ContentContext) as BundleDetailsTableAuxiliaryContextValue;
	const { quantity: q, price, buyable, selectedSku, isOneSku, partNumber: _pn } = rowData;
	const partNumber = isOneSku ? _pn : (selectedSku?.partNumber as string);
	const quantity = dFix(q, 0);
	const { value: priceValue } = findPrice(selectedSku?.price ?? price) ?? 0;
	const onHide = (_event: MouseEvent) => onQuantity(index, `${quantity > 0 ? 0 : 1}`, partNumber);
	const onQuantityChange = (quantity: number | null) =>
		onQuantity(index, `${quantity ?? 1}`, partNumber);
	const disabled = priceValue <= 0 || buyable !== STRING_TRUE;
	const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

	return (
		<TableCellResponsiveContent label={QUANTITY.t()}>
			{quantity === 0 ? (
				<Button
					data-testid={`select-attributes-${index}-link`}
					id={`select-attributes-${index}-link`}
					onClick={onHide}
					variant="outlined"
					startIcon={<AddCircle />}
				>
					{chooseQuantity.t()}
				</Button>
			) : (
				<Stack {...bundleTableQuantityStack}>
					<NumberInput
						onChange={onQuantityChange}
						value={quantity ?? 1}
						min={1}
						sx={bundleTableQuantityInputSX(`${quantity ?? 1}`.length)}
						showControls
						disallowEmptyOnBlur={true}
						disabled={disabled}
					/>
					{isMobile ? (
						<Button
							data-testid={`remove-selection-${rowData.rowNumber}-link`}
							id={`remove-selection-${rowData.rowNumber}-link`}
							onClick={onHide}
							sx={bundleTableRemoveSelectionSX}
						>
							{removeFromSelection.t()}
						</Button>
					) : (
						<Tooltip title={removeFromSelection.t()}>
							<IconButton size="large" sx={bundleTableQuantityCancelSX} onClick={onHide}>
								<Cancel />
							</IconButton>
						</Tooltip>
					)}
				</Stack>
			)}
		</TableCellResponsiveContent>
	);
};
