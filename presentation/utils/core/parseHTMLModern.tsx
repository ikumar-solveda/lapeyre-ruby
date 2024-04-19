/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { LinkWrap } from '@/components/blocks/Linkable/modern';
import { ContentContext } from '@/data/context/content';
import { useSettings } from '@/data/Settings';
import { RenderContentContextValueType } from '@/data/types/RenderContent';
import { useStyleTheme } from '@/styles/theme';
import { mapAttributes } from '@/utils/contentParsing';
import { parseHTMLModernValidate } from '@/utils/parseHTMLModernValidate';
import parse, { domToReact, Element, HTMLReactParserOptions } from 'html-react-parser';
import { FC, useContext } from 'react';

const ParsedElement: FC<any> = ({ domChildren, SpecialComponent, Component, attribs, name }) => {
	const { additives, theme } = useStyleTheme();
	const { settings } = useSettings();
	const { onClick, options } = useContext(ContentContext) as RenderContentContextValueType;
	const mappedAttributes = mapAttributes(attribs, additives, theme, settings, onClick);

	return name === 'img' ? (
		<Component {...mappedAttributes} {...options} />
	) : (
		<LinkWrap {...(SpecialComponent ? {} : mappedAttributes)}>
			<Component {...mappedAttributes}>{domToReact(domChildren, options)}</Component>
		</LinkWrap>
	);
};

const options: HTMLReactParserOptions = {
	replace: (domNode) => {
		const { Component, SpecialComponent } = parseHTMLModernValidate(domNode) ?? {};
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
