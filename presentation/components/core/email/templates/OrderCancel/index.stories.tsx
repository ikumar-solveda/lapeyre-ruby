/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OrderCancel } from '@/components/email/templates/OrderCancel';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Order Canceled (OrderCancel)',
	component: OrderCancel,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof OrderCancel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Order Canceled (OrderCancel)',
	args: {
		searchParams: {
			langId: '-1',
			orderId: '5389694',
		},
		context: mockContext,
		cache: mockCache,
	},
};
