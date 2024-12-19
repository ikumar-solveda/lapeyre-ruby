/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { orderItemTableV2BackorderStack } from '@/components/content/OrderItemTableV2/styles/backorderStack';
import { orderItemTableV2BackorderTextSX } from '@/components/content/OrderItemTableV2/styles/backorderText';
import { orderItemTableV2BackorderTypographySX } from '@/components/content/OrderItemTableV2/styles/backorderTypography';
import { useLocalization } from '@/data/Localization';
import type { OrderTableData } from '@/data/types/OrderItemTableV2';
import { AccessAlarm } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import type { FC } from 'react';

interface Props {
	expectedDate: string;
	type: OrderTableData['fulfillment']['type'];
	physicalStoreExternalId: string | undefined;
}

export const OrderItemTableV2FulfillmentBackorder: FC<Props> = ({
	expectedDate: date,
	type,
	physicalStoreExternalId: store = '',
}) => {
	const nls = useLocalization('OrderItemTable');
	return (
		<Stack>
			<Stack {...orderItemTableV2BackorderStack}>
				<AccessAlarm fontSize="small" />
				<Typography sx={orderItemTableV2BackorderTextSX}>
					{type === 'pickup'
						? nls.Fulfillment.BackorderedPickup.t({ store })
						: nls.Fulfillment.Backordered.t()}
				</Typography>
			</Stack>
			<Typography sx={orderItemTableV2BackorderTypographySX}>
				{nls.Fulfillment.ExpectedDate.t({ date })}
			</Typography>
		</Stack>
	);
};
