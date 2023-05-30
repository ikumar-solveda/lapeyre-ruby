/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { render, axe } from '@/utils/getTestRenderer';
import { TabsStory } from '@/components/blocks/Tabs/Tabs.stories';

test('Tabs should have no accessibility violations', async () => {
	const view = render(<TabsStory collectionName={'product-details'} />);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});
