/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { orderSummaryLabelCellSX } from '@/components/email/blocks/Order/styles/summaryLabelCell';
import { orderSummaryValueCellSX } from '@/components/email/blocks/Order/styles/summaryValueCell';
import { orderTitleSX } from '@/components/email/blocks/Order/styles/title';
import { OrderTableCell as TableCell } from '@/components/email/blocks/Table/OrderTableCell';
import { OrderTableSectionCell } from '@/components/email/blocks/Table/OrderTableSectionCell';
import { OrderEmailRow } from '@/data/types/OrderEmail';
import { formatPrice } from '@/utils/formatPrice';
import { Table, TableBody, TableRow, Typography } from '@mui/material';
import { FC } from 'react';

export const OrderSummary: FC<OrderEmailRow> = ({ localization, order, context }) => {
	const {
		OrderSummary: Label,
		OrderSubTotal,
		TotalDiscount,
		Tax,
		Shipping,
		ShippingTax,
		OrderTotal,
	} = localization;
	const { locale } = context;
	const values = [
		{
			value: order.totalProductPrice,
			currency: order.totalProductPriceCurrency,
			label: OrderSubTotal.t(),
		},
		{
			value: order.totalSalesTax,
			currency: order.totalSalesTaxCurrency,
			label: Tax.t(),
		},
		{
			value: order.totalShippingCharge,
			currency: order.totalShippingChargeCurrency,
			label: Shipping.t(),
		},
		{
			value: order.totalShippingTax,
			currency: order.totalShippingTaxCurrency,
			label: ShippingTax.t(),
		},
		{
			value: order.totalAdjustment,
			currency: order.totalAdjustmentCurrency,
			label: TotalDiscount.t(),
		},
		{
			value: order.grandTotal,
			currency: order.grandTotalCurrency,
			label: OrderTotal.t(),
		},
	];
	return (
		<>
			<TableRow>
				<OrderTableSectionCell sx={orderTitleSX}>
					<Typography variant="h2">{Label.t()}</Typography>
				</OrderTableSectionCell>
			</TableRow>
			<TableRow>
				<OrderTableSectionCell>
					<Table>
						<TableBody>
							{values.map(({ value = '', currency, label }) => (
								<TableRow key={label}>
									<TableCell sx={orderSummaryLabelCellSX}>{label}</TableCell>
									<TableCell sx={orderSummaryValueCellSX}>
										<Typography>{formatPrice(locale, currency, value)}</Typography>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</OrderTableSectionCell>
			</TableRow>
		</>
	);
};
