/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { OrderReceived } from '@/components/email/templates/OrderReceived';
import { OrderRejected } from '@/components/email/templates/OrderRejected';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Order Received (OrderReceived)',
	component: OrderReceived,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof OrderRejected>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Order Received (OrderReceived)',
	args: {
		searchParams: {
			langId: '-1',
			orderId: '5389694',
		},
		context: mockContext,
		cache: mockCache,
	},
};
