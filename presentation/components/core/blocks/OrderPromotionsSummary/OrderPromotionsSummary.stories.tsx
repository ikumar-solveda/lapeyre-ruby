/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContentProvider } from '@/data/context/content';
import { OrderPromotionsSummary } from '@/components/blocks/OrderPromotionsSummary';
import { Paper } from '@mui/material';

export default {
	title: 'Blocks/Order Promotions Summary',
	component: OrderPromotionsSummary,
} as ComponentMeta<typeof OrderPromotionsSummary>;

const Template: ComponentStory<typeof OrderPromotionsSummary> = (args) => (
	<ContentProvider value={args}>
		<Paper sx={{ p: 2 }}>
			<OrderPromotionsSummary />
		</Paper>
	</ContentProvider>
);

export const OrderPromotionsSummaryStory = Template.bind({});
OrderPromotionsSummaryStory.args = {
	order: {
		promotionCode: [{ code: 'REGISTER7' }],
		adjustment: [
			{
				description: 'Ten Percent Adjustment',
				code: 'adjust10P',
				amount: '-25.45',
				currency: 'USD',
			},
		],
		totalAdjustment: '-25.45',
		totalAdjustmentCurrency: 'USD',
	},
	promoCode: { code: 'REGISTER7', error: false },
	onResetPromoCodeError: () => 0,
	onPromoCodeApplyByKey: () => 0,
	onPromoCodeApply: () => 0,
	onPromoCodeChange: () => 0,
	onPromoCodeRemove: () => 0,
};
OrderPromotionsSummaryStory.storyName = 'Promotions';
