/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { OrderAddress } from '@/components/email/blocks/Order/parts/Address';
import { OrderTableCell as TableCell } from '@/components/email/blocks/Table/OrderTableCell';
import { OrderTableSectionCell } from '@/components/email/blocks/Table/OrderTableSectionCell';
import { BasicAddress } from '@/data/types/Order';
import { OrderEmailShippingRow } from '@/data/types/OrderEmail';
import { Table, TableBody, TableRow, Typography } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { FC } from 'react';

export const OrderShippingInformationByAddressAndMethod: FC<OrderEmailShippingRow> = ({
	localization,
	orderItems,
}) => {
	const { ShippingAddress, NoItems, ShippingMethod } = localization;
	return (
		<TableRow>
			<OrderTableSectionCell>
				{orderItems?.length ? (
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									<Typography variant="h3">{ShippingAddress.t()}</Typography>
								</TableCell>
								<TableCell>
									<Typography variant="h3"> {ShippingMethod.t()}</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>
									<OrderAddress address={orderItems[0] as BasicAddress} />
								</TableCell>
								<TableCell>
									<Typography>{orderItems[0]?.shipModeDescription}</Typography>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				) : (
					<Typography>{NoItems.t()}</Typography>
				)}
			</OrderTableSectionCell>
		</TableRow>
	);
};
