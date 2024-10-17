/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { CheckOut } from '@/components/content/CheckOut';
import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';

export default {
	title: 'Content/Checkout',
	component: CheckOut,
	argTypes: {
		id: {
			table: {
				disable: true,
			},
		},
	},
} as Meta<typeof CheckOut>;

const Template: StoryFn<typeof CheckOut> = (args) => (
	<MemoryRouterProvider url={{ query: { path: 'checkout' } }}>
		<CheckOut {...args} />
	</MemoryRouterProvider>
);

export const CheckOutStory = Template.bind({});
CheckOutStory.storyName = 'Checkout';
