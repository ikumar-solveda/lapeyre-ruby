/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { MerchantOrderNotify } from '@/components/email/templates/MerchantOrderNotify';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Merchant Order Notification (MerchantOrderNotify)',
	component: MerchantOrderNotify,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof MerchantOrderNotify>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Merchant Order Notification (MerchantOrderNotify)',
	args: {
		searchParams: {
			langId: '-1',
			orderId: '5389694',
		},
		context: mockContext,
		cache: mockCache,
	},
};
