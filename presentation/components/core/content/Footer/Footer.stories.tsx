/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Footer } from '@/components/content/Footer';

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
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = ({ id, ...args }) => <Footer id={id} {...args} />;

export const FooterStory = Template.bind({});
FooterStory.storyName = 'Footer';
FooterStory.args = { id: 'footer' };
