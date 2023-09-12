/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	OfflineInventoryType,
	OfflineInventoryTypeKeyType,
	OnlineInventoryType,
	OnlineInventoryTypeKeyType,
} from '@/components/content/Bundle/parts/Table/Availability';
import { bundleTableStockSX } from '@/components/content/Bundle/styles/Table/stock';
import { hasInStock } from '@/data/Content/_Inventory';
import { dFix } from '@/data/Settings';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { Circle } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import HTMLReactParser from 'html-react-parser';
import { FC } from 'react';

type Props = {
	status?: boolean;
	localization: OnlineInventoryType | OfflineInventoryType;
	inventory?: ProductAvailabilityData;
	translationKey?: OnlineInventoryTypeKeyType | OfflineInventoryTypeKeyType;
	store?: string;
};
type TranslationKey = OnlineInventoryTypeKeyType | OfflineInventoryTypeKeyType;

export const BundleTableAvailabilityStatus: FC<Props> = ({
	status,
	translationKey,
	inventory,
	localization,
	store = '',
}) =>
	status !== undefined ? (
		<Stack direction="row" spacing={1} justifyContent="flex-start">
			<Circle fontSize="small" sx={bundleTableStockSX(status)} />
			<Typography>
				{HTMLReactParser(localization[translationKey as TranslationKey].t({ store } as any))}
			</Typography>
			{hasInStock(inventory) ? (
				<Typography>{`(${dFix(inventory?.availableQuantity ?? '', 0)})`}</Typography>
			) : null}
		</Stack>
	) : null;
