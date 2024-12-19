/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	REQUESTED_DATE_FORMAT_OPTION,
	REQUESTED_DATE_TIME_FORMAT_OPTION,
} from '@/data/constants/dateTime';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { Typography } from '@mui/material';
import { FC, useMemo } from 'react';

type Props = {
	date?: string;
	isDelivery: boolean;
};
const getFormat = (isDelivery = false) =>
	isDelivery ? REQUESTED_DATE_FORMAT_OPTION : REQUESTED_DATE_TIME_FORMAT_OPTION;

export const OrderItemTableV2RequestedDate: FC<Props> = ({ date = '', isDelivery }) => {
	const localization = useLocalization('OrderItemTable');
	const formatter = useDateTimeFormat(getFormat(isDelivery));
	const requestedDate = useMemo(() => formatter.format(new Date(date)), [formatter, date]);

	return (
		<Typography variant="caption">
			{localization.Labels[isDelivery ? 'RequestedDelivery' : 'RequestedPickup'].t({
				date: requestedDate,
			})}
		</Typography>
	);
};
