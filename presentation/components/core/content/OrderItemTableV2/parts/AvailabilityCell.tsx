/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { OrderItemTableV2AvailabilityLabel } from '@/components/content/OrderItemTableV2/parts/AvailabilityLabel';
import { orderItemTableV2AvailabilityCellSX } from '@/components/content/OrderItemTableV2/styles/availabilityCell';
import { orderItemTableV2RadioSX } from '@/components/content/OrderItemTableV2/styles/radio';
import { orderItemTableV2TableCellResponsiveContentSX } from '@/components/content/OrderItemTableV2/styles/tableCellResponsiveContent';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTableRow';
import { ContentContext } from '@/data/context/content';
import { useLocalization } from '@/data/Localization';
import { OrderTableData, OrderTableMeta } from '@/data/types/OrderItemTableV2';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { combineSX } from '@/utils/combineSX';
import { isFulfillmentAllowed } from '@/utils/isFulfillmentAllowed';
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { noop } from 'lodash';
import { FC, useContext } from 'react';

const EMPTY_VALUE: Omit<ProductAvailabilityData, 'partNumber'>[] = [];
const EMPTY_AVAILABILITY = { availability: EMPTY_VALUE, loading: true, error: false };
export const OrderItemTableV2AvailabilityCell: FC<
	CellContext<OrderTableData, OrderTableData['availability']>
> = ({ getValue, row, table }) => {
	const commerceLocalization = useLocalization('CommerceEnvironment');
	const localization = useLocalization('OrderItemTable');
	const { details } = useContext(ContentContext) as ReturnType<typeof useOrderItemTableRow>;
	const { pickupInStoreShipMode, deliveryShipMode } = details;
	const orderItemPhysicalStoreId = row.original.physicalStoreId ?? '';
	const {
		availability = EMPTY_VALUE,
		loading = true,
		error = false,
		onChange = noop,
	} = getValue() ?? EMPTY_AVAILABILITY;
	const { meta } = table.options;
	const { readonly = false } = (meta ?? {}) as OrderTableMeta;
	return (
		<TableCellResponsiveContent
			label={localization.Labels.Availability.t()}
			sx={combineSX([
				orderItemTableV2TableCellResponsiveContentSX,
				orderItemTableV2AvailabilityCellSX,
			])}
		>
			{loading ? (
				<ProgressIndicator padding={2} />
			) : error || !availability ? (
				<Typography>{commerceLocalization.inventoryStatus.NA.t()}</Typography>
			) : (
				<Stack>
					{readonly ? (
						availability?.length ? (
							availability.map((inventory, key) => (
								<OrderItemTableV2AvailabilityLabel
									key={key}
									availability={inventory as ProductAvailabilityData}
								/>
							))
						) : (
							<Typography>{commerceLocalization.inventoryStatus.NA.t()}</Typography>
						)
					) : (
						<RadioGroup
							aria-labelledby="availability"
							defaultValue=""
							value={orderItemPhysicalStoreId}
							name="availability-radio-buttons-group"
							onChange={onChange}
						>
							{availability?.length ? (
								availability.map((inventory, key) => (
									<FormControlLabel
										key={key}
										value={inventory.physicalStoreId ?? ''}
										control={<Radio sx={orderItemTableV2RadioSX} />}
										disabled={
											!isFulfillmentAllowed({
												availability: inventory as ProductAvailabilityData,
												pickupInStoreShipMode,
												deliveryShipMode,
											})
										}
										label={
											<OrderItemTableV2AvailabilityLabel
												availability={inventory as ProductAvailabilityData}
											/>
										}
									/>
								))
							) : (
								<Typography>{commerceLocalization.inventoryStatus.NA.t()}</Typography>
							)}
						</RadioGroup>
					)}
				</Stack>
			)}
		</TableCellResponsiveContent>
	);
};
