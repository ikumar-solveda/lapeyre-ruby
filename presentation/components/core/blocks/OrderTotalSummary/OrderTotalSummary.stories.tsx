/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ContentProvider } from '@/data/context/content';
import { OrderTotalSummary } from '@/components/blocks/OrderTotalSummary';
import { Paper } from '@mui/material';

export default {
	title: 'Blocks/Order Total Summary',
	component: OrderTotalSummary,
} as ComponentMeta<typeof OrderTotalSummary>;

const Template: ComponentStory<typeof OrderTotalSummary> = (args) => (
	<ContentProvider value={args}>
		<Paper sx={{ p: 2 }}>
			<OrderTotalSummary />
		</Paper>
	</ContentProvider>
);

export const OrderTotalSummaryStory = Template.bind({});
OrderTotalSummaryStory.args = {
	order: {
		totalProductPrice: '2249.97',
		totalProductPriceCurrency: 'USD',
		totalSalesTax: '0',
		totalSalesTaxCurrency: 'USD',
		totalShippingCharge: '60',
		totalShippingChargeCurrency: 'USD',
		totalShippingTax: '0',
		totalShippingTaxCurrency: 'USD',
		totalAdjustment: '-225',
		totalAdjustmentCurrency: 'USD',
		grandTotal: '2084.97',
		grandTotalCurrency: 'USD',
	},
	orderItems: [{}],
	canContinue: () => true,
	checkout: () => 0,
	continueShopping: () => 0,
};
OrderTotalSummaryStory.storyName = 'Summary';
