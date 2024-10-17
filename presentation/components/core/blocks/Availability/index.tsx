/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { availabilityIcon } from '@/components/blocks/Availability/style';
import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { hasInStock } from '@/data/Content/_Inventory';
import { useStoreLocale } from '@/data/Content/StoreLocale';
import { useLocalization } from '@/data/Localization';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { dFix } from '@/utils/floatingPoint';
import { Check, RemoveCircleOutline } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

type Props = {
	availability: ProductAvailabilityData | undefined;
};
const EMPTY_AVAILABILITY = {} as ProductAvailabilityData;
export const Availability: FC<Props> = ({ availability = EMPTY_AVAILABILITY }) => {
	const { physicalStoreId, availableQuantity, storeName: store } = availability;
	const { localeName: locale } = useStoreLocale();
	const count = useMemo(
		() => Intl.NumberFormat(locale).format(dFix(availableQuantity ?? '0', 0)),
		[availableQuantity, locale]
	);
	const { Delivery, AtStore } = useLocalization('Inventory').ByCount;
	const inStock = useMemo(() => hasInStock(availability), [availability]);

	return (
		<Stack direction="row" spacing={0.5}>
			{inStock ? (
				<LocalizationWithComponent
					text={
						physicalStoreId
							? AtStore.Available.t({ count, store })
							: Delivery.Available.t({ count })
					}
					components={[
						<Check key="0" fontSize="small" sx={availabilityIcon(true)} />,
						<Typography key="1" component="span">
							<Typography variant="strong" />
						</Typography>,
					]}
				/>
			) : (
				<LocalizationWithComponent
					text={physicalStoreId ? AtStore.OOS.t({ store }) : Delivery.OOS.t()}
					components={[
						<RemoveCircleOutline key="0" fontSize="small" sx={availabilityIcon(false)} />,
						<Typography key="1" component="span">
							<Typography variant="strong" />
						</Typography>,
					]}
				/>
			)}
		</Stack>
	);
};
