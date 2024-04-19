/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { PasswordNotify } from '@/components/email/templates/PasswordNotify';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Account Password Reset (PasswordNotify)',
	component: PasswordNotify,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof PasswordNotify>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Account Password Reset (PasswordNotify)',
	args: {
		searchParams: {
			logonId: 'buyerUser',
			logonPassword: '123456',
			langId: '-1',
		},
		cache: mockCache,
		context: mockContext,
	},
};
