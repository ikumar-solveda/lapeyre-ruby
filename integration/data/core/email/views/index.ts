/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { emailTemplateLayoutManifest } from '@/data/email/views/manifest';

type Props = {
	identifier: string;
} & Record<string, any>;
export const getLayoutForView = ({ identifier, ...props }: Props) =>
	emailTemplateLayoutManifest[identifier]
		? emailTemplateLayoutManifest[identifier](props)
		: undefined;
