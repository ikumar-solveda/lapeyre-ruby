/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { RejectTaskNotification } from '@/components/email/templates/RejectTaskNotification';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Workspace Task Rejection (RejectTaskNotification)',
	component: RejectTaskNotification,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof RejectTaskNotification>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Workspace Task Rejection (RejectTaskNotification)',
	args: {
		searchParams: {
			langId: '-1',
		},
		context: mockContext,
		cache: mockCache,
	},
};
