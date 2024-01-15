/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ProcessedContent } from '@/data/types/Marketing';
import { MouseEvent } from 'react';

export type RenderContentProps = {
	content?: ProcessedContent;
	onClick?: (_event: MouseEvent) => Promise<void>;
};
