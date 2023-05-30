/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { render, axe, waitForData } from '@/utils/getTestRenderer';
import { FooterStory } from '@/components/content/Footer/Footer.stories';

test('footer has logo', async () => {
	const view = render(<FooterStory id="footer" />);
	await waitForData(view);
	const logo = await view.findByAltText('Footer Store Logo');
	expect(logo).toBeInTheDocument();
});
test('footer should have no accessibility violations', async () => {
	const view = render(<FooterStory id="footer" />);
	await waitForData(view);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});
