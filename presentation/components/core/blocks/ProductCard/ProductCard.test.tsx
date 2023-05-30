/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { axe, render, waitForData } from '@/utils/getTestRenderer';
import { ProductCardStory } from '@/components/blocks/ProductCard/ProductCard.stories';
import { act } from 'react-dom/test-utils';

test('ProductCard should have no accessibility violations', async () => {
	const view = render(<ProductCardStory {...(ProductCardStory.args as any)} />);
	await act(() => {
		waitForData(view);
	});
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});
