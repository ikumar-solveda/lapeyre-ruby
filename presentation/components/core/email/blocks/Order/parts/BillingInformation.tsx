/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { OrderAddress } from '@/components/email/blocks/Order/parts/Address';
import { orderTitleSX } from '@/components/email/blocks/Order/styles/title';
import { OrderTableBillingHeader } from '@/components/email/blocks/Table/OrderTableBillingHeader';
import { OrderTableNestedCell } from '@/components/email/blocks/Table/OrderTableNestedCell';
import { OrderTableSectionCell } from '@/components/email/blocks/Table/OrderTableSectionCell';
import { BasicAddress } from '@/data/types/Order';
import { OrderEmailRow } from '@/data/types/OrderEmail';
import { formatPrice } from '@/utils/formatPrice';
import { Table, TableBody, TableRow, Typography } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { FC } from 'react';

export const OrderBillingInformation: FC<OrderEmailRow> = ({ localization, order, context }) => {
	const { locale } = context;
	const { BillingInformation, BillingAddress, BillingMethod, Amount, NoPayments } = localization;
	const { paymentInstruction } = order;
	return (
		<>
			<TableRow>
				<OrderTableSectionCell sx={orderTitleSX}>
					<Typography variant="h2">{BillingInformation.t()}</Typography>
				</OrderTableSectionCell>
			</TableRow>
			<TableRow>
				<OrderTableSectionCell>
					{paymentInstruction?.length ? (
						<Table>
							<TableHead>
								<TableRow>
									<OrderTableBillingHeader>{BillingAddress.t()}</OrderTableBillingHeader>
									<OrderTableBillingHeader>{BillingMethod.t()}</OrderTableBillingHeader>
									<OrderTableBillingHeader>{Amount.t()}</OrderTableBillingHeader>
								</TableRow>
							</TableHead>
							<TableBody>
								{paymentInstruction.map((payment) => (
									<TableRow key={payment.piId}>
										<OrderTableNestedCell>
											<OrderAddress address={payment as BasicAddress} />
										</OrderTableNestedCell>
										<OrderTableNestedCell>
											<Typography>{payment.piDescription}</Typography>
										</OrderTableNestedCell>
										<OrderTableNestedCell>
											<Typography>
												{formatPrice(locale, payment.piCurrency, payment.piAmount)}
											</Typography>
										</OrderTableNestedCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<Typography>{NoPayments.t()}</Typography>
					)}
				</OrderTableSectionCell>
			</TableRow>
		</>
	);
};
