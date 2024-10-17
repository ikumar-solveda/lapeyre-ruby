/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OrderDetailsV2Billing } from '@/components/blocks/OrderDetailsV2/parts/Billing';
import { OrderDetailsV2Delivery } from '@/components/blocks/OrderDetailsV2/parts/Delivery';
import { OrderDetailsV2Pickup } from '@/components/blocks/OrderDetailsV2/parts/Pickup';
import { OrderDetailsV2Section } from '@/components/blocks/OrderDetailsV2/parts/Section';
import { OrderDetailsV2Summary } from '@/components/blocks/OrderDetailsV2/parts/Summary';
import { OrderDetailsV2SummaryHeading } from '@/components/blocks/OrderDetailsV2/parts/SummaryHeading';
import { orderDetailsV2ActionStack } from '@/components/blocks/OrderDetailsV2/styles/actionStack';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { PurchaseOrderNumberReadonly } from '@/components/blocks/PurchaseOrderNumber/parts/Readonly';
import { OrderTable } from '@/components/content/OrderTable';
import { ReviewType, useCheckOutV2 } from '@/data/Content/CheckOutV2';
import { useLocalization } from '@/data/Localization';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Order, OrderItem } from '@/data/types/Order';
import { useForm } from '@/utils/useForm';
import {
	AccordionProps,
	Button,
	ButtonProps,
	Grid,
	Paper,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactNode, useContext, useMemo } from 'react';

type Props = {
	order: Order;
	deliveryOrderItems: OrderItem[];
	pickupOrderItems: OrderItem[];
	actions?: ButtonProps[];
	heading?: ReactNode;
	/**
	 * If true, the summary will be stacked at the bottom, otherwise it will be on the right
	 * and bottom responsively based on the screen size.
	 */
	stackSummary?: boolean;
};
const reviewData = {
	cvv: '',
};
/**
 * Order details component.
 */
export const OrderDetailsV2: React.FC<Props> = ({
	order,
	deliveryOrderItems,
	pickupOrderItems,
	actions,
	stackSummary = false,
	heading = null,
}) => {
	const orderDetailsNLS = useLocalization('OrderDetails');
	const contextValues = useContext(ContentContext) as ReturnType<typeof useCheckOutV2> & {
		toggle: () => void;
	};
	const { submit, profileUsed, poContext, toggle } = contextValues ?? {};
	const poNumber = useMemo(() => order?.buyerPONumber || poContext?.value, [order, poContext]);
	const formData = useForm<ReviewType>(reviewData);
	const { handleSubmit, formRef, submitting } = formData;
	const value = useMemo(
		() => ({
			order,
			orderItems: deliveryOrderItems.concat(pickupOrderItems),
			dataOnly: true,
			profileUsed,
			formData,
			toggle,
		}),
		[formData, order, deliveryOrderItems, pickupOrderItems, profileUsed, toggle]
	);
	const theme = useTheme();
	const lg = useMediaQuery(theme.breakpoints.up('lg'));
	const summaryAccordionProps = useMemo(
		() =>
			lg && !stackSummary
				? ({
						elevation: 0,
				  } as AccordionProps)
				: undefined,
		[lg, stackSummary]
	);

	const summaryStackProps = useMemo(
		() => ({
			elevation: lg && !stackSummary ? 4 : 0,
			component: lg && !stackSummary ? Paper : 'div',
		}),
		[lg, stackSummary]
	);

	const summaryGridProps = useMemo(
		() => (stackSummary ? { xs: 12 } : { lg: 3, xs: 12 }),
		[stackSummary]
	);
	const detailGridProps = useMemo(
		() => (stackSummary ? { xs: 12 } : { lg: 9, xs: 12 }),
		[stackSummary]
	);

	return (
		<ContentProvider value={value}>
			<Grid
				container
				spacing={3}
				component="form"
				ref={formRef}
				noValidate
				onSubmit={handleSubmit(submit)}
			>
				{!order ? (
					<ProgressIndicator />
				) : deliveryOrderItems.length === 0 && pickupOrderItems.length === 0 ? (
					<Typography variant="h5">{orderDetailsNLS.Labels.Empty.t()}</Typography>
				) : (
					<>
						<Grid item {...detailGridProps}>
							<Stack gap={3}>
								<OrderDetailsV2Section
									id="order-items"
									heading={heading}
									details={
										<OrderTable
											readonly
											deliveries={deliveryOrderItems}
											pickups={pickupOrderItems}
											orderId={order?.orderId}
											orderStatus={order?.orderStatus}
										/>
									}
								/>
								<OrderDetailsV2Pickup pickupOrderItems={pickupOrderItems} />
								<OrderDetailsV2Delivery deliveryOrderItems={deliveryOrderItems} />
								<OrderDetailsV2Section
									id="billing-info"
									heading={
										<Typography variant="h5">
											{orderDetailsNLS.Labels.PaymentDetails.t()}
										</Typography>
									}
									details={
										<>
											<PurchaseOrderNumberReadonly poNumber={poNumber} />
											<OrderDetailsV2Billing />
										</>
									}
								/>
							</Stack>
						</Grid>
						<Grid item {...summaryGridProps}>
							<Stack {...summaryStackProps}>
								<OrderDetailsV2Section
									id="order-summary"
									accordionProps={summaryAccordionProps}
									isStatic={true}
									heading={<OrderDetailsV2SummaryHeading />}
									details={<OrderDetailsV2Summary />}
								/>
								{actions?.length ? (
									<Stack {...orderDetailsV2ActionStack}>
										{actions.map((props, i) => (
											<Button key={i} {...props} disabled={submitting} />
										))}
									</Stack>
								) : null}
							</Stack>
						</Grid>
					</>
				)}
			</Grid>
		</ContentProvider>
	);
};
