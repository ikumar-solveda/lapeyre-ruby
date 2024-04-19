/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OrderChanged } from '@/components/email/templates/OrderChanged';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Order Changed (OrderChanged)',
	component: OrderChanged,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof OrderChanged>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Order Changed (OrderChanged)',
	args: {
		searchParams: {
			orderId: '5389694',
			langId: '-1',
		},
		context: mockContext,
		cache: mockCache,
	},
};
