/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { render, axe, waitForData } from '@/utils/getTestRenderer';
import { BreadcrumbTrailStory } from '@/components/content/BreadcrumbTrail/BreadcrumbTrail.stories';

test('breadcrumb trail has one link', async () => {
	const view = render(<BreadcrumbTrailStory id="bc" />);
	const links = await view.findAllByRole('link');
	expect(links.length).toBe(1);
});
test('breadcrumb trail should have no accessibility violations', async () => {
	const view = render(<BreadcrumbTrailStory id="bc" />);
	await waitForData(view);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});
