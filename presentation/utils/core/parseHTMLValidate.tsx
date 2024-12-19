/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getTagByKnownClass } from '@/utils/contentParsing';
import { MUI_ELEMENTS, SKIP_PARSING, SPECIAL_TAGS, TYPOGRAPHY_TAGS } from '@/utils/parseHTMLTags';
import { DOMNode, Element } from 'html-react-parser';

export const parseHTMLValidate = (domNode: DOMNode) => {
	if (!(domNode instanceof Element) || domNode.type !== 'tag') {
		return undefined;
	}
	const { attribs, name } = domNode;
	if (attribs[SKIP_PARSING] === 'true') {
		return undefined;
	}
	const knownComp = getTagByKnownClass(attribs);
	const NormalComponent =
		MUI_ELEMENTS[attribs.element] ||
		MUI_ELEMENTS[knownComp] ||
		TYPOGRAPHY_TAGS[knownComp] ||
		TYPOGRAPHY_TAGS[name];
	const SpecialComponent = !NormalComponent && SPECIAL_TAGS[name];
	const Component = NormalComponent || SpecialComponent;
	return { SpecialComponent, Component };
};
