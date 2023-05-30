/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BreadcrumbTrail } from '@/components/content/BreadcrumbTrail';

export default {
	title: 'Content/Breadcrumb Trail',
	component: BreadcrumbTrail,
	argTypes: {
		id: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {
		nextRouter: {
			query: { path: ['furniture'] },
		},
	},
} as ComponentMeta<typeof BreadcrumbTrail>;

const Template: ComponentStory<typeof BreadcrumbTrail> = (args) => <BreadcrumbTrail {...args} />;

export const BreadcrumbTrailStory = Template.bind({});
BreadcrumbTrailStory.storyName = 'Breadcrumb Trail';
