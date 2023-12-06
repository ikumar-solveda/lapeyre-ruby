/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { BreadcrumbTrail } from '@/components/content/BreadcrumbTrail';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';

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
} as ComponentMeta<typeof BreadcrumbTrail>;

const Template: ComponentStory<typeof BreadcrumbTrail> = (args) => (
	<MemoryRouterProvider url={{ query: { path: 'furniture' } }}>
		<BreadcrumbTrail {...args} />
	</MemoryRouterProvider>
);
export const BreadcrumbTrailStory = Template.bind({});
BreadcrumbTrailStory.storyName = 'Breadcrumb Trail';
