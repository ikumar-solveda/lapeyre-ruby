/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ProductDetailsVolumePriceBox } from '@/components/blocks/ProductDetails/parts/VolumePriceBox';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useCurrencyFormat } from '@/data/Content/CurrencyFormat';
import { useLocalization } from '@/data/Localization';
import { RangePriceItem } from '@/data/types/Price';
import { formatPrice } from '@/utils/formatPrice';
import { Typography } from '@mui/material';
import { FC, useMemo } from 'react';

type Props = {
	rangePriceItem: RangePriceItem;
};

export const VolumePriceRecord: FC<Props> = ({ rangePriceItem }) => {
	const { priceInRange, minimumQuantity, maximumQuantity } = rangePriceItem;
	const { currency, value } = priceInRange;
	const localization = useLocalization('VolumePricing');
	const router = useNextRouter();
	const locale = useMemo(() => router.locale ?? router.defaultLocale, [router]);
	const { decimalPlaces } = useCurrencyFormat();

	return (
		<ProductDetailsVolumePriceBox>
			<Typography variant="body2">
				{formatPrice(locale, currency as string, value as number, decimalPlaces)}
			</Typography>
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
		</ProductDetailsVolumePriceBox>
	);
};
