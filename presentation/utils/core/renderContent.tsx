/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

/* eslint-disable @next/next/no-img-element */
// content recommendation widget ideally using svg.
import { Linkable } from '@/components/blocks/Linkable';
import { Img } from '@/components/blocks/MaterialImage';
import { ContentProvider } from '@/data/context/content';
import { ProcessedContent } from '@/data/types/Marketing';
import { parseHTML } from '@/utils/parseHTML';
import { Fragment, MouseEvent } from 'react';

const prefixRoot = (src: string | undefined, root: string | undefined) => {
	let rc = src;
	if (root && src) {
		const RE = new RegExp(`^/?${root}\\b`);
		rc = RE.test(src) ? src : `/${root}/${src}`;
	}
	return rc;
};

export const renderContent = (
	content?: ProcessedContent,
	onClick?: (_event: MouseEvent) => Promise<void>
) => {
	if (!content) return null;
	const { text, id, contentUrl, assetDescription, asset } = content;
	const { attachmentAssetPath, attachmentAssetRootDirectory } = asset ?? {};
	const src = prefixRoot(attachmentAssetPath, attachmentAssetRootDirectory);

	return text ? (
		<ContentProvider key={id} value={{ onClick }}>
			<Fragment>{parseHTML(text)}</Fragment>
		</ContentProvider>
	) : asset ? (
		<Linkable
			key={id}
			href={contentUrl}
			id={contentUrl}
			data-testid={contentUrl}
			aria-label={assetDescription?.attachmentName}
			onClick={onClick}
		>
			<Img alt={assetDescription?.attachmentName} src={src ?? ''} />
		</Linkable>
	) : null;
};
