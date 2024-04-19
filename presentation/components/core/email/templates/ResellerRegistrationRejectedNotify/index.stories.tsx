/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ResellerRegistrationRejectedNotify } from '@/components/email/templates/ResellerRegistrationRejectedNotify';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Reseller Registration Rejection (ResellerRegistrationRejectedNotify)',
	component: ResellerRegistrationRejectedNotify,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof ResellerRegistrationRejectedNotify>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Reseller Registration Rejection (ResellerRegistrationRejectedNotify)',
	args: {
		searchParams: {
			langId: '-1',
		},
		context: mockContext,
		cache: mockCache,
	},
};
