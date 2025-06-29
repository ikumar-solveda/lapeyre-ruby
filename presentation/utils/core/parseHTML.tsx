/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { LinkWrap } from '@/components/blocks/Linkable';
import { ContentContext } from '@/data/context/content';
import { useSettings } from '@/data/Settings';
import { useStyleTheme } from '@/styles/theme';
import { mapAttributes } from '@/utils/contentParsing';
import { parseHTMLValidate } from '@/utils/parseHTMLValidate';
import parse, { domToReact, Element, HTMLReactParserOptions } from 'html-react-parser';
import { FC, MouseEvent, useContext, useMemo } from 'react';

const ParsedElement: FC<any> = ({ domChildren, SpecialComponent, Component, attribs, name }) => {
	const { additives, theme } = useStyleTheme();
	const { settings } = useSettings();
	const { onClick } = useContext(ContentContext) as { onClick?: (e: MouseEvent) => Promise<void> };
	const mappedAttributes = useMemo(
		() => mapAttributes(attribs, additives, theme, settings, onClick),
		[additives, attribs, onClick, settings, theme]
	);
	const specialMappedAttributes = useMemo(
		() => (SpecialComponent ? {} : mappedAttributes),
		[SpecialComponent, mappedAttributes]
	);

	return name === 'img' ? (
		<Component {...mappedAttributes} />
	) : (
		<LinkWrap {...specialMappedAttributes}>
			<Component {...mappedAttributes}>{domToReact(domChildren, options)}</Component>
		</LinkWrap>
	);
};

const options: HTMLReactParserOptions = {
	replace: (domNode) => {
		const { Component, SpecialComponent } = parseHTMLValidate(domNode) ?? {};
		if (!Component) return;
		const { children, attribs, name } = domNode as Element;

		return (
			<ParsedElement
				domChildren={children}
				SpecialComponent={SpecialComponent}
				Component={Component}
				attribs={attribs}
				name={name}
			/>
		);
	},
};

export const parseHTML = (html: string) => parse(html, options);
