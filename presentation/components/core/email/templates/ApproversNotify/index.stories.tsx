/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ApproversNotify } from '@/components/email/templates/ApproversNotify';
import { mockCache } from '@/data/constants/cache';
import { mockContext } from '@/data/constants/context';
import { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';

const meta = {
	title: 'Email Templates/{Order, Organization, User} Approval (ApproversNotify)',
	component: ApproversNotify,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Suspense>
				<Story />
			</Suspense>
		),
	],
} as Meta<typeof ApproversNotify>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	name: '{Order, Organization, User} Approval (ApproversNotify)',
	args: {
		params: { viewName: 'ApproversNotifyView' },
		searchParams: {
			parentMember: 'o=Buyer+A+Organization',
			logonId: 'buyer01',
			firstName: 'Tom',
			lastName: 'Smith',
			flowType: 'ResellerOrgEntityRegistrationAdd',
			langId: '-1',
			org_orgEntityName: '["Ruby"]',
		},
		context: mockContext,

		cache: mockCache,
	},
};
