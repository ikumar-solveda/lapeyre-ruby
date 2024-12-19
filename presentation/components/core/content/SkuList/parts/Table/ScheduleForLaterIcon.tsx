/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { SkuListTableData } from '@/data/types/Product';
import { SkuListTableAuxiliaryContextValue } from '@/data/types/SkuListTable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IconButton } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const SkuListTableScheduleForLaterIcon: FC<CellContext<SkuListTableData, unknown>> = ({
	row,
}) => {
	const { showAttributes } = useLocalization('productDetail');
	const { partNumber } = row.original;
	const { onScheduleForLaterIconClick, getAvailabilityDetailsForSKU } = useContext(
		ContentContext
	) as SkuListTableAuxiliaryContextValue;
	const futureOrderable = useMemo(
		() =>
			!!getAvailabilityDetailsForSKU(partNumber)?.pbcData?.fulfillmentCenter
				.availableToPromiseDateTime,
		[getAvailabilityDetailsForSKU, partNumber]
	);

	return futureOrderable ? (
		<TableCellResponsiveContent label={showAttributes.t()}>
			<IconButton
				aria-expanded="false"
				aria-label="row"
				size="medium"
				color="primary"
				onClick={onScheduleForLaterIconClick(partNumber)}
			>
				<AccessTimeIcon />
			</IconButton>
		</TableCellResponsiveContent>
	) : null;
};
