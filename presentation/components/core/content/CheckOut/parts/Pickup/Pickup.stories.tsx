/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Pickup } from '@/components/content/CheckOut/parts/Pickup';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'Content/Checkout/Pickup',
	component: Pickup,
} as Meta<typeof Pickup>;

const Template: StoryFn<typeof Pickup> = (args) => <Pickup {...args} />;

/** @deprecated */
export const PickupStory = Template.bind({});

PickupStory.args = {};

PickupStory.storyName = 'Pickup';
