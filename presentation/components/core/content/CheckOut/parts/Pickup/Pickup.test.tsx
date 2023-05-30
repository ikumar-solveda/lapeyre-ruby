/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PickupStory } from '@/components/content/CheckOut/parts/Pickup/Pickup.stories';
import { render, waitFor, waitForData } from '@/utils/getTestRenderer';

test('Check that pickup details page default form loads successfully', async () => {
	const view = render(<PickupStory {...(PickupStory.args as any)} />);

	await waitForData(view);

	const clickNonSelfChoice = await waitFor(() => view.findByTestId('pickup-choice-non-self'));
	expect(clickNonSelfChoice).toBeInTheDocument();

	const firstNameField = await waitFor(() => view.findByTestId('pickup-form-firstName'));
	expect(firstNameField).toBeInTheDocument();

	const submitButton = await waitFor(() => view.findByTestId('pickup-details-submit'));
	expect(submitButton).toBeInTheDocument();
});
