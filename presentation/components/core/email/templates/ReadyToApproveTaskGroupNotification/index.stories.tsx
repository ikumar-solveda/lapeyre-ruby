/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ReadyToApproveTaskGroupNotification } from '@/components/email/templates/ReadyToApproveTaskGroupNotification';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Task Group Approval (ReadyToApproveTaskGroupNotification)',
	component: ReadyToApproveTaskGroupNotification,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof ReadyToApproveTaskGroupNotification>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Task Group Approval (ReadyToApproveTaskGroupNotification)',
	args: {
		searchParams: {
			langId: '-1',
		},
		context: mockContext,
		cache: mockCache,
	},
};
