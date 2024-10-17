/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Attachment } from '@/components/blocks/Attachment';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'Blocks/Attachment',
	component: Attachment,
} as Meta<typeof Attachment>;

const Template: StoryFn<typeof Attachment> = (args) => <Attachment {...args} />;

export const AttachmentStory = Template.bind({});
AttachmentStory.args = {
	attachments: [
		{
			mimeType: '.png',
			attachmentAssetPath: '/test/path',
			attachmentAssetID: '123',
			name: 'image-file',
		},
	],
};

AttachmentStory.storyName = 'Attachment';
