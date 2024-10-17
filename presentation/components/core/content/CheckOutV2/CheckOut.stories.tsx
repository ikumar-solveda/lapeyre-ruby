/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { CheckOutV2 } from '@/components/content/CheckOutV2';
import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';

export default {
	title: 'Content/Checkout',
	component: CheckOutV2,
	argTypes: {
		id: {
			table: {
				disable: true,
			},
		},
	},
} as Meta<typeof CheckOutV2>;

const Template: StoryFn<typeof CheckOutV2> = (args) => (
	<MemoryRouterProvider url={{ query: { path: 'checkout' } }}>
		<CheckOutV2 {...args} />
	</MemoryRouterProvider>
);

export const CheckOutV2Story = Template.bind({});
CheckOutV2Story.storyName = 'Checkout';
