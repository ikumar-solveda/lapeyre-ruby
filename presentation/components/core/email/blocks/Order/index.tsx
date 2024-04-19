/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { OrderBillingInformation } from '@/components/email/blocks/Order/parts/BillingInformation';
import { OrderInfo } from '@/components/email/blocks/Order/parts/Info';
import { OrderShippingInformation } from '@/components/email/blocks/Order/parts/ShippingInformation';
import { OrderSummary } from '@/components/email/blocks/Order/parts/Summary';
import { getOrderHistoryDetails } from '@/data/Content/OrderHistoryDetails-Server';
import { getTypedLocalization } from '@/data/Localization-Server';
import { ServerPageProps } from '@/data/types/AppRouter';
import { Table, TableBody } from '@mui/material';
import { notFound } from 'next/navigation';
import { FC } from 'react';

export const Order: FC<ServerPageProps> = async ({ context, cache, searchParams }) => {
	const { orderId } = searchParams as Record<string, string>;
	const localization = (
		await getTypedLocalization(cache, context.locale as string, 'EmailTemplate')
	).Order;

	let order;
	try {
		order = await getOrderHistoryDetails({ orderId, context, cache });
	} catch (e) {
		return notFound();
	}

	return (
		<Table>
			<TableBody>
				<OrderInfo localization={localization} order={order} context={context} cache={cache} />
				<OrderShippingInformation
					localization={localization}
					order={order}
					context={context}
					cache={cache}
				/>
				<OrderBillingInformation
					localization={localization}
					order={order}
					context={context}
					cache={cache}
				/>
				<OrderSummary localization={localization} order={order} context={context} cache={cache} />
			</TableBody>
		</Table>
	);
};
