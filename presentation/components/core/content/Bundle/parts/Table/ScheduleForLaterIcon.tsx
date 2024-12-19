/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import type { BundleDetailsTableAuxiliaryContextValue } from '@/data/types/BundleDetailsTable';
import type { BundleTableRowData } from '@/data/types/Product';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IconButton } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { type FC, useContext, useMemo } from 'react';

export const BundleTableScheduleForLaterIcon: FC<CellContext<BundleTableRowData, unknown>> = ({
	row,
}) => {
	const { showAttributes } = useLocalization('productDetail');
	const { rowNumber } = row.original;
	const { onScheduleForLaterIconClick, getAvailabilityDetailsForSKU } = useContext(
		ContentContext
	) as BundleDetailsTableAuxiliaryContextValue;
	const futureOrderable = useMemo(
		() =>
			!!getAvailabilityDetailsForSKU(rowNumber)?.pbcData?.fulfillmentCenter
				.availableToPromiseDateTime,
		[getAvailabilityDetailsForSKU, rowNumber]
	);

	return futureOrderable ? (
		<TableCellResponsiveContent label={showAttributes.t()}>
			<IconButton
				aria-expanded="false"
				aria-label="row"
				size="medium"
				color="primary"
				onClick={onScheduleForLaterIconClick(rowNumber)}
			>
				<AccessTimeIcon />
			</IconButton>
		</TableCellResponsiveContent>
	) : null;
};
