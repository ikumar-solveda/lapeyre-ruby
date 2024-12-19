/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useCurrencyFormat } from '@/data/Content/CurrencyFormat';
import { useLocalization } from '@/data/Localization';
import { RangePriceItem } from '@/data/types/Price';
import { formatPrice } from '@/utils/formatPrice';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useMemo } from 'react';

export const VolumePriceDialogTablePricePerItem: FC<CellContext<RangePriceItem, unknown>> = ({
	row,
}) => {
	const { priceInRange } = row.original;
	const { currency, value } = priceInRange;
	const localization = useLocalization('VolumePricingDialog');
	const router = useNextRouter();
	const locale = useMemo(() => router.locale ?? router.defaultLocale, [router]);
	const { decimalPlaces } = useCurrencyFormat();

	return (
		<TableCellResponsiveContent label={localization.Labels.PricePerItem.t()}>
			<Typography>
				{formatPrice(locale, currency as string, value as number, decimalPlaces)}
			</Typography>
		</TableCellResponsiveContent>
	);
};
