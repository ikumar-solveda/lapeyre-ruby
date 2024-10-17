/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { CheckOutStory } from '@/components/content/CheckOut/CheckOut.stories';
import { axe, render, waitForData } from '@/utils/getTestRenderer';

test('checkout should have no accessibility violations', async () => {
	const view = render(<CheckOutStory id="checkout" />);
	await waitForData(view);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
}, 10000);

test('checkout bopis toggle should exist', async () => {
	const view = render(<CheckOutStory id="checkout" />);
	await waitForData(view);
	const deliveryButton = await view.findByTestId('checkout-bopis-toggle-delivery');
	expect(deliveryButton).toBeInTheDocument();
	const pickupButton = await view.findByTestId('checkout-bopis-toggle-pickup');
	expect(pickupButton).toBeInTheDocument();
});

test('checkout stepper should exist', async () => {
	const view = render(<CheckOutStory id="checkout" />);
	await waitForData(view);
	const stepper = await view.findByTestId('checkout-stepper');
	expect(stepper).toBeInTheDocument();
});
