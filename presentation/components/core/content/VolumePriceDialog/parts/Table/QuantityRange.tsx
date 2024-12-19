/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { RangePriceItem } from '@/data/types/Price';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const VolumePriceDialogTableQuantityRange: FC<CellContext<RangePriceItem, unknown>> = ({
	row,
}) => {
	const { minimumQuantity, maximumQuantity } = row.original;
	const localization = useLocalization('VolumePricingDialog');

	return (
		<TableCellResponsiveContent label={localization.Labels.QuantityRange.t()}>
			<Typography>
				{minimumQuantity && maximumQuantity
					? localization.minimumToMaximum.t({
							min: minimumQuantity?.value as number,
							max: maximumQuantity?.value as number,
					  })
					: localization.minimumAndAbove.t({
							min: minimumQuantity?.value as number,
					  })}
			</Typography>
		</TableCellResponsiveContent>
	);
};
