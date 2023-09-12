/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

// import { OrderTotalSummary } from '../order-total-summary';
// import { OrderDiscountSummary } from '../order-discount-summary';
import { Button, ButtonProps, Stack, Typography } from '@mui/material';
import { useLocalization } from '@/data/Localization';
import { OrderDetailsBilling } from '@/components/blocks/OrderDetails/parts/Billing';
import { OrderDetailsShipping } from '@/components/blocks/OrderDetails/parts/Shipping';
import { OrderDetailsOrderSummary } from '@/components/blocks/OrderDetails/parts/OrderSummary';
import { OrderDetailsSection } from '@/components/blocks/OrderDetails/parts/Section';
import { Order, OrderItem } from '@/data/types/Order';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { ReviewType, useCheckOut } from '@/data/Content/CheckOut';
import { useForm } from '@/utils/useForm';
import { useContext } from 'react';
import { PurchaseOrderNumber } from '@/components/blocks/PurchaseOrderNumber';

type Props = {
	order: Order;
	orderItems: OrderItem[];
	actions?: ButtonProps[];
	showHeading?: boolean;
};
const reviewData = {
	cvv: '',
};
export const OrderDetails: React.FC<Props> = ({
	order,
	orderItems,
	actions,
	showHeading = true,
}) => {
	const labels = useLocalization('OrderDetails').Labels;
	const checkoutValues = useContext(ContentContext) as ReturnType<typeof useCheckOut>;
	const { submit, profileUsed, poContext, poRequired } = checkoutValues ?? {};
	const formData = useForm<ReviewType>(reviewData);
	const { handleSubmit, formRef, submitting } = formData;
	return (
		<ContentProvider
			value={{ order, orderItems, dataOnly: true, profileUsed, formData, poContext, poRequired }}
		>
			<Stack spacing={2} component="form" ref={formRef} noValidate onSubmit={handleSubmit(submit)}>
				{!orderItems || !order ? (
					<ProgressIndicator />
				) : !orderItems.length ? (
					<Typography variant="h5">{labels.Empty.t()}</Typography>
				) : (
					<>
						<OrderDetailsShipping showHeading={showHeading} />
						<OrderDetailsSection
							id="billing-info"
							heading={<Typography variant="h4">{labels.PaymentDetails.t()}</Typography>}
							details={
								<>
									<PurchaseOrderNumber readOnly={true} />
									<OrderDetailsBilling />
								</>
							}
						/>
						<OrderDetailsSection
							id="order-summary"
							isStatic={true}
							heading={<Typography variant="h4">{labels.OrderSummary.t()}</Typography>}
							details={<OrderDetailsOrderSummary />}
						/>
						{actions?.length ? (
							<Stack
								direction={{ xs: 'column', sm: 'row' }}
								justifyContent="space-between"
								spacing={1}
							>
								{actions.map((props, i) => (
									<Button key={i} {...{ ...props, disabled: submitting }} />
								))}
							</Stack>
						) : null}
					</>
				)}
			</Stack>
		</ContentProvider>
	);
};
