/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { render, axe } from '@/utils/getTestRenderer';
import { CarouselStory } from '@/components/blocks/Carousel/Carousel.stories';

test('Carousel should have no accessibility violations', async () => {
	const view = render(<CarouselStory {...(CarouselStory.args as any)} />);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});
