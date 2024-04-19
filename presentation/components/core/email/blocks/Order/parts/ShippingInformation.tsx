/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { OrderItems } from '@/components/email/blocks/Order/parts/Items';
import { OrderShippingInformationByAddressAndMethod } from '@/components/email/blocks/Order/parts/ShippingInformationByAddressAndMethod';
import { orderTitleSX } from '@/components/email/blocks/Order/styles/title';
import { OrderTableSectionCell } from '@/components/email/blocks/Table/OrderTableSectionCell';
import { OrderEmailRow, StringBoolean } from '@/data/types/OrderEmail';
import { TableRow, Typography } from '@mui/material';
import { groupBy } from 'lodash';
import { FC, Fragment } from 'react';

export const OrderShippingInformation: FC<OrderEmailRow> = ({
	cache,
	localization,
	order,
	context,
}) => {
	const { ShippingInformation, ShipAsComplete } = localization;
	const { orderItem } = order;
	const groups = groupBy(orderItem, (item) => `${item.addressId}_${item.shipModeId}`);
	return (
		<>
			<TableRow>
				<OrderTableSectionCell sx={orderTitleSX}>
					<Typography variant="h2">{ShippingInformation.t()}</Typography>
				</OrderTableSectionCell>
			</TableRow>
			<TableRow>
				<OrderTableSectionCell>
					<Typography variant="h3">{ShipAsComplete.t()}</Typography>
					<Typography>
						{localization[`String_${order.shipAsComplete}` as StringBoolean].t()}
					</Typography>
				</OrderTableSectionCell>
			</TableRow>
			{Object.entries(groups).map(([key, orderItems]) => (
				<Fragment key={key}>
					<OrderShippingInformationByAddressAndMethod
						localization={localization}
						order={order}
						context={context}
						orderItems={orderItems}
						cache={cache}
					/>
					<OrderItems
						localization={localization}
						order={order}
						context={context}
						orderItems={orderItems}
						cache={cache}
					/>
				</Fragment>
			))}
		</>
	);
};
