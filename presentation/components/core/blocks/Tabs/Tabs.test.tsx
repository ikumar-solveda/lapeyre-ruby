/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TabsStory } from '@/components/blocks/Tabs/Tabs.stories';
import { axe, render } from '@/utils/getTestRenderer';

test('Tabs should have no accessibility violations', async () => {
	const view = render(<TabsStory collectionName={'product-details'} count={3} />);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});
