/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { bundleTableBackorderStack } from '@/components/content/Bundle/styles/Table/backorderStack';
import { bundleTableBackorderTypographySX } from '@/components/content/Bundle/styles/Table/backorderTypography';
import { bundleTableExpectedDateTypographySX } from '@/components/content/Bundle/styles/Table/expectedDateTypography';
import { EXP_DATE_OPTION } from '@/data/constants/dateTime';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { getExpectedDate } from '@/utils/getExpectedDate';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

type Props = {
	availability: ProductAvailabilityData | undefined;
};

export const BundleTableBackorderDetails: FC<Props> = ({ availability }) => {
	const nls = useLocalization('Inventory');
	const dateFormatter = useDateTimeFormat(EXP_DATE_OPTION);
	const date = useMemo(
		() => (availability ? getExpectedDate(availability, dateFormatter) : undefined),
		[availability, dateFormatter]
	);

	return availability ? (
		<Stack>
			<Stack {...bundleTableBackorderStack}>
				<AccessAlarmIcon fontSize="small" />
				<Typography component="span" sx={bundleTableBackorderTypographySX}>
					{nls.AvailableForBackorder.t()}
				</Typography>
			</Stack>
			<Typography sx={bundleTableExpectedDateTypographySX}>
				{nls.ByWay.Delivery.ExpectedAvailability.t({ date: date as string })}
			</Typography>
		</Stack>
	) : null;
};
