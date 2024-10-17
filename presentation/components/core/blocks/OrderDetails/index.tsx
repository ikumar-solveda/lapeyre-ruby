/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { OrderDetailsBilling } from '@/components/blocks/OrderDetails/parts/Billing';
import { OrderDetailsOrderSummary } from '@/components/blocks/OrderDetails/parts/OrderSummary';
import { OrderDetailsSection } from '@/components/blocks/OrderDetails/parts/Section';
import { OrderDetailsSectionHeading } from '@/components/blocks/OrderDetails/parts/SectionHeading';
import { OrderDetailsShipping } from '@/components/blocks/OrderDetails/parts/Shipping';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { PurchaseOrderNumber } from '@/components/blocks/PurchaseOrderNumber';
import { ReviewType, useCheckOut } from '@/data/Content/CheckOut';
import { useLocalization } from '@/data/Localization';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Order, OrderItem } from '@/data/types/Order';
import { useForm } from '@/utils/useForm';
import { Button, ButtonProps, Stack, Typography } from '@mui/material';
import { useContext } from 'react';

type Props = {
	order: Order;
	orderItems: OrderItem[];
	actions?: ButtonProps[];
	showHeading?: boolean;
};
const reviewData = {
	cvv: '',
};
/**
 * @deprecated use OrderDetailsV2 instead
 */
export const OrderDetails: React.FC<Props> = ({
	order,
	orderItems,
	actions,
	showHeading = true,
}) => {
	const labels = useLocalization('OrderDetails').Labels;
	const contextValues = useContext(ContentContext) as ReturnType<typeof useCheckOut> & {
		toggle: () => void;
	};
	const { submit, profileUsed, poContext, poRequired, toggle } = contextValues ?? {};
	const formData = useForm<ReviewType>(reviewData);
	const { handleSubmit, formRef, submitting } = formData;

	return (
		<ContentProvider
			value={{
				order,
				orderItems,
				dataOnly: true,
				profileUsed,
				formData,
				poContext,
				poRequired,
				toggle,
			}}
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
							heading={<OrderDetailsSectionHeading />}
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
