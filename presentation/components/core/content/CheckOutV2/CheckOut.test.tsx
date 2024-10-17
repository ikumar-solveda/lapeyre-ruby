/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CheckOutV2Story } from '@/components/content/CheckOutV2/CheckOut.stories';
import { axe, render, waitForData } from '@/utils/getTestRenderer';

test('checkout should have no accessibility violations', async () => {
	const view = render(<CheckOutV2Story id="checkout" />);
	await waitForData(view);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
}, 10000);
