/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext } from 'react';
import { Stack, Typography } from '@mui/material';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useLocalization } from '@/data/Localization';
import { parseHTML } from '@/utils/parseHTML';
import { ContentContext } from '@/data/context/content';
import { OrderItemTableRowData } from '@/components/content/OrderItemTable/parts/Table';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';

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
	if (loading) {
		return <ProgressIndicator />;
	}
	if (error || !availability) {
		return <Typography>{'Inventory unavailable'}</Typography>;
	}

	return (
		<Stack>
			{availability?.map(({ physicalStoreId, status, physicalStoreStatus, storeName: store }) => (
				<Typography key={store} data-testid={store} id={store}>
					{parseHTML(
						physicalStoreId
							? physicalStoreStatus
								? localization.inventoryStatusStore.Available.t({ store })
								: localization.inventoryStatusStore.OOS.t({ store })
							: status
							? localization.inventoryStatusOnline.Available.t()
							: localization.inventoryStatusOnline.OOS.t()
					)}
				</Typography>
			))}
		</Stack>
	);
};
