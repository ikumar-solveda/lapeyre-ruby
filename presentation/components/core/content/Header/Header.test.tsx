/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { HeaderLoggedOutStory } from '@/components/content/Header/Header.stories';
import { axe, render, waitForData } from '@/utils/getTestRenderer';

test('header should have no accessibility violations', async () => {
	const view = render(<HeaderLoggedOutStory id="header" />);
	await waitForData(view);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
}, 10000);
