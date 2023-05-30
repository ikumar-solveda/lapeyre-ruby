/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { render, axe } from '@/utils/getTestRenderer';
import { SwatchStory } from '@/components/blocks/Swatch/Swatch.stories';

test('Swatch should have no accessibility violations', async () => {
	const view = render(<SwatchStory />);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});
