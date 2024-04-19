/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { InterestItemListMessage } from '@/components/email/templates/InterestItemListMessage';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Wishlist Creation (InterestItemListMessage)',
	component: InterestItemListMessage,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof InterestItemListMessage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Wishlist Creation (InterestItemListMessage)',
	args: {
		searchParams: {
			senderName: 'Anonymous Observer',
			message: 'Check out my wishlist',
			senderEmail: 'rather@not.com',
			giftListId: '1234567890',
			langId: '-1',
		},
		context: mockContext,
		cache: mockCache,
	},
};
