/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { CheckOutV2Pickup } from '@/components/content/CheckOutV2/parts/Pickup';
import { ContentProvider } from '@/data/context/content';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'Content/CheckOutV2/Pickup',
	component: CheckOutV2Pickup,
} as Meta<typeof CheckOutV2Pickup>;

const Template: StoryFn<typeof CheckOutV2Pickup> = (args) => (
	<ContentProvider value={{ steps: ['shipping', 'pickup', 'payment', 'review'], activeStep: 1 }}>
		<CheckOutV2Pickup {...args} />
	</ContentProvider>
);

export const CheckOutV2PickupStory = Template.bind({});

CheckOutV2PickupStory.args = {};

CheckOutV2PickupStory.storyName = 'Pickup';
