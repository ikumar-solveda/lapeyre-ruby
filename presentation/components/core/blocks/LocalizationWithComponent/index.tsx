/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import htmlParseStringify, { ASTNode, TagNode } from 'html-parse-stringify';
import {
	Children,
	FC,
	PropsWithChildren,
	ReactElement,
	ReactNode,
	cloneElement,
	createElement,
	isValidElement,
} from 'react';

type Props = PropsWithChildren<{
	components?: ReactElement[];
	text: string;
}>;

const processNodeWithReactElement = (astNode: TagNode, child: ReactElement, index: number) => {
	const { children, ...childProps } = child.props;
	const renderChildren = renderContent(
		astNode.children,
		Children.toArray(children).filter((node) => isValidElement(node)) as ReactElement[]
	);
	const props = { ...astNode.attrs, ...childProps, key: `${astNode.name}-${index}` };
	return cloneElement(child, props, ...renderChildren);
};

const renderContent = (ast: ASTNode[], childrenArray: ReactElement[]): ReactNode[] => {
	const res = ast.reduce((accumulator, currentNode, currentIndex) => {
		if (currentNode.type === 'text') {
			accumulator.push(currentNode.content);
		}
		if (currentNode.type === 'tag') {
			if (currentNode.voidElement) {
				// self closed tag, <br>
				accumulator.push(
					createElement(currentNode.name, { key: `${currentNode.name}-${currentIndex}` })
				);
			} else {
				const elm = childrenArray[parseInt(currentNode.name, 10)];
				if (elm) {
					// numbered tag
					accumulator.push(processNodeWithReactElement(currentNode, elm, currentIndex));
				} else {
					// regular tag in translation, e.g. `<p>, <b>, etc.`
					const renderChildren = renderContent(currentNode.children, childrenArray);
					accumulator.push(
						createElement(
							currentNode.name,
							{ key: `${currentNode.name}-${currentIndex}` },
							renderChildren
						)
					);
				}
			}
		}
		return accumulator;
	}, [] as ReactNode[]);
	return res;
};

/**
 * This component is used to render a translation string with HTML tags and React components.
 * To use this component, you need to pass the translation string and the React components that you want to render.
 * The translation string should have numbered tags, e.g. `<0>, <1>, etc.`, to indicate where the React components should be rendered.
 * The React components should be passed as an array of React elements.
 * The `<0></0>, <1></1>` tags are numbered at the same level corresponding to the array of React Elements and children array of the array of React Elements.
 *
 * Example: (with string inside the component to illustrate the usage)
 *
 * ```tsx
 * <LocalizationWithComponent
 *   text="This is a <0>index 0 component</0> with <1>index 1 component <0>index 0 child</0> and <1>index 1 child<1/></1>"
 *   components={[
 *     <span key="0">index 0 component</span>,
 *     <span key="1">index 1 component<span key="1-0">index 0 child</span> and <span key="1-1">index 1 child<span/></span>
 *   ]}
 * />
 * ```
 */
export const LocalizationWithComponent: FC<Props> = ({ children, components, text }) => {
	const childrenArray: ReactElement[] = (components ?? Children.toArray(children)).filter((node) =>
		isValidElement(node)
	) as ReactElement[];
	if (childrenArray.length === 0 || text.trim() === '') return <>{text}</>;
	const astNode = htmlParseStringify.parse(`<0>${text}</0>`).at(0);
	if (astNode && astNode.type === 'tag') {
		const astNodeChildren = (astNode as TagNode).children;
		return <>{renderContent(astNodeChildren, childrenArray)}</>;
	} else {
		return <>{text}</>;
	}
};
