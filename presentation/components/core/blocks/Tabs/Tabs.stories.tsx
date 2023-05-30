/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React, { FC } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Typography } from '@mui/material';
import { Tabs } from '@/components/blocks/Tabs';

const defaultArgs = {
	count: 3,
};

export default {
	title: 'Blocks/Tabs',
	component: Tabs,
	argTypes: {
		tabs: {
			table: {
				disable: true,
			},
		},
		collectionName: {
			table: {
				disable: true,
			},
		},
	},
} as ComponentMeta<typeof Tabs>;

const getArrayOfLength = (length: number) => new Array(length);
const getTabs = (totalTabs?: number) =>
	totalTabs
		? [...getArrayOfLength(totalTabs)].map((_, i) => ({
				title: `Tab ${i + 1}`,
				content: <Typography variant="body1">{`Tab Details ${i + 1}`}</Typography>,
		  }))
		: [];

const Container: FC<typeof defaultArgs> = ({ count }) => (
	<Tabs collectionName="story" tabs={getTabs(count)} />
);

const Template: ComponentStory<typeof Container> = (args) => <Container {...args} />;

export const TabsStory = Template.bind({});
TabsStory.args = defaultArgs;

TabsStory.storyName = 'Tabs';
