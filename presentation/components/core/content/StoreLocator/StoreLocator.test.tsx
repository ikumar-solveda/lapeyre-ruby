/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { axe, render, waitForData } from '@/utils/getTestRenderer';
import { StoreLocatorStory } from '@/components/content/StoreLocator/StoreLocator.stories';

test('StoreLocator should have no accessibility violations', async () => {
	const view = render(<StoreLocatorStory {...(StoreLocatorStory.args as any)} />);

	waitForData(view);

	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});

test('Find Google logo in StoreLocator', async () => {
	const view = render(<StoreLocatorStory {...(StoreLocatorStory.args as any)} />);

	waitForData(view);

	const element = view.findByAltText('Google');
	expect(element).toBeInTheDocument;
});
