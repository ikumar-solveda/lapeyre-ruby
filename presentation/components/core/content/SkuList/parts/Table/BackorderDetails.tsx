/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { skuListTableBackorderStack } from '@/components/content/SkuList/styles/tableBackorderStack';
import { skuListTableBackorderTypographySX } from '@/components/content/SkuList/styles/tableBackorderTypography';
import { skuListTableExpectedDateTypographySX } from '@/components/content/SkuList/styles/tableExpectedDateTypography';
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

export const SkuListTableBackorderDetails: FC<Props> = ({ availability }) => {
	const nls = useLocalization('Inventory');
	const dateFormatter = useDateTimeFormat(EXP_DATE_OPTION);
	const date = useMemo(
		() => (availability ? getExpectedDate(availability, dateFormatter) : undefined),
		[availability, dateFormatter]
	);

	return availability ? (
		<Stack>
			<Stack {...skuListTableBackorderStack}>
				<AccessAlarmIcon fontSize="small" />
				<Typography component="span" sx={skuListTableBackorderTypographySX}>
					{nls.AvailableForBackorder.t()}
				</Typography>
			</Stack>
			<Typography sx={skuListTableExpectedDateTypographySX}>
				{nls.ByWay.Delivery.ExpectedAvailability.t({ date: date as string })}
			</Typography>
		</Stack>
	) : null;
};
