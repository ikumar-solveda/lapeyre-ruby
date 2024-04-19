/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { PasswordResetConfirmationNotify } from '@/components/email/templates/PasswordResetConfirmationNotify';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/Account Password Change (PasswordResetConfirmationNotify)',
	component: PasswordResetConfirmationNotify,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof PasswordResetConfirmationNotify>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: 'Account Password Change (PasswordResetConfirmationNotify)',
	args: {
		searchParams: {
			logonId: 'buyerUser',
			langId: '-1',
		},
		context: mockContext,
		cache: mockCache,
	},
};
