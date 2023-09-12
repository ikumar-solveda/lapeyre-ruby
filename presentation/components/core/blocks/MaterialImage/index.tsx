/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNextImagePath } from '@/data/Content/_ImagePath';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { styled } from '@mui/material';
import Image from 'next/image';
import { ComponentProps, useMemo } from 'react';

const StyledNextImage = styled(Image)({});
const StyledImg = styled('img')({});

const RE = /^([a-z]+:\/\/|data:image\/([a-z]+?);base64,).*$/i;
const attachBasePath = (basePath: string, src: string) =>
	RE.test(src) ? src : `${basePath}/${src}`.replaceAll('//', '/');

export const Img = (props: ComponentProps<typeof StyledImg>) => {
	const { src: originalSrc, srcSet: originSrcSet, ...rest } = props;
	const { basePath } = useNextRouter();
	const src = useMemo(
		() => (originalSrc ? attachBasePath(basePath, originalSrc) : ''),
		[basePath, originalSrc]
	);
	const srcSet = useMemo(
		() =>
			originSrcSet
				? (originSrcSet as string)
						.split(',')
						.map((e) => {
							const s = e.trim().split(' ');
							s[0] = attachBasePath(basePath, s[0]);
							return s.join(' ');
						})
						.join(',')
				: '',
		[originSrcSet, basePath]
	);
	return <StyledImg {...{ ...rest, src, srcSet }} />;
};

export const MaterialImage = (props: ComponentProps<typeof StyledNextImage>) => {
	const { src: originalSrc, ...rest } = props;
	const src = useNextImagePath(originalSrc);

	return <StyledNextImage {...{ ...rest, src }} />;
};
