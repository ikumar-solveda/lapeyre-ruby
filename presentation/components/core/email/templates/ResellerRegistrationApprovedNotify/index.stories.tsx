/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ResellerRegistrationApprovedNotify } from '@/components/email/templates/ResellerRegistrationApprovedNotify';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Reseller Registration Approval (ResellerRegistrationApprovedNotify)',
	component: ResellerRegistrationApprovedNotify,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof ResellerRegistrationApprovedNotify>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Reseller Registration Approval (ResellerRegistrationApprovedNotify)',
	args: {
		searchParams: {
			langId: '-1',
		},
		context: mockContext,
		cache: mockCache,
	},
};
