/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckOut } from '@/components/content/CheckOut';

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
	parameters: {
		nextRouter: {
			query: { path: ['checkout'] },
		},
	},
} as ComponentMeta<typeof CheckOut>;

const Template: ComponentStory<typeof CheckOut> = (args) => <CheckOut {...args} />;

export const CheckOutStory = Template.bind({});
CheckOutStory.storyName = 'Checkout';
