/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NumberInput } from '@/components/blocks/NumberInput';

export default {
	title: 'Blocks/Number Input',
	component: NumberInput,
} as ComponentMeta<typeof NumberInput>;

const Template: ComponentStory<typeof NumberInput> = (args) => <NumberInput {...args} />;

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
