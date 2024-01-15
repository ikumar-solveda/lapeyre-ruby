/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
/* eslint-disable @next/next/no-img-element */
// content recommendation widget ideally using svg.
import { RenderContent } from '@/components/blocks/RenderContent';
import { ProcessedContent } from '@/data/types/Marketing';
import { MouseEvent } from 'react';

export const renderContent = (
	content?: ProcessedContent,
	onClick?: (_event: MouseEvent) => Promise<void>
) => <RenderContent key={content?.contentId} content={content} onClick={onClick} />;
