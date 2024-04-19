/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { orderTitleSX } from '@/components/email/blocks/Order/styles/title';
import { OrderTableSectionCell } from '@/components/email/blocks/Table/OrderTableSectionCell';
import { getDateTimeFormat } from '@/data/Content/_DateTimeFormatter-Server';
import { OrderEmailRow } from '@/data/types/OrderEmail';
import { TableRow, Typography } from '@mui/material';
import { FC } from 'react';

export const OrderInfo: FC<OrderEmailRow> = ({ localization, order, context }) => {
	const { locale } = context;
	const formatter = getDateTimeFormat(locale as string);
	const { OrderNumber, OrderPlacedDate, OrderDetailsTitle } = localization;
	return (
		<>
			<TableRow>
				<OrderTableSectionCell sx={orderTitleSX}>
					<Typography variant="h1">{OrderDetailsTitle.t()}</Typography>
				</OrderTableSectionCell>
			</TableRow>
			<TableRow>
				<OrderTableSectionCell>
					<Typography variant="h3">{OrderNumber.t()}</Typography>
					<Typography>{order.orderId}</Typography>
				</OrderTableSectionCell>
			</TableRow>
			<TableRow>
				<OrderTableSectionCell>
					<Typography variant="h3">{OrderPlacedDate.t()}</Typography>
					<Typography>{formatter.format(new Date(order.placedDate))}</Typography>
				</OrderTableSectionCell>
			</TableRow>
		</>
	);
};
