/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

/* eslint-disable @next/next/no-img-element */
// content recommendation widget ideally using svg.
import { Fragment } from 'react';
import { ProcessedContent } from '@/data/types/Marketing';
import { parseHTML } from '@/utils/parseHTML';
import { Linkable } from '@/components/blocks/Linkable';
import { Img } from '@/components/blocks/MaterialImage';

export const renderContent = (content?: ProcessedContent) => {
	if (!content) return null;
	const { text, id, contentUrl, assetDescription, asset } = content;
	return text ? (
		<Fragment key={id}>{parseHTML(text)}</Fragment>
	) : asset ? (
		<Linkable key={id} href={contentUrl} aria-label={assetDescription?.attachmentName}>
			<Img alt={assetDescription?.attachmentName} src={asset.attachmentAssetPath ?? ''} />
		</Linkable>
	) : null;
};
