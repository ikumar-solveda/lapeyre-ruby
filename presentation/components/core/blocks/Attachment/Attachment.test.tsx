/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { render, axe } from '@/utils/getTestRenderer';
import { AttachmentStory } from '@/components/blocks/Attachment/Attachment.stories';

test('Attachment should have no accessibility violations', async () => {
	const view = render(<AttachmentStory attachments={[]} />);
	const results = await axe(view.container);
	expect(results).toHaveNoViolations();
});
