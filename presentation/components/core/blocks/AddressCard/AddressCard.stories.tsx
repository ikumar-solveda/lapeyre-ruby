/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { AddressCard } from '@/components/blocks/AddressCard';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'Blocks/AddressCard',
	component: AddressCard,
} as Meta<typeof AddressCard>;

const Template: StoryFn<typeof AddressCard> = (args) => <AddressCard {...args} />;
const address = {
	firstName: 'Bob',
	lastName: 'Dole',
	zipCode: 'N2L3E6',
	country: 'Canada',
	email1: 'ac@me.com',
	city: 'Toronto',
	nickName: 'Both',
	addressType: 'ShippingAndBilling',
	state: 'Ontario',
	addressLine: ['line1', 'line2', ''],
	addressId: '3074457362928439616',
	primary: 'false',
	phone1: '555-555-5555',
	email2: '',
	fax1: '',
	middleName: '',
	personTitle: 'Mr',
	phone2: '',
};
export const _Story = Template.bind({});
_Story.args = {
	address,
	showType: true,
	selectedAddressId: address.addressId,
};
_Story.storyName = 'AddressCard';
