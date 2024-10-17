/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { useNextImagePath } from '@/data/Content/_ImagePath';
import { BASE_PATH } from '@/data/constants/common';
import { ABSOLUTE_OR_DATA_RE } from '@/data/constants/content';
import { concatPathComponents } from '@/utils/concatPathComponent';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { ComponentProps, useMemo } from 'react';
const StyledNextImage = styled(Image)({});
const StyledImg = styled('img')({});

const attachBasePath = (basePath: string, src: string) =>
	ABSOLUTE_OR_DATA_RE.test(src) ? src : concatPathComponents(basePath, src);

export const Img = (props: ComponentProps<typeof StyledImg> & { basePath?: string }) => {
	const { src: originalSrc, srcSet: originSrcSet, basePath, ...rest } = props;
	const src = useMemo(
		() => (originalSrc ? attachBasePath(basePath || BASE_PATH, originalSrc) : ''),
		[basePath, originalSrc]
	);
	const srcSet = useMemo(
		() =>
			originSrcSet
				? (originSrcSet as string)
						.split(',')
						.map((e) => {
							const s = e.trim().split(' ');
							s[0] = attachBasePath(BASE_PATH, s[0]);
							return s.join(' ');
						})
						.join(',')
				: '',
		[originSrcSet]
	);
	return <StyledImg {...{ ...rest, src, srcSet }} />;
};

export const MaterialImage = (props: ComponentProps<typeof StyledNextImage>) => {
	const { src: originalSrc, ...rest } = props;
	const src = useNextImagePath(originalSrc);

	return <StyledNextImage {...{ ...rest, src }} />;
};
