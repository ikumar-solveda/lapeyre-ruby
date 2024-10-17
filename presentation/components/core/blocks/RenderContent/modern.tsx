/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */
'use client';
/* eslint-disable @next/next/no-img-element */
// content recommendation widget ideally using svg.
import { Linkable } from '@/components/blocks/Linkable/modern';
import { Img } from '@/components/blocks/MaterialImage';
import { REL_ROOT_OR_ABS_OR_DATA_RE } from '@/data/constants/content';
import { PARSE_CHECK } from '@/data/constants/marketing';
import { ContentProvider } from '@/data/context/content';
import { ProcessedContent } from '@/data/types/Marketing';
import { RenderContentProps } from '@/data/types/RenderContent';
import { requiresCheck } from '@/utils/parseHTMLCheck';
import { parseHTML } from '@/utils/parseHTMLModern';
import { FC, Fragment, useMemo } from 'react';

const prefixRoot = (src: string | undefined, root: string | undefined) => {
	let rc = src;
	if (root && src) {
		rc = REL_ROOT_OR_ABS_OR_DATA_RE.test(src) ? src : `/${root}/${src}`;
	}
	return rc;
};

const EMPTY: ProcessedContent = {};
const EMPTY_ASSET = {} as NonNullable<ProcessedContent['asset']>;

export const RenderContentModern: FC<RenderContentProps> = ({
	content = EMPTY,
	onClick,
	options,
}) => {
	const { text, contentUrl, assetDescription, asset = EMPTY_ASSET } = content;
	const { attachmentAssetPath, attachmentAssetRootDirectory } = asset;
	const src = prefixRoot(attachmentAssetPath, attachmentAssetRootDirectory);
	const renderDetails = useMemo(() => requiresCheck(text, contentUrl), [text, contentUrl]);
	const rendered = useMemo(() => (text ? parseHTML(text) : null), [text]);

	return text ? (
		<ContentProvider value={{ onClick, options }}>
			{contentUrl && !renderDetails[PARSE_CHECK.hasAnchorTag] ? (
				<Linkable href={contentUrl} id={contentUrl} data-testid={contentUrl} onClick={onClick}>
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
			<Img alt={assetDescription?.attachmentName} src={src ?? ''} {...options} />
		</Linkable>
	) : null;
};
