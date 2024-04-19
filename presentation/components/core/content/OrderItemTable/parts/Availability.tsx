/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Availability } from '@/components/blocks/Availability';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

const EMPTY_VALUE: Omit<ProductAvailabilityData, 'partNumber'>[] = [];
const EMPTY_AVAILABILITY = { availability: EMPTY_VALUE, loading: true, error: false };
export const OrderItemAvailability: FC = () => {
	const localization = useLocalization('CommerceEnvironment');
	const {
		availability: {
			availability = EMPTY_VALUE,
			loading = true,
			error = false,
		} = EMPTY_AVAILABILITY,
	} = useContext(ContentContext) as OrderItemTableRowData;
	return loading ? (
		<ProgressIndicator />
	) : error || !availability ? (
		<Typography>{localization.inventoryStatus.NA.t()}</Typography>
	) : (
		<Stack>
			{availability?.map((inventory, key) => (
				<Availability key={key} availability={inventory as ProductAvailabilityData} />
			))}
		</Stack>
	);
};
