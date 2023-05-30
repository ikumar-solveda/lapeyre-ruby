/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from '@/components/content/Header';

export default {
	title: 'Content/Header',
	component: Header,
	argTypes: {
		id: {
			table: {
				disable: true,
			},
		},
	},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = ({ id, ...args }) => <Header id={id} {...args} />;

export const HeaderLoggedOutStory = Template.bind({});
HeaderLoggedOutStory.storyName = 'Logged Out';
HeaderLoggedOutStory.args = { id: 'header' };
export const HeaderLoggedInStory = Template.bind({});
HeaderLoggedInStory.storyName = 'Logged In';
HeaderLoggedInStory.args = { id: 'header' };
