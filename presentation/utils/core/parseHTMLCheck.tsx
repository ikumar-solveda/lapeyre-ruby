/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { PARSE_CHECK } from '@/data/constants/marketing';
import { parseHTMLValidate } from '@/utils/parseHTMLValidate';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import parse, { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser';

type Props = {
	domChildren: any[];
	Component: OverridableComponent<any>;
	attribs: Record<string, string>;
	name: string;
	output: Record<string, any>;
};

const checkElement = ({ domChildren, attribs, name, output }: Props) => {
	if (name !== 'img') {
		output[PARSE_CHECK.hasAnchorTag] = !!(output[PARSE_CHECK.hasAnchorTag] || attribs.href);
		domToReact(domChildren as any, getOptions(output));
	}
};

const getOptions = (output: Record<string, any>): HTMLReactParserOptions => ({
	replace: (domNode: DOMNode) => {
		const { Component } = parseHTMLValidate(domNode) ?? {};
		if (!Component) return;
		const { children: domChildren, attribs, name } = domNode as Element;
		checkElement({ domChildren, Component, attribs, name, output });
	},
});

export const requiresCheck = (text: string | undefined, contentUrl: string | undefined) => {
	const parseDetails: Record<string, string> = {};
	if (text && contentUrl) {
		parse(text, getOptions(parseDetails));
	}
	return parseDetails;
};
