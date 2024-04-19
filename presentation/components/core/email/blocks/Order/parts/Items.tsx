/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { OrderTableNestedCell } from '@/components/email/blocks/Table/OrderTableNestedCell';
import { OrderTableNestedHeader } from '@/components/email/blocks/Table/OrderTableNestedHeader';
import { OrderTableSectionCell } from '@/components/email/blocks/Table/OrderTableSectionCell';
import { getProduct } from '@/data/Content/Product-Server';
import { getDateTimeFormat } from '@/data/Content/_DateTimeFormatter-Server';
import { OrderEmailShippingRow, StringBoolean } from '@/data/types/OrderEmail';
import { formatPrice } from '@/utils/formatPrice';
import { Table, TableBody, TableRow, Typography } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { keyBy } from 'lodash';
import { FC } from 'react';

export const OrderItems: FC<OrderEmailShippingRow> = async ({
	localization,
	orderItems,
	context,
	cache,
}) => {
	const { locale } = context;
	const formatter = getDateTimeFormat(locale as string);
	const {
		Products,
		ItemShippingInfo,
		Item,
		Expedited,
		ShippingInstructions,
		RequestedShippingDate,
		Quantity,
		Each,
		Total,
		NoItems,
		SKU,
	} = localization;
	const products = orderItems.map(({ partNumber }) => getProduct(cache, partNumber, context));
	const byPartNumber = keyBy(await Promise.all(products), 'partNumber');

	return (
		<>
			<TableRow>
				<OrderTableSectionCell>
					<Typography variant="h3">{Products.t()}</Typography>
				</OrderTableSectionCell>
			</TableRow>
			<TableRow>
				<OrderTableSectionCell>
					{orderItems?.length ? (
						<Table>
							<TableHead>
								<TableRow>
									<OrderTableNestedHeader>{Item.t()}</OrderTableNestedHeader>
									<OrderTableNestedHeader>{ItemShippingInfo.t()}</OrderTableNestedHeader>
									<OrderTableNestedHeader>{Quantity.t()}</OrderTableNestedHeader>
									<OrderTableNestedHeader>{Each.t()}</OrderTableNestedHeader>
									<OrderTableNestedHeader>{Total.t()}</OrderTableNestedHeader>
								</TableRow>
							</TableHead>
							<TableBody>
								{orderItems.map((item) => (
									<TableRow key={item.orderItemId}>
										<OrderTableNestedCell>
											<Typography>{byPartNumber[item.partNumber]?.name}</Typography>
											<Typography>{SKU.t([item.partNumber])}</Typography>
										</OrderTableNestedCell>
										<OrderTableNestedCell>
											<Typography>
												{RequestedShippingDate.t([
													formatter.format(new Date(item.expectedShipDate)),
												])}
											</Typography>
											<Typography>
												{Expedited.t([
													localization[`String_${item.isExpedited}` as StringBoolean].t(),
												])}
											</Typography>
											{item.shipInstruction ? (
												<Typography>{ShippingInstructions.t([item.shipInstruction])}</Typography>
											) : null}
										</OrderTableNestedCell>
										<OrderTableNestedCell>
											<Typography>{item.quantity}</Typography>
										</OrderTableNestedCell>
										<OrderTableNestedCell>
											<Typography>{formatPrice(locale, item.currency, item.unitPrice)}</Typography>
										</OrderTableNestedCell>
										<OrderTableNestedCell>
											<Typography>
												{formatPrice(locale, item.currency, item.orderItemPrice)}
											</Typography>
										</OrderTableNestedCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<Typography>{NoItems.t()}</Typography>
					)}
				</OrderTableSectionCell>
			</TableRow>
		</>
	);
};
