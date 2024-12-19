/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { findPrice } from '@/components/content/Bundle/parts/Table';
import { DEFAULT_SINGLE_RECORD } from '@/data/constants/price';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { BundleDetailsTableAuxiliaryContextValue } from '@/data/types/BundleDetailsTable';
import { BundleTableRowData } from '@/data/types/Product';
import { getRangePriceRecord } from '@/utils/getVolumePrice';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const BundleTablePrice: FC<CellContext<BundleTableRowData, unknown>> = ({ row }) => {
	const { onVolumePriceDialog, entitledPriceList } = useContext(
		ContentContext
	) as BundleDetailsTableAuxiliaryContextValue;
	const productDetailNLS = useLocalization('productDetail');
	const priceDisplayNLS = useLocalization('PriceDisplay');
	const localization = useLocalization('VolumePricing');
	const rowData = row.original;
	const { selectedSku, isOneSku, partNumber: _pn, price } = rowData;
	const partNumber = isOneSku ? _pn : (selectedSku?.partNumber as string);

	const { rangePriceList } = useMemo(
		() => getRangePriceRecord(entitledPriceList, partNumber),
		[partNumber, entitledPriceList]
	);
	const { value: disp, currency } = findPrice(selectedSku?.price ?? price);

	return (
		<TableCellResponsiveContent label={productDetailNLS.Price.t()}>
			<Typography variant="h6" data-testid="offer-price" id="offer-price">
				{disp ? (
					<PriceDisplay currency={currency as string} min={disp} />
				) : (
					priceDisplayNLS.Labels.Pending.t()
				)}
			</Typography>
			{rangePriceList?.length > DEFAULT_SINGLE_RECORD ? (
				<Linkable
					type="inline"
					id="button-volume-pricing"
					data-testid="button-volume-pricing"
					aria-label="button-volume-pricing"
					onClick={onVolumePriceDialog(partNumber)}
				>
					{localization.title.t()}
				</Linkable>
			) : null}
		</TableCellResponsiveContent>
	);
};
