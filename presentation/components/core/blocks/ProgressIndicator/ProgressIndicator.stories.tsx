/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'Blocks/Progress Indicator',
	component: ProgressIndicator,
} as Meta<typeof ProgressIndicator>;

const Template: StoryFn<typeof ProgressIndicator> = (args) => <ProgressIndicator {...args} />;

export const ProgressIndicatorStory = Template.bind({});
ProgressIndicatorStory.args = {
	variant: 'circular',
};

ProgressIndicatorStory.storyName = 'Progress Indicator';
