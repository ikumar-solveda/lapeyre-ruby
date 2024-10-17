/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Swatch } from '@/components/blocks/Swatch';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'Blocks/Swatch',
	component: Swatch,
	argTypes: {
		classes: {
			table: {
				disable: true,
			},
		},
		color: {
			table: {
				disable: true,
			},
		},
		disableFocusRipple: {
			table: {
				disable: true,
			},
		},
		edge: {
			table: {
				disable: true,
			},
		},
		centerRipple: {
			table: {
				disable: true,
			},
		},
		disableTouchRipple: {
			table: {
				disable: true,
			},
		},
		focusRipple: {
			table: {
				disable: true,
			},
		},
		action: {
			table: {
				disable: true,
			},
		},
		focusVisibleClassName: {
			table: {
				disable: true,
			},
		},
		onFocusVisible: {
			table: {
				disable: true,
			},
		},
		TouchRippleProps: {
			table: {
				disable: true,
			},
		},
		touchRippleRef: {
			table: {
				disable: true,
			},
		},
		disableRipple: {
			table: {
				disable: true,
			},
		},
		ref: {
			table: {
				disable: true,
			},
		},
		style: {
			table: {
				disable: true,
			},
		},
		disabled: {
			table: {
				disable: true,
			},
		},
		sx: {
			table: {
				disable: true,
			},
		},
		className: {
			table: {
				disable: true,
			},
		},
		children: {
			table: {
				disable: true,
			},
		},
		LinkComponent: {
			table: {
				disable: true,
			},
		},
	},
} as Meta<typeof Swatch>;

const Template: StoryFn<typeof Swatch> = (args) => <Swatch aria-label="yellow fabric" {...args} />;

export const SwatchStory = Template.bind({});
SwatchStory.args = {
	selected: true,
	image: '/EmeraldSAS/images/storybook-mock-images/swatch_1.png',
};

SwatchStory.storyName = 'Swatch';
