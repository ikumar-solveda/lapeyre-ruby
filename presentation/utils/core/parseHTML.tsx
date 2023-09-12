/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Linkable, LinkWrap } from '@/components/blocks/Linkable';
import { Img } from '@/components/blocks/MaterialImage';
import { ContentContext } from '@/data/context/content';
import { Settings, useSettings } from '@/data/Settings';
import { ThemeManifestTheme } from '@/styles/manifest';
import { useStyleTheme } from '@/styles/theme';
import { combineSX } from '@/utils/combineSX';
import {
	convertStyleToSx,
	getFixedAttribute,
	getGridAttrs,
	getSxEquivalent,
	getTagByKnownClass,
} from '@/utils/contentParsing';
import { dFix } from '@/utils/floatingPoint';
import { Box, Button, Container, Grid, Paper, SxProps, Theme, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import parse, { domToReact, Element, HTMLReactParserOptions } from 'html-react-parser';
import { camelCase, partition } from 'lodash';
import { FC, MouseEvent, useContext } from 'react';

type AnyObject = Record<string, unknown>;
type AttributesObject = {
	[key: string]: string | boolean | number | SxProps<Theme> | AnyObject;
};

const MUI_ELEMENTS: Record<string, OverridableComponent<any>> = {
	Box,
	Button,
	Container,
	Grid,
	Paper,
};

const SPECIAL_TAGS: Record<string, FC<any>> = {
	a: Linkable,
	button: Button,
	div: Box,
	img: Img,
};

const TYPOGRAPHY_TAGS: Record<string, OverridableComponent<any>> = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'p:body1',
	'strong',
	'overline',
].reduce(
	(named, key) => ({
		...named,
		[key.split(':').at(0) || '']: (props: any) => (
			<Typography variant={key.split(':').at(-1)} {...props} />
		),
	}),
	{}
);

const makeObject = (item: any, ...args: any[]): AnyObject =>
	typeof item === 'function'
		? makeObject(item(...args), ...args)
		: item instanceof Object
		? item
		: {};

const isValidJSON = (string: string) => {
	try {
		JSON.parse(string);
		return true;
	} catch (e) {
		return false;
	}
};

const processAdditives = (
	{ add, className, style: _style, sx, ...rest }: AttributesObject,
	additives?: ThemeManifestTheme['additives'],
	theme?: Theme,
	settings?: Settings
): AttributesObject => {
	const _additives = makeObject(additives || {});
	const classes = ((className as string) ?? '').split(' ').filter(Boolean);
	const [gridClasses, nonGridClasses] = partition(classes, (name) => name.match(/^MuiGrid-/));
	const gridAttrs = getGridAttrs({ classes: gridClasses });
	const sxEquivalent = getSxEquivalent({ classes: nonGridClasses, settings: settings as Settings });
	const convertedStyles = convertStyleToSx({ style: `${_style}` });
	const all = [
		...nonGridClasses.map(camelCase),
		...((add as string) ?? '')
			.split(',')
			.map((a) => a.trim())
			.filter(Boolean),
	];
	const _sx: SxProps<Theme>[] = [
		...(Array.isArray(sx) ? sx : [makeObject(sx)]),
		sxEquivalent,
		convertedStyles,
	];

	const processed = {
		sx: all.reduce(
			(sx, addKey) => combineSX([...sx, makeObject(_additives[addKey], theme)]) as SxProps<Theme>[],
			_sx
		) as AnyObject[],
		className: nonGridClasses.join(' '),
		...gridAttrs,
		...rest,
	};
	return processed;
};

const mapAttributes = (
	attribs: Record<string, string>,
	additives?: ThemeManifestTheme['additives'],
	theme?: Theme,
	settings?: Settings,
	onClick?: (e: MouseEvent) => Promise<void>
): AttributesObject =>
	Object.entries(attribs).reduce(
		(attribs, [key, value]) => {
			const valueJSON = value.replaceAll(`'`, `"`);
			return processAdditives(
				{
					...attribs,
					[getFixedAttribute(key)]:
						value === ''
							? true
							: parseInt(value).toString() === value
							? dFix(value, 0)
							: isValidJSON(valueJSON)
							? JSON.parse(valueJSON)
							: value,
				},
				additives,
				theme,
				settings
			);
		},
		{ ...(attribs.href && { onClick }) } as AttributesObject
	);

const ParsedElement: FC<any> = ({ domChildren, SpecialComponent, Component, attribs, name }) => {
	const { additives, theme } = useStyleTheme();
	const { settings } = useSettings();
	const { onClick } = useContext(ContentContext) as { onClick?: (e: MouseEvent) => Promise<void> };
	const mappedAttributes = mapAttributes(attribs, additives, theme, settings, onClick);

	return name === 'img' ? (
		<Component {...mappedAttributes} />
	) : (
		<LinkWrap {...(SpecialComponent ? {} : mappedAttributes)}>
			<Component {...mappedAttributes}>{domToReact(domChildren, options)}</Component>
		</LinkWrap>
	);
};

const options: HTMLReactParserOptions = {
	replace: (domNode) => {
		if (!(domNode instanceof Element) || domNode.type !== 'tag') {
			return;
		}
		const { children, attribs, name } = domNode;
		const knownComp = getTagByKnownClass(attribs);
		const NormalComponent =
			MUI_ELEMENTS[attribs.element] ||
			MUI_ELEMENTS[knownComp] ||
			TYPOGRAPHY_TAGS[knownComp] ||
			TYPOGRAPHY_TAGS[name];
		const SpecialComponent = !NormalComponent && SPECIAL_TAGS[name];
		const Component = NormalComponent || SpecialComponent;

		if (!Component) return;

		return (
			<ParsedElement {...{ domChildren: children, SpecialComponent, Component, attribs, name }} />
		);
	},
};

export const parseHTML = (html: string) => parse(html, options);
