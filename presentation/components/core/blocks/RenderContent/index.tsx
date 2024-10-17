/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */
'use client';
import { AttachmentIcon } from '@/components/blocks/Attachment/parts/Icon';
/* eslint-disable @next/next/no-img-element */
// content recommendation widget ideally using svg.
import { Linkable } from '@/components/blocks/Linkable';
import { Img } from '@/components/blocks/MaterialImage';
import {
	renderContentStack,
	renderContentStackSX,
} from '@/components/blocks/RenderContent/styles/stack';
import { REL_ROOT_OR_ABS_OR_DATA_RE } from '@/data/constants/content';
import { ATTACHMENT_ASSET_MIME_TYPE, PARSE_CHECK } from '@/data/constants/marketing';
import { ContentProvider } from '@/data/context/content';
import { ProcessedContent } from '@/data/types/Marketing';
import { RenderContentProps } from '@/data/types/RenderContent';
import { parseContentAction } from '@/utils/parseContentAction';
import { parseHTML } from '@/utils/parseHTML';
import { requiresCheck } from '@/utils/parseHTMLCheck';
import { Button, Stack, Typography } from '@mui/material';
import { FC, Fragment, useMemo } from 'react';

const prefixRoot = (src: string | undefined, root: string | undefined) => {
	let rc = src;
	if (root && src) {
		rc = REL_ROOT_OR_ABS_OR_DATA_RE.test(src) ? src : `/${root}/${src}`;
	}
	return rc;
};
const EMPTY: ProcessedContent = {};
const EMPTY_ASSET_LIST = [] as NonNullable<ProcessedContent['assetList']>;

export const RenderContent: FC<RenderContentProps> = ({ content = EMPTY, onClick }) => {
	const {
		text,
		contentUrl,
		assetDescription,
		assetList = EMPTY_ASSET_LIST,
		contentId,
		contentName,
	} = content;
	const assets = assetList.map((asset) => {
		const { attachmentAssetPath, attachmentAssetRootDirectory } = asset;
		const src = prefixRoot(attachmentAssetPath, attachmentAssetRootDirectory);
		return {
			...asset,
			src,
		};
	});
	const renderDetails = useMemo(() => requiresCheck(text, contentUrl), [text, contentUrl]);
	const rendered = useMemo(() => (text ? parseHTML(text) : null), [text]);
	const uniqueId = useMemo(() => `${contentId}-${contentName}`, [contentId, contentName]);

	const parsedContentUrl = useMemo(
		() => parseContentAction({ link: contentUrl })?.parsedContentUrl ?? contentUrl,
		[contentUrl]
	);

	return text ? (
		<ContentProvider value={{ onClick }}>
			{contentUrl && !renderDetails[PARSE_CHECK.hasAnchorTag] ? (
				<Linkable
					href={parsedContentUrl}
					id={`${uniqueId}-${contentUrl}`}
					data-testid={`${uniqueId}-${contentUrl}`}
					onClick={onClick}
				>
					<Fragment>{rendered}</Fragment>
				</Linkable>
			) : (
				<Fragment>{rendered}</Fragment>
			)}
		</ContentProvider>
	) : assetList.length ? (
		<Stack sx={renderContentStackSX} {...renderContentStack}>
			{assets.map((asset, index) =>
				asset.attachmentAssetMimeType?.startsWith(ATTACHMENT_ASSET_MIME_TYPE) ? (
					<Button
						data-testid={`${uniqueId}-${asset.attachmentAssetId}`}
						id={`${uniqueId}-${asset.attachmentAssetId}`}
						color="secondary"
						size="small"
						variant="text"
						href={asset.src ?? ''}
						download={assetDescription?.attachmentName}
						aria-label={assetDescription?.attachmentName}
						key={index}
					>
						<Typography variant="body2" color="textSecondary">
							<AttachmentIcon fileExtension={asset.attachmentAssetMimeType} />
							{assetDescription?.attachmentName}
						</Typography>
					</Button>
				) : (
					<Linkable
						href={contentUrl}
						id={`${uniqueId}-${contentUrl}-${asset.attachmentAssetId}`}
						data-testid={`${uniqueId}-${contentUrl}-${asset.attachmentAssetId}`}
						aria-label={assetDescription?.attachmentName}
						onClick={onClick}
						key={index}
					>
						<Img alt={assetDescription?.attachmentName} src={asset.src ?? ''} />
					</Linkable>
				)
			)}
		</Stack>
	) : null;
};
