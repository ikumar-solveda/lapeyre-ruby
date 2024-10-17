/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { NumberInput } from '@/components/blocks/NumberInput';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'Blocks/Number Input',
	component: NumberInput,
} as Meta<typeof NumberInput>;

const Template: StoryFn<typeof NumberInput> = (args) => <NumberInput {...args} />;

export const NumberInputStory = Template.bind({});
NumberInputStory.args = {
	value: '',
	placeholder: 'Placeholder',
	precision: 2,
	decimalSeparator: '.',
	thousandSeparator: ',',
	min: 0,
	max: 10000,
	showControls: true,
};
NumberInputStory.storyName = 'Number Input';
