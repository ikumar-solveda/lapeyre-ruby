/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { render, axe } from '@/utils/getTestRenderer';
import { SidebarStory } from '@/components/blocks/SideBar/Sidebar.stories';

test('Sidebar should have no accessibility violations', async () => {
	const view = render(<SidebarStory {...(SidebarStory.args as any)} />);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});
