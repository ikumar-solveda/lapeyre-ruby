/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2Story } from '@/components/content/CheckOutV2/CheckOut.stories';
import { render, waitForData } from '@/utils/getTestRenderer';
import userEvent from '@testing-library/user-event';

test('checkout shipping toggle exists', async () => {
	const view = render(<CheckOutV2Story id="checkout" />);
	await waitForData(view);
	const checkoutShipmentSwitch = await view.findByTestId('checkout-switch');
	expect(checkoutShipmentSwitch).toBeInTheDocument();
});

test('checkout shipping address label exists', async () => {
	const view = render(<CheckOutV2Story id="checkout" />);
	await waitForData(view);
	const shippingAddress = await view.findByText('Shipping Address');
	expect(shippingAddress).toBeInTheDocument();
});

test('checkout shipping method label exists', async () => {
	const view = render(<CheckOutV2Story id="checkout" />);
	await waitForData(view);
	const shippingMethod = await view.findByText('Shipping Method');
	expect(shippingMethod).toBeInTheDocument();
});

test('checkout multi shipment table exists', async () => {
	const view = render(<CheckOutV2Story id="checkout" />);
	await waitForData(view);
	// console.log('checkout multi shipment table exists: click on switch');
	const checkoutShipmentSwitch = await view.findByTestId('checkout-switch');
	await userEvent.click(checkoutShipmentSwitch);
	const tableToolbarText = await view.findByText('2 items in cart');
	expect(tableToolbarText).toBeInTheDocument();
	// console.log('checkout multi shipment table exists, select all checkbox');
	const selectAll = await view.findByTestId('multi-shipment-select-all');
	expect(selectAll).toBeInTheDocument();
	const checkbox = await selectAll.querySelector('input[id=multi-shipment-select-all]');
	expect(checkbox).not.toBeNull();
	await userEvent.click(checkbox ?? selectAll);
	const toolbarTextUpdated = await view.findByText('2 items selected');
	expect(toolbarTextUpdated).toBeInTheDocument();
	// console.log('checkout multi shipment table exists, group select button exist');
	const groupSelectButton = await view.findByTestId(
		'multi-shipment-toolbar-group-select-shipping-address'
	);
	expect(groupSelectButton).toBeInTheDocument();
});
