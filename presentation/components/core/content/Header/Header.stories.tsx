/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Header } from '@/components/content/Header';
import { Meta, StoryFn } from '@storybook/react';

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
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = ({ id, ...args }) => <Header id={id} {...args} />;

export const HeaderLoggedOutStory = Template.bind({});
HeaderLoggedOutStory.storyName = 'Logged Out';
HeaderLoggedOutStory.args = { id: 'header' };
export const HeaderLoggedInStory = Template.bind({});
HeaderLoggedInStory.storyName = 'Logged In';
HeaderLoggedInStory.args = { id: 'header' };
