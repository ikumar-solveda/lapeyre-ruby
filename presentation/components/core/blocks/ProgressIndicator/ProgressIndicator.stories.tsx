/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
	title: 'Blocks/Progress Indicator',
	component: ProgressIndicator,
} as ComponentMeta<typeof ProgressIndicator>;

const Template: ComponentStory<typeof ProgressIndicator> = (args) => (
	<ProgressIndicator {...args} />
);

export const ProgressIndicatorStory = Template.bind({});
ProgressIndicatorStory.args = {
	variant: 'circular',
};

ProgressIndicatorStory.storyName = 'Progress Indicator';
