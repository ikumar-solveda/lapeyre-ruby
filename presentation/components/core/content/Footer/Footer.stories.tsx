/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Footer } from '@/components/content/Footer';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'Content/Footer',
	component: Footer,
	argTypes: {
		id: {
			table: {
				disable: true,
			},
		},
	},
} as Meta<typeof Footer>;

const Template: StoryFn<typeof Footer> = ({ id, ...args }) => <Footer id={id} {...args} />;

export const FooterStory = Template.bind({});
FooterStory.storyName = 'Footer';
FooterStory.args = { id: 'footer' };
