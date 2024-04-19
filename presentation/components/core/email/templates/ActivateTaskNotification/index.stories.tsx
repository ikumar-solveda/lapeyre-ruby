/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ActivateTaskNotification } from '@/components/email/templates/ActivateTaskNotification';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Task Activation (ActivateTaskNotification)',
	component: ActivateTaskNotification,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof ActivateTaskNotification>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Task Activation (ActivateTaskNotification)',
	args: {
		searchParams: {
			langId: '-1',
		},
		context: mockContext,
		cache: mockCache,
	},
};
