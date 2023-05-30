/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { render, axe } from '@/utils/getTestRenderer';
import { CardStory } from '@/components/blocks/Card/Card.stories';

test('Card should have no accessibility violations', async () => {
	const view = render(<CardStory testId={''} />);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});
