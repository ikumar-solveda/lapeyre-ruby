/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Pickup } from '@/components/content/CheckOut/parts/Pickup';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
	title: 'Content/Checkout/Pickup',
	component: Pickup,
} as ComponentMeta<typeof Pickup>;

const Template: ComponentStory<typeof Pickup> = (args) => <Pickup {...args} />;

export const PickupStory = Template.bind({});

PickupStory.args = {};

PickupStory.storyName = 'Pickup';
