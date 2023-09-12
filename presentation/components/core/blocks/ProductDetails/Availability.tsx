/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useProductDetails } from '@/data/Content/ProductDetails';
import { useLocalization } from '@/data/Localization';
import { ContentContext } from '@/data/context/content';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { parseHTML } from '@/utils/parseHTML';
import { Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';

const EMPTY_AVAILABILITY: ProductAvailabilityData[] = [];

export const ProductDetailsAvailability: FC = () => {
	const localization = useLocalization('CommerceEnvironment');
	const prodLoc = useLocalization('productDetail');
	const { availability = EMPTY_AVAILABILITY } = useContext(ContentContext) as ReturnType<
		typeof useProductDetails
	>;

	return (
		<Stack spacing={0.5}>
			<Typography variant="body2">{prodLoc.Availability.t()}</Typography>
			{availability.length === 0 ? (
				<Typography data-testid="not-available" id="not-available">
					{localization.inventoryStatus.NA.t()}
				</Typography>
			) : (
				availability.map(
					({ physicalStoreId, status, physicalStoreStatus, partNumber, storeName: store }) => (
						<Typography
							key={`${partNumber} in ${store}`}
							data-testid={`${partNumber} in ${store}`}
							id={`${partNumber} in ${store}`}
						>
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
					)
				)
			)}
		</Stack>
	);
};
