/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Attachment } from '@/components/blocks/Attachment';

export default {
	title: 'Blocks/Attachment',
	component: Attachment,
} as ComponentMeta<typeof Attachment>;

const Template: ComponentStory<typeof Attachment> = (args) => <Attachment {...args} />;

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
