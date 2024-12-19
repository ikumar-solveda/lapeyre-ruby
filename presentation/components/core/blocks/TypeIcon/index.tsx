/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import dynamic from 'next/dynamic';
import { useMemo, type ComponentProps, type ComponentType, type FC } from 'react';

type Props = ComponentProps<'svg'> & {
	name: string;
};

const manifest: Record<string, ComponentType> = {
	ai: dynamic(() => import('@/components/blocks/TypeIcon/parts/ai').then((mod) => mod.Icon)),
	avi: dynamic(() => import('@/components/blocks/TypeIcon/parts/avi').then((mod) => mod.Icon)),
	bmp: dynamic(() => import('@/components/blocks/TypeIcon/parts/bmp').then((mod) => mod.Icon)),
	crd: dynamic(() => import('@/components/blocks/TypeIcon/parts/crd').then((mod) => mod.Icon)),
	csv: dynamic(() => import('@/components/blocks/TypeIcon/parts/csv').then((mod) => mod.Icon)),
	dll: dynamic(() => import('@/components/blocks/TypeIcon/parts/dll').then((mod) => mod.Icon)),
	doc: dynamic(() => import('@/components/blocks/TypeIcon/parts/doc').then((mod) => mod.Icon)),
	docx: dynamic(() => import('@/components/blocks/TypeIcon/parts/docx').then((mod) => mod.Icon)),
	dwg: dynamic(() => import('@/components/blocks/TypeIcon/parts/dwg').then((mod) => mod.Icon)),
	eps: dynamic(() => import('@/components/blocks/TypeIcon/parts/eps').then((mod) => mod.Icon)),
	exe: dynamic(() => import('@/components/blocks/TypeIcon/parts/exe').then((mod) => mod.Icon)),
	flv: dynamic(() => import('@/components/blocks/TypeIcon/parts/flv').then((mod) => mod.Icon)),
	gif: dynamic(() => import('@/components/blocks/TypeIcon/parts/gif').then((mod) => mod.Icon)),
	html: dynamic(() => import('@/components/blocks/TypeIcon/parts/html').then((mod) => mod.Icon)),
	iso: dynamic(() => import('@/components/blocks/TypeIcon/parts/iso').then((mod) => mod.Icon)),
	java: dynamic(() => import('@/components/blocks/TypeIcon/parts/java').then((mod) => mod.Icon)),
	jpg: dynamic(() => import('@/components/blocks/TypeIcon/parts/jpg').then((mod) => mod.Icon)),
	mdb: dynamic(() => import('@/components/blocks/TypeIcon/parts/mdb').then((mod) => mod.Icon)),
	mid: dynamic(() => import('@/components/blocks/TypeIcon/parts/mid').then((mod) => mod.Icon)),
	mov: dynamic(() => import('@/components/blocks/TypeIcon/parts/mov').then((mod) => mod.Icon)),
	mp3: dynamic(() => import('@/components/blocks/TypeIcon/parts/mp3').then((mod) => mod.Icon)),
	mp4: dynamic(() => import('@/components/blocks/TypeIcon/parts/mp4').then((mod) => mod.Icon)),
	mpeg: dynamic(() => import('@/components/blocks/TypeIcon/parts/mpeg').then((mod) => mod.Icon)),
	pdf: dynamic(() => import('@/components/blocks/TypeIcon/parts/pdf').then((mod) => mod.Icon)),
	png: dynamic(() => import('@/components/blocks/TypeIcon/parts/png').then((mod) => mod.Icon)),
	ppt: dynamic(() => import('@/components/blocks/TypeIcon/parts/ppt').then((mod) => mod.Icon)),
	ps: dynamic(() => import('@/components/blocks/TypeIcon/parts/ps').then((mod) => mod.Icon)),
	psd: dynamic(() => import('@/components/blocks/TypeIcon/parts/psd').then((mod) => mod.Icon)),
	pub: dynamic(() => import('@/components/blocks/TypeIcon/parts/pub').then((mod) => mod.Icon)),
	rar: dynamic(() => import('@/components/blocks/TypeIcon/parts/rar').then((mod) => mod.Icon)),
	raw: dynamic(() => import('@/components/blocks/TypeIcon/parts/raw').then((mod) => mod.Icon)),
	rss: dynamic(() => import('@/components/blocks/TypeIcon/parts/rss').then((mod) => mod.Icon)),
	svg: dynamic(() => import('@/components/blocks/TypeIcon/parts/svg').then((mod) => mod.Icon)),
	tiff: dynamic(() => import('@/components/blocks/TypeIcon/parts/tiff').then((mod) => mod.Icon)),
	txt: dynamic(() => import('@/components/blocks/TypeIcon/parts/txt').then((mod) => mod.Icon)),
	wav: dynamic(() => import('@/components/blocks/TypeIcon/parts/wav').then((mod) => mod.Icon)),
	wma: dynamic(() => import('@/components/blocks/TypeIcon/parts/wma').then((mod) => mod.Icon)),
	xls: dynamic(() => import('@/components/blocks/TypeIcon/parts/xls').then((mod) => mod.Icon)),
	xml: dynamic(() => import('@/components/blocks/TypeIcon/parts/xml').then((mod) => mod.Icon)),
	zip: dynamic(() => import('@/components/blocks/TypeIcon/parts/zip').then((mod) => mod.Icon)),
	unknown: dynamic(() =>
		import('@/components/blocks/TypeIcon/parts/unknown').then((mod) => mod.Icon)
	),
};

const synonyms: Record<string, string> = {
	jpeg: 'jpg',
	mpg: 'mpeg',
};

export const TypeIcon: FC<Props> = ({ name = '', ...props }) => {
	const Svg = useMemo(() => {
		const extension = (name.split('.').at(-1) ?? name).toLowerCase();
		const syn = synonyms[extension] ?? extension;
		return syn in manifest ? manifest[syn] : manifest.unknown;
	}, [name]);
	return <Svg {...props} />;
};
