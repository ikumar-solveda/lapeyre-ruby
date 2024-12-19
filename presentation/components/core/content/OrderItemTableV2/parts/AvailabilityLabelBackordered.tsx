/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { LocalizationWithComponent } from '@/components/blocks/LocalizationWithComponent';
import { orderItemTableV2AvailabilityBackorderStack } from '@/components/content/OrderItemTableV2/styles/availabilityBackorderStack';
import { orderItemTableV2BackorderTypographySX } from '@/components/content/OrderItemTableV2/styles/backorderTypography';
import { EXP_DATE_OPTION } from '@/data/constants/dateTime';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { getExpectedDate } from '@/utils/getExpectedDate';
import { AccessAlarm } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { type FC, useMemo } from 'react';

type Props = {
	availability: ProductAvailabilityData;
};

export const OrderItemTableV2AvailabilityLabelBackordered: FC<Props> = ({ availability }) => {
	const nls = useLocalization('OrderItemTable');
	const pickup = !!availability?.physicalStoreId;
	const formatter = useDateTimeFormat(EXP_DATE_OPTION);
	const date = useMemo(() => getExpectedDate(availability, formatter), [availability, formatter]);

	return (
		<Stack>
			<Stack {...orderItemTableV2AvailabilityBackorderStack}>
				<LocalizationWithComponent
					text={nls.Availability[pickup ? 'PickupBackorder' : 'DeliveryBackorder'].t()}
					components={[<AccessAlarm key="0" fontSize="small" />]}
				/>
			</Stack>
			<Typography sx={orderItemTableV2BackorderTypographySX}>
				{nls.Fulfillment.ExpectedDate.t({ date })}
			</Typography>
		</Stack>
	);
};
