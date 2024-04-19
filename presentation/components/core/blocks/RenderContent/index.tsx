/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
'use client';
/* eslint-disable @next/next/no-img-element */
// content recommendation widget ideally using svg.
import { Linkable } from '@/components/blocks/Linkable';
import { Img } from '@/components/blocks/MaterialImage';
import { PARSE_CHECK } from '@/data/constants/marketing';
import { ContentProvider } from '@/data/context/content';
import { ProcessedContent } from '@/data/types/Marketing';
import { RenderContentProps } from '@/data/types/RenderContent';
import { parseContentAction } from '@/utils/parseContentAction';
import { parseHTML } from '@/utils/parseHTML';
import { requiresCheck } from '@/utils/parseHTMLCheck';
import { FC, Fragment, useMemo } from 'react';

const prefixRoot = (src: string | undefined, root: string | undefined) => {
	let rc = src;
	if (root && src) {
		const RE = new RegExp(`^/?${root}\\b`);
		rc = RE.test(src) ? src : `/${root}/${src}`;
	}
	return rc;
};
const EMPTY: ProcessedContent = {};
const EMPTY_ASSET = {} as NonNullable<ProcessedContent['asset']>;

export const RenderContent: FC<RenderContentProps> = ({ content = EMPTY, onClick }) => {
	const { text, contentUrl, assetDescription, asset = EMPTY_ASSET } = content;
	const { attachmentAssetPath, attachmentAssetRootDirectory } = asset;
	const src = prefixRoot(attachmentAssetPath, attachmentAssetRootDirectory);
	const renderDetails = useMemo(() => requiresCheck(text, contentUrl), [text, contentUrl]);
	const rendered = useMemo(() => (text ? parseHTML(text) : null), [text]);

	const parsedContentUrl = useMemo(
		() => parseContentAction({ link: contentUrl })?.parsedContentUrl ?? contentUrl,
		[contentUrl]
	);

	return text ? (
		<ContentProvider value={{ onClick }}>
			{contentUrl && !renderDetails[PARSE_CHECK.hasAnchorTag] ? (
				<Linkable
					href={parsedContentUrl}
					id={contentUrl}
					data-testid={contentUrl}
					onClick={onClick}
				>
					<Fragment>{rendered}</Fragment>
				</Linkable>
			) : (
				<Fragment>{rendered}</Fragment>
			)}
		</ContentProvider>
	) : asset ? (
		<Linkable
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
