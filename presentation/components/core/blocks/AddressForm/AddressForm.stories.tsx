/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddressForm } from '@/components/blocks/AddressForm';
import { ADDRESS_SHIPPING_BILLING } from '@/utils/address';
import { AddressFormActionLabels, EditableAddress } from '@/data/types/Address';
import { IconLabel } from '@/components/blocks/IconLabel';
import { Home } from '@mui/icons-material';
import { Typography } from '@mui/material';

export default {
	title: 'Blocks/Address Form',
	component: AddressForm,
	parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof AddressForm>;

const Template: ComponentStory<typeof AddressForm> = (args) => <AddressForm {...args} />;

export const AddressFormStory = Template.bind({});

const addressInput: EditableAddress = {
	firstName: 'Danial',
	lastName: 'David',
	city: 'Markham',
	state: 'Ontario',
	zipCode: 'L3R 1J8',
	country: 'Canada',
	phone1: '905-000-0000',
	nickName: '',
	email1: '',
	addressType: ADDRESS_SHIPPING_BILLING,
	addressLine1: 'string',
	addressLine2: 'string',
};
const args = {
	addressInput,
	submitLabel: 'CreateAddress' as AddressFormActionLabels,
	cancelLabel: 'Cancel' as AddressFormActionLabels,
	formLabel: (
		<IconLabel
			icon={<Home color="primary" />}
			label={<Typography variant="h5">{'My address'}</Typography>}
		/>
	),
};
AddressFormStory.args = args;
AddressFormStory.storyName = 'Address Form';
